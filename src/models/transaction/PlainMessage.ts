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

import {MessageDTO} from "../../infrastructure/transaction/Message";
import {Message} from "./Message";

/**
 * Plain Message model
 */
export class PlainMessage extends Message {

  /**
   * @internal
   * @param payload
   */
  constructor(payload: string){
    super(payload);
  }

  /**
   * Create new constructor
   * @returns {boolean}
   */
  public static create(message: string) {
    return new PlainMessage(this.encodeHex(message));
  }

  public isEncrypted(): boolean {
    return false;
  }

  public isPlain(): boolean {
    return true;
  }

  /**
   * @internal
   */
  public static createFromDTO(payload: string): PlainMessage {
    return new PlainMessage(payload);
  }

  /**
   * @internal
   * @returns {MessageDTO}
   */
  public toDTO(): MessageDTO {
    return {
      payload: this.payload,
      type: 1,
    } as MessageDTO;
  }

  /**
   * Message string
   * @returns {string}
   */
  public plain(): string {
    return Message.decodeHex(this.payload);
  }
}

export const EmptyMessage = PlainMessage.create("");
