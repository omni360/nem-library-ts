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

import {PublicAccount} from "../account/PublicAccount";
import {Transaction} from "./Transaction";
import {TransactionTypes} from "./TransactionTypes";
import {TransactionDTO} from "../../infrastructure/transaction/TransactionDTO";
import {MultisigTransactionDTO} from "../../infrastructure/transaction/MultisigTransactionDTO";
import {UnconfirmedTransactionMetaDataPairDTO} from "../../infrastructure/transaction/UnconfirmedTransactionMetaDataPairDTO";
import {MultisigSignatureTransactionDTO} from "../../infrastructure/transaction/MultisigSignatureTransactionDTO";
import {HashData, TransactionInfo} from "./TransactionInfo";
import {TimeWindow} from "./TimeWindow";
import {Address} from "../account/Address";

/**
 * Multisig signature transactions are part of the NEM's multisig account system. Multisig signature transactions are included in the corresponding multisig transaction and are the way a cosignatory of a multisig account can sign a multisig transaction for that account.
 */
export class MultisigSignatureTransaction extends Transaction {
  /**
   * The fee for the transaction. The higher the fee, the higher the priority of the transaction. Transactions with high priority get included in a block before transactions with lower priority.
   */
  readonly fee: number;

  /**
   * The address of the corresponding multisig account.
   */
  readonly otherAccount: Address;

  /**
   * The hash of the inner transaction of the corresponding multisig transaction.
   */
  readonly otherHash: HashData;

  /**
   * @internal
   * @param timeWindow
   * @param version
   * @param otherAccount
   * @param otherHash
   * @param fee
   * @param signature
   * @param signer
   * @param transactionInfo
   */
  constructor(timeWindow: TimeWindow,
              version: number,
              otherAccount: Address,
              otherHash: HashData,
              fee: number,
              signature?: string,
              signer?: PublicAccount,
              transactionInfo?: TransactionInfo) {
    super(TransactionTypes.MULTISIG_SIGNATURE,
      version,
      timeWindow,
      signature,
      signer,
      transactionInfo
    );
    this.otherAccount = otherAccount;
    this.otherHash = otherHash;
    this.fee = fee;
  }

  /**
   * @internal
   * @param unconfirmedTransaction
   * @returns {MultisigSignatureTransaction}
   */
  static createUnconfirmedFromDTO(unconfirmedTransaction: UnconfirmedTransactionMetaDataPairDTO): MultisigSignatureTransaction {
    const receiverAccount = PublicAccount.createWithPublicKey((<MultisigTransactionDTO>unconfirmedTransaction.transaction).otherTrans.signer);
    return new MultisigSignatureTransaction(
      TimeWindow.createFromDTOInfo(unconfirmedTransaction.transaction.timeStamp, unconfirmedTransaction.transaction.deadline),
      unconfirmedTransaction.transaction.version,
      receiverAccount.address,
      new HashData(unconfirmedTransaction.meta.data!),
      unconfirmedTransaction.transaction.fee,
      unconfirmedTransaction.transaction.signature);
  }

  /**
   * @internal
   * @returns {MultisigSignatureTransactionDTO}
   */
  public toDTO(): TransactionDTO {
    let version = this.networkVersion ? this.networkVersion : this.version;
    return this.serializeDTO(<MultisigSignatureTransactionDTO>{
      fee: this.fee,
      version: version,
      type: this.type,
      deadline: this.timeWindow.deadlineToDTO(),
      timeStamp: this.timeWindow.timeStampToDTO(),
      signature: this.signature,
      signer: this.signer ? this.signer.publicKey : undefined,
      otherHash: this.otherHash,
      otherAccount: this.otherAccount.plain()
    });
  }

  /**
   * Create a MultisigSignatureTransaction object
   * @param timeWindow
   * @param otherAccount
   * @param otherHash
   * @returns {MultisigSignatureTransaction}
   */
  static create(timeWindow: TimeWindow,
                otherAccount: Address,
                otherHash: HashData): MultisigSignatureTransaction {
    let fee = Math.floor(3 * 0.05 * 1000000);
    return new MultisigSignatureTransaction(timeWindow, 1, otherAccount, otherHash, fee);
  }
}