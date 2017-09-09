/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 NEM
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Transaction} from "../../models/transaction/Transaction";
import {TransactionMetaDataPairDTO} from "./TransactionMetaDataPairDTO";
import {TransactionTypes} from "../../models/transaction/TransactionTypes";
import {MultisigTransaction} from "../../models/transaction/MultisigTransaction";
import {MultisigTransactionDTO} from "./MultisigTransactionDTO";
import {TransferTransactionDTO} from "./TransferTransactionDTO";
import {TransferTransaction} from "../../models/transaction/TransferTransaction";
import {PublicAccount} from "../../models/account/PublicAccount";
import {HashData, MultisigTransactionInfo, TransactionInfo} from "../../models/transaction/TransactionInfo";
import {TransactionDTO} from "./TransactionDTO";
import {ImportanceTransferTransactionDTO} from "./ImportanceTransferTransactionDTO";
import {MultisigAggregateModificationTransactionDTO} from "./MultisigAggregateModificationTransactionDTO";
import {ProvisionNamespaceTransactionDTO} from "./ProvisionNamespaceTransactionDTO";
import {MosaicDefinitionCreationTransactionDTO} from "./MosaicDefinitionCreationTransactionDTO";
import {MosaicSupplyChangeTransactionDTO} from "./MosaicSupplyChangeTransactionDTO";
import {ImportanceTransferTransaction} from "../../models/transaction/ImportanceTransferTransaction";
import {ProvisionNamespaceTransaction} from "../../models/transaction/ProvisionNamespaceTransaction";
import {
  CosignatoryModification,
  MultisigAggregateModificationTransaction
} from "../../models/transaction/MultisigAggregateModificationTransaction";
import {MosaicDefinitionCreationTransaction} from "../../models/transaction/MosaicDefinitionCreationTransaction";
import {MosaicDefinition, MosaicProperties} from "../../models/mosaic/MosaicDefinition";
import {MosaicId} from "../../models/mosaic/MosaicId";
import {MosaicLevyDTO} from "../mosaic/MosaicLevyDTO";
import {MosaicLevy} from "../../models/mosaic/MosaicLevy";
import {MosaicSupplyChangeTransaction} from "../../models/transaction/MosaicSupplyChangeTransaction";
import {MultisigSignatureTransactionDTO} from "./MultisigSignatureTransactionDTO";
import {MultisigSignatureTransaction} from "../../models/transaction/MultisigSignatureTransaction";
import {MosaicDTO} from "../mosaic/MosaicDTO";
import {Mosaic} from "../../models/mosaic/Mosaic";
import {Address} from "../../models/account/Address";
import {TimeWindow} from "../../models/transaction/TimeWindow";
import {EmptyMessage, PlainMessage} from "../../models/transaction/PlainMessage";
import {EncryptedMessage} from "../../models/transaction/EncryptedMessage";
import {XEM} from "../../models/mosaic/XEM";

/**
 * @internal
 * @param dto
 * @returns {any}
 * @constructor
 */
