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
import {ProvisionNamespaceTransactionDTO} from "../../infrastructure/transaction/ProvisionNamespaceTransactionDTO";
import {PublicAccount} from "../account/PublicAccount";
import {TransactionTypes} from "./TransactionTypes";
import {TransactionInfo} from "./TransactionInfo";
import {Address} from "../account/Address";
import {TimeWindow} from "./TimeWindow";
import {NEMLibrary} from "../../NEMLibrary";
import {NetworkTypes} from "../node/NetworkTypes";

/**
 * Accounts can rent a namespace for one year and after a year renew the contract. This is done via a ProvisionNamespaceTransaction.
 */
export class ProvisionNamespaceTransaction extends Transaction {
  /**
   * The fee for the transaction. The higher the fee, the higher the priority of the transaction. Transactions with high priority get included in a block before transactions with lower priority.
   */
  readonly fee: number;

  /**
   * The Address to which the rental fee is transferred.
   */
  readonly rentalFeeSink: Address;

  /**
   * The fee for renting the namespace.
   */
  readonly rentalFee: number;

  /**
   * The parent namespace. This can be undefined if the transaction rents a root namespace.
   */
  readonly parent?: string;

  /**
   * The new part which is concatenated to the parent with a '.' as separator.
   */
  readonly newPart: string;

  /**
   * @internal
   * @param timeWindow
   * @param version
   * @param rentalFeeSink
   * @param rentalFee
   * @param newPart
   * @param fee
   * @param signature
   * @param parent
   * @param sender
   * @param transactionInfo
   */
  constructor(timeWindow: TimeWindow,
              version: number,
              rentalFeeSink: Address,
              rentalFee: number,
              newPart: string,
              fee: number,
              signature?: string,
              parent?: string,
              sender?: PublicAccount,
              transactionInfo?: TransactionInfo) {
    super(TransactionTypes.PROVISION_NAMESPACE, version, timeWindow, signature, sender, transactionInfo);
    this.rentalFee = rentalFee;
    this.rentalFeeSink = rentalFeeSink;
    this.newPart = newPart;
    this.parent = parent;
    this.fee = fee;
  }

  /**
   * @internal
   * @returns {TransactionDTO}
   */
  public toDTO(): TransactionDTO {
    let version = this.networkVersion ? this.networkVersion : this.version;
    return this.serializeDTO(<ProvisionNamespaceTransactionDTO>{
      version: version,
      fee: this.fee,
      type: this.type,
      signer: this.signer ? this.signer.publicKey : undefined,
      parent: this.parent === undefined ? null : this.parent,
      signature: this.signature,
      rentalFee: this.rentalFee,
      rentalFeeSink: this.rentalFeeSink.plain(),
      deadline: this.timeWindow.deadlineToDTO(),
      timeStamp: this.timeWindow.timeStampToDTO(),
      newPart: this.newPart
    });
  }

  /**
   * Create a ProvisionNamespaceTransaction object
   * @param timeWindow
   * @param newPart
   * @param parent
   * @returns {ProvisionNamespaceTransaction}
   */
  static create(timeWindow: TimeWindow,
                newPart: string,
                parent?: string): ProvisionNamespaceTransaction {
    const subnamespaceFee = 10 * 1000000;
    const RootNamespaceFee = 100 * 1000000;
    let rentalFeeSink;
    if (NEMLibrary.getNetworkType() == NetworkTypes.TEST_NET) {
      rentalFeeSink = new Address("TAMESP-ACEWH4-MKFMBC-VFERDP-OOP4FK-7MTDJE-YP35");
    } else if (NEMLibrary.getNetworkType() == NetworkTypes.MAIN_NET) {
      rentalFeeSink = new Address("NAMESP-ACEWH4-MKFMBC-VFERDP-OOP4FK-7MTBXD-PZZA");
    }
    let fee = Math.floor(3 * 0.05 * 1000000);
    return new ProvisionNamespaceTransaction(timeWindow, 1, rentalFeeSink, parent === undefined ? RootNamespaceFee : subnamespaceFee, newPart, fee, undefined, parent);
  }

  /**
   *
   * @param {TimeWindow} timeWindow
   * @param {string} namespaceName - Root namespace provision
   * @returns {ProvisionNamespaceTransaction}
   */
  static createRoot(timeWindow: TimeWindow, namespaceName: string): ProvisionNamespaceTransaction {
    return ProvisionNamespaceTransaction.create(timeWindow, namespaceName);
  }

  /**
   *
   * @param {TimeWindow} timeWindow
   * @param {string }parentNamespace
   * @param {string} newNamespaceName
   * @returns {ProvisionNamespaceTransaction}
   */
  static createSub(timeWindow: TimeWindow, parentNamespace: string, newNamespaceName: string): ProvisionNamespaceTransaction {
    return ProvisionNamespaceTransaction.create(timeWindow, newNamespaceName, parentNamespace);
  }
}