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

import {Transaction} from "./Transaction";
import {TransactionDTO} from "../../infrastructure/transaction/TransactionDTO";
import {MosaicDefinitionCreationTransactionDTO} from "../../infrastructure/transaction/MosaicDefinitionCreationTransactionDTO";
import {MosaicDefinition} from "../mosaic/MosaicDefinition";
import {TransactionTypes} from "./TransactionTypes";
import {PublicAccount} from "../account/PublicAccount";
import {TransactionInfo} from "./TransactionInfo";
import {TimeWindow} from "./TimeWindow";
import {Address} from "../account/Address";
import {NEMLibrary} from "../../NEMLibrary";
import {NetworkTypes} from "../node/NetworkTypes";

/**
 * Before a mosaic can be created or transferred, a corresponding definition of the mosaic has to be created and published to the network.
 * This is done via a mosaic definition creation transaction.
 */
export class MosaicDefinitionCreationTransaction extends Transaction {
  /**
   * The fee for the transaction. The higher the fee, the higher the priority of the transaction. Transactions with high priority get included in a block before transactions with lower priority.
   */
  readonly fee: number;

  /**
   * The fee for the creation of the mosaic.
   */
  readonly creationFee: number;

  /**
   * The public account to which the creation fee is tranferred.
   */
  readonly creationFeeSink: Address;

  /**
   * The actual mosaic definition.
   */
  readonly mosaicDefinition: MosaicDefinition;

  /**
   * @internal
   * @param timeWindow
   * @param version
   * @param creationFee
   * @param creationFeeSink
   * @param mosaicDefinition
   * @param fee
   * @param signature
   * @param sender
   * @param transactionInfo
   */
  constructor(timeWindow: TimeWindow,
              version: number,
              creationFee: number,
              creationFeeSink: Address,
              mosaicDefinition: MosaicDefinition,
              fee: number,
              signature?: string,
              sender?: PublicAccount,
              transactionInfo?: TransactionInfo) {
    super(TransactionTypes.MOSAIC_DEFINITION_CREATION, version, timeWindow, signature, sender, transactionInfo);
    this.creationFeeSink = creationFeeSink;
    this.creationFee = creationFee;
    this.mosaicDefinition = mosaicDefinition;
    this.fee = fee;
  }

  /**
   * @internal
   * @returns {MosaicDefinitionCreationTransactionDTO}
   */
  toDTO(): TransactionDTO {
    let version = this.networkVersion ? this.networkVersion : this.version;
    return this.serializeDTO(<MosaicDefinitionCreationTransactionDTO>{
      type: this.type,
      fee: this.fee,
      version: version,
      signer: this.signer ? this.signer.publicKey : undefined,
      signature: this.signature,
      deadline: this.timeWindow.deadlineToDTO(),
      timeStamp: this.timeWindow.timeStampToDTO(),
      creationFee: this.creationFee,
      creationFeeSink: this.creationFeeSink.plain(),
      mosaicDefinition: this.mosaicDefinition.toDTO()
    });
  }

  /**
   * Create a MosaicDefinitionCreationTransaction object
   * @param timeWindow
   * @param mosaicDefinition
   * @returns {MosaicDefinitionCreationTransaction}
   */
  static create(timeWindow: TimeWindow,
                mosaicDefinition: MosaicDefinition): MosaicDefinitionCreationTransaction {
    let fee = Math.floor(3 * 0.05 * 1000000);
    let creationFeeSink;
    if (NEMLibrary.getNetworkType() == NetworkTypes.TEST_NET) {
      creationFeeSink = new Address("TBMOSA-ICOD4F-54EE5C-DMR23C-CBGOAM-2XSJBR-5OLC");
    } else if (NEMLibrary.getNetworkType() == NetworkTypes.MAIN_NET) {
      creationFeeSink = new Address("NBMOSA-ICOD4F-54EE5C-DMR23C-CBGOAM-2XSIUX-6TRS");
    }
    const creationFee = Math.floor(10 * 1000000);
    return new MosaicDefinitionCreationTransaction(
      timeWindow, 1, creationFee, creationFeeSink, mosaicDefinition, fee
    );
  }
}