export const CreateTransactionFromDTO = (dto: TransactionMetaDataPairDTO): Transaction => {
  if (dto.transaction.type == TransactionTypes.MULTISIG) {
    const transaction = <MultisigTransactionDTO>dto.transaction;
    return new MultisigTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      CreateTransactionFromDTO({
        meta: {
          height: dto.meta.height,
          id: dto.meta.id,
          hash: dto.meta.hash,
          innerHash: {}
        },
        transaction: transaction.otherTrans
      }),
      transaction.fee,
      transaction.signatures.map((signature: MultisigSignatureTransactionDTO) => {
        return new MultisigSignatureTransaction(
          TimeWindow.createFromDTOInfo(signature.timeStamp, signature.deadline),
          signature.version,
          new Address(signature.otherAccount),
          new HashData(signature.otherHash.data!),
          signature.fee,
          signature.signature,
          PublicAccount.createWithPublicKey(signature.signer)
        )
      }),
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer),
      new MultisigTransactionInfo(
        dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!),
        new HashData(dto.meta.innerHash.data!)
      )
    )
  }
  else if (dto.transaction.type == TransactionTypes.TRANSFER) {
    const transaction = <TransferTransactionDTO>dto.transaction;
    let message: PlainMessage | EncryptedMessage;
    if (transaction.message.type == 1) {
      message = PlainMessage.createFromDTO(<string> transaction.message.payload);
    } else if (transaction.message.type == 2) {
      message = EncryptedMessage.createFromDTO(<string> transaction.message.payload);
    } else {
      message = EmptyMessage;
    }
    return new TransferTransaction(new Address(transaction.recipient),
      new XEM(transaction.amount / 1000000),
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.fee,
      message,
      transaction.signature,
      transaction.mosaics === undefined ? undefined : transaction.mosaics.map((mosaicDTO: MosaicDTO) => Mosaic.createFromMosaicDTO(mosaicDTO)),
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!)),
    );
  }
  else if (dto.transaction.type == TransactionTypes.IMPORTANCE_TRANSFER) {
    const transaction = <ImportanceTransferTransactionDTO>dto.transaction;
    return new ImportanceTransferTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.mode,
      PublicAccount.createWithPublicKey(transaction.remoteAccount),
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!))
    )
  }
  else if (dto.transaction.type == TransactionTypes.PROVISION_NAMESPACE) {
    const transaction = <ProvisionNamespaceTransactionDTO>dto.transaction;
    return new ProvisionNamespaceTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      new Address(transaction.rentalFeeSink),
      transaction.rentalFee,
      transaction.newPart,
      transaction.fee,
      transaction.signature,
      transaction.parent == null ? undefined : transaction.parent,
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!)));
  }
  else if (dto.transaction.type == TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION) {
    const transaction = <MultisigAggregateModificationTransactionDTO>dto.transaction;
    return new MultisigAggregateModificationTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.modifications.map(modification => {
        return new CosignatoryModification(
          PublicAccount.createWithPublicKey(modification.cosignatoryAccount),
          modification.modificationType)
      }),
      transaction.fee,
      transaction.signature,
      transaction.minCosignatories === undefined ? undefined: transaction.minCosignatories.relativeChange,
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!))
    );
  }
  else if (dto.transaction.type == TransactionTypes.MOSAIC_DEFINITION_CREATION) {
    const transaction = <MosaicDefinitionCreationTransactionDTO>dto.transaction;
    const levy = (<MosaicLevyDTO>transaction.mosaicDefinition.levy).mosaicId === undefined ?
      undefined : MosaicLevy.createFromMosaicLevyDTO(<MosaicLevyDTO>transaction.mosaicDefinition.levy);
    let mosaicDefinition = new MosaicDefinition(
      PublicAccount.createWithPublicKey(transaction.mosaicDefinition.creator),
      new MosaicId(transaction.mosaicDefinition.id.namespaceId, transaction.mosaicDefinition.id.name),
      transaction.mosaicDefinition.description,
      MosaicProperties.createFromMosaicProperties(transaction.mosaicDefinition.properties),
      levy
    );
    return new MosaicDefinitionCreationTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.creationFee,
      new Address(transaction.creationFeeSink),
      mosaicDefinition,
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!))
    );
  }
  else if (dto.transaction.type == TransactionTypes.MOSAIC_SUPPLY_CHANGE) {
    const transaction = <MosaicSupplyChangeTransactionDTO>dto.transaction;
    return new MosaicSupplyChangeTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp,
        transaction.deadline),
      transaction.version,
      new MosaicId(transaction.mosaicId.namespaceId, transaction.mosaicId.name),
      transaction.supplyType,
      transaction.delta,
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer),
      new TransactionInfo(dto.meta.height,
        dto.meta.id,
        new HashData(dto.meta.hash.data!))
    );
  }
  throw new Error("Unimplemented transaction with type " + dto.transaction.type);
};

/**
 * @internal
 * @param dto
 * @returns {any}
 * @constructor
 */
