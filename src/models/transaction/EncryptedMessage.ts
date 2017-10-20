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

import * as nemSdk from "nem-sdk";
import {MessageDTO} from "../../infrastructure/transaction/Message";
import {PublicAccount} from "../account/PublicAccount";
import {Message} from "./Message";
import {PlainMessage} from "./PlainMessage";

/**
 * Encrypted Message model
 */
export class EncryptedMessage extends Message {

  /**
   * @internal
   */
  public readonly recipientPublicAccount?: PublicAccount;

  /**
   * @internal
   * @param payload
   * @param recipientPublicAccount
   */
  private constructor(payload: string, recipientPublicAccount?: PublicAccount){
    super(payload);
    this.recipientPublicAccount = recipientPublicAccount;
  }

  public isEncrypted(): boolean {
    return true;
  }

  public isPlain(): boolean {
    return false;
  }

  /**
   * @internal
   * @param message
   * @param recipientPublicAccount
   * @param privateKey
   * @returns {EncryptedMessage}
   */
  public static create(message: string, recipientPublicAccount: PublicAccount, privateKey) {
    return new EncryptedMessage(nemSdk.default.crypto.helpers.encode(privateKey, recipientPublicAccount.publicKey, message), recipientPublicAccount);
  }

  /**
   * @internal
   */
  public static createFromDTO(payload: string): EncryptedMessage {
    return new EncryptedMessage(payload);
  }

  /**
   * @internal
   * @param encryptMessage
   * @param privateKey
   * @param recipientPublicAccount
   * @returns {EncryptedMessage}
   */
  public static decrypt(encryptMessage: EncryptedMessage, privateKey, recipientPublicAccount: PublicAccount): PlainMessage {
    return new PlainMessage(Message.decodeHex(nemSdk.default.crypto.helpers.decode(privateKey, recipientPublicAccount.publicKey, encryptMessage.payload)));
  }

  /**
   * @internal
   * @returns {MessageDTO}
   */
  public toDTO(): MessageDTO {
    return {
      payload: this.payload,
      type: 2,
    } as MessageDTO;
  }
}
