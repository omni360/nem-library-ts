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

import {SignedTransaction} from "../transaction/SignedTransaction";
import * as nemSdk from "nem-sdk";
import {Transaction} from "../transaction/Transaction";
import {PublicAccount} from "./PublicAccount";
import {Address} from "./Address";
import {NetworkTypes} from "../node/NetworkTypes";
import {NEMLibrary} from "../../NEMLibrary";
import {EncryptedMessage} from "../transaction/EncryptedMessage";
import {PlainMessage} from "../transaction/PlainMessage";

/**
 * Account model
 */
export class Account extends PublicAccount {

  /**
   * Constructor
   * @internal
   * @param address
   * @param publicKey
   * @param privateKey
   */
  constructor(address: Address,
              publicKey: string,
              private readonly privateKey: string) {
    super(address, publicKey);
  }

  /**
   * Sign a transaction
   * @param transaction
   * @returns {{data: any, signature: string}}
   */
  signTransaction(transaction: Transaction): SignedTransaction {
    transaction.signer = PublicAccount.createWithPublicKey(this.publicKey);
    transaction.setNetworkType(this.address.network());
    const dto = transaction.toDTO();
    let keyPair: any = nemSdk.default.crypto.keyPair.create(nemSdk.default.utils.helpers.fixPrivateKey(this.privateKey));
    let result = nemSdk.default.utils.serialization.serializeTransaction(dto);
    let signature = keyPair.sign(result);
    return {
      data: nemSdk.default.utils.convert.ua2hex(result),
      signature: signature.toString()
    };
  }

  /**
   * constructor with private key
   * @param privateKey
   * @returns {Account}
   */
  static createWithPrivateKey(privateKey: string) {
    if (privateKey == undefined) {
      throw new Error("Private Key is undefined");
    }
    let network;
    if (NEMLibrary.getNetworkType() == NetworkTypes.MAIN_NET) {
      network = nemSdk.default.model.network.data.mainnet.id;
    } else if (NEMLibrary.getNetworkType() == NetworkTypes.TEST_NET) {
      network = nemSdk.default.model.network.data.testnet.id;
    }
    let keyPair: any = nemSdk.default.crypto.keyPair.create(nemSdk.default.utils.helpers.fixPrivateKey(privateKey));
    const publicKey: string = keyPair.publicKey.toString();
    const address: string = nemSdk.default.model.address.toAddress(publicKey, network);
    return new Account(
      new Address(address),
      publicKey,
      privateKey
    )
  }

  /**
   * Create a new encrypted Message
   * @param message
   * @param recipientPublicAccount
   * @returns {EncryptedMessage}
   */
  encryptMessage(message: string, recipientPublicAccount: PublicAccount): EncryptedMessage {
    return EncryptedMessage.create(message, recipientPublicAccount, this.privateKey);
  }

  /**
   * Decrypts an encrypted message
   * @param encryptedMessage
   * @param recipientPublicAccount
   * @returns {PlainMessage}
   */
  decryptMessage(encryptedMessage: EncryptedMessage, recipientPublicAccount: PublicAccount): PlainMessage {
    return EncryptedMessage.decrypt(encryptedMessage, this.privateKey, recipientPublicAccount);
  }
}