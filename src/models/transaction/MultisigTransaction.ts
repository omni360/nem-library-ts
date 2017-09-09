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
import {HashData, MultisigTransactionInfo} from "./TransactionInfo";
import {TransactionDTO} from "../../infrastructure/transaction/TransactionDTO";
import {MultisigSignatureTransaction} from "./MultisigSignatureTransaction";
import {TransactionTypes} from "./TransactionTypes";
import {PublicAccount} from "../account/PublicAccount";
import {MultisigTransactionDTO} from "../../infrastructure/transaction/MultisigTransactionDTO";
import {TimeWindow} from "./TimeWindow";
import {NetworkTypes} from "../node/NetworkTypes";

/**
 * Multisig transaction are the only way to make transaction from a multisig account to another account.
 * A multisig transaction carries another transaction inside (often referred to as "inner" transaction).
 * The inner transaction can be a transfer, an importance transfer or an aggregate modification transaction.
 * A multisig transaction also has multisig signature transactions from the cosignatories of the multisig account inside.
 */
export class MultisigTransaction extends Transaction {
  /**
   * The fee for the transaction.
   */
  readonly fee: number;

  /**
   * The JSON array of MulsigSignatureTransaction objects.
   */
  readonly signatures: MultisigSignatureTransaction[];

  /**
   * The inner transaction. The inner transaction can be a transfer transaction, an importance transfer transaction or a multisig aggregate modification transaction.
   * The inner transaction does not have a valid signature.
   */
  readonly otherTransaction: Transaction;

  /**
   * Hash data
   */
  readonly hashData?: HashData;

  /**
   * @internal
   * @param timeWindow
   * @param version
   * @param otherTrans
   * @param fee
   * @param signatures
   * @param signature
   * @param sender
   * @param transactionInfo
   * @param hashData
   */
  constructor(timeWindow: TimeWindow,
              version: number,
              otherTrans: Transaction,
              fee: number,
              signatures: MultisigSignatureTransaction[],
              signature?: string,
              sender?: PublicAccount,
              transactionInfo?: MultisigTransactionInfo,
              hashData?: HashData) {
    super(TransactionTypes.MULTISIG, version, timeWindow, signature, sender, transactionInfo);
    this.otherTransaction = otherTrans;
    this.hashData = hashData;
    this.fee = fee;
    this.signatures = signatures;
  }

  /**
   * Check if transaction is pending to sign
   * @returns {boolean}
   */
  isPendingToSign(): boolean {
    return this.transactionInfo == null && this.hashData != null;
  }

  /**
   * Create a MultisigTransaction object
   * @param timeWindow
   * @param otherTrans
   * @param multisig
   * @returns {MultisigTransaction}
   */
  static create(timeWindow: TimeWindow,
                otherTrans: Transaction,
                multisig: PublicAccount): MultisigTransaction {
    let fee = Math.floor(3 * 0.05 * 1000000);
    otherTrans.signer = multisig;
    return new MultisigTransaction(timeWindow, 1, otherTrans, fee, []);
  }


  /**
   * @internal
   * @param networkType
   */
  public setNetworkType(networkType: NetworkTypes) {
    super.setNetworkType(networkType);
    this.otherTransaction.setNetworkType(networkType);
  }

  // region boilerplate
  /**
   * @internal
   * @returns {MultisigTransactionDTO}
   */
  toDTO(): TransactionDTO {
    let version = this.networkVersion ? this.networkVersion : this.version;
    return this.serializeDTO(<MultisigTransactionDTO>{
      signer: this.signer ? this.signer.publicKey : undefined,
      deadline: this.timeWindow.deadlineToDTO(),
      timeStamp: this.timeWindow.timeStampToDTO(),
      type: this.type,
      signature: this.signature,
      signatures: this.signatures.map(signature => signature.toDTO()),
      version: version,
      fee: this.fee,
      otherTrans: this.otherTransaction.toDTO(),
    });
  }

  // endregion
}