export const CreateSimpleTransactionFromDTO = (dto: TransactionDTO): Transaction => {
  if (dto.type == TransactionTypes.TRANSFER) {
    const transaction = <TransferTransactionDTO>dto;
    let message: PlainMessage | EncryptedMessage;
    if (transaction.message.type == 1) {
      message = PlainMessage.createFromDTO(<string> transaction.message.payload);
    } else if (transaction.message.type == 2) {
      message = EncryptedMessage.createFromDTO(<string> transaction.message.payload);
    } else {
      message = EmptyMessage;
    }
    return new TransferTransaction(new Address(transaction.recipient),
      new XEM(transaction.amount / 1000000),
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.fee,
      message,
      transaction.signature,
      transaction.mosaics === undefined ? undefined : transaction.mosaics.map((mosaicDTO: MosaicDTO) => Mosaic.createFromMosaicDTO(mosaicDTO)),
      PublicAccount.createWithPublicKey(transaction.signer),
      undefined
    )
  }
  else if (dto.type == TransactionTypes.IMPORTANCE_TRANSFER) {
    const transaction = <ImportanceTransferTransactionDTO>dto;
    return new ImportanceTransferTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.mode,
      PublicAccount.createWithPublicKey(transaction.remoteAccount),
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer)
    )
  }
  else if (dto.type == TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION) {
    const transaction = <MultisigAggregateModificationTransactionDTO>dto;
    return new MultisigAggregateModificationTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.modifications.map(modification => {
        return new CosignatoryModification(
          PublicAccount.createWithPublicKey(modification.cosignatoryAccount),
          modification.modificationType)
      }),
      transaction.fee,
      transaction.signature,
      transaction.minCosignatories === undefined ? undefined: transaction.minCosignatories.relativeChange,
      PublicAccount.createWithPublicKey(transaction.signer)
    );

  }
  else if (dto.type == TransactionTypes.PROVISION_NAMESPACE) {
    const transaction = <ProvisionNamespaceTransactionDTO>dto;
    return new ProvisionNamespaceTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      new Address(transaction.rentalFeeSink),
      transaction.rentalFee,
      transaction.newPart,
      transaction.fee,
      transaction.signature,
      transaction.parent == null ? undefined : transaction.parent,
      PublicAccount.createWithPublicKey(transaction.signer)
    );
  }
  else if (dto.type == TransactionTypes.MOSAIC_DEFINITION_CREATION) {
    const transaction = <MosaicDefinitionCreationTransactionDTO>dto;
    const levy = (<MosaicLevyDTO>transaction.mosaicDefinition.levy).mosaicId === undefined ?
      undefined : MosaicLevy.createFromMosaicLevyDTO(<MosaicLevyDTO>transaction.mosaicDefinition.levy);
    let mosaicDefinition = new MosaicDefinition(
      PublicAccount.createWithPublicKey(transaction.mosaicDefinition.creator),
      new MosaicId(transaction.mosaicDefinition.id.namespaceId, transaction.mosaicDefinition.id.name),
      transaction.mosaicDefinition.description,
      MosaicProperties.createFromMosaicProperties(transaction.mosaicDefinition.properties),
      levy
    );
    return new MosaicDefinitionCreationTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      transaction.creationFee,
      new Address(transaction.creationFeeSink),
      mosaicDefinition,
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer)
    )
  }
  else if (dto.type == TransactionTypes.MOSAIC_SUPPLY_CHANGE) {
    const transaction = <MosaicSupplyChangeTransactionDTO>dto;
    return new MosaicSupplyChangeTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      new MosaicId(transaction.mosaicId.namespaceId, transaction.mosaicId.name),
      transaction.supplyType,
      transaction.delta,
      transaction.fee,
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer)
    )
  } else if (dto.type == TransactionTypes.MULTISIG) {
    const transaction = <MultisigTransactionDTO>dto;
    return new MultisigTransaction(
      TimeWindow.createFromDTOInfo(transaction.timeStamp, transaction.deadline),
      transaction.version,
      CreateSimpleTransactionFromDTO(transaction.otherTrans),
      transaction.fee,
      transaction.signatures.map((signature: MultisigSignatureTransactionDTO) => {
        return new MultisigSignatureTransaction(
          TimeWindow.createFromDTOInfo(signature.timeStamp, signature.deadline),
          signature.version,
          new Address(signature.otherAccount),
          new HashData(signature.otherHash.data!),
          signature.fee,
          signature.signature,
          PublicAccount.createWithPublicKey(signature.signer)
        )
      }),
      transaction.signature,
      PublicAccount.createWithPublicKey(transaction.signer)
    );
  }

  throw new Error("Unimplemented other transaction with type " + dto.type);
};