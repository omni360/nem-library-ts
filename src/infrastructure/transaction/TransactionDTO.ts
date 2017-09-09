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

export interface TransactionDTO {

  /**
   * The number of seconds elapsed since the creation of the nemesis block.
   */
  readonly timeStamp: number;

  /**
   * The transaction signature (missing if part of a multisig transaction).
   */
  readonly signature?: string;

  /**
   * The fee for the transaction. The higher the fee, the higher the priority of the transaction. Transactions with high priority get included in a block before transactions with lower priority.
   */
  readonly fee: number;

  /**
   * The transaction type.
   */
  readonly type: number;

  /**
   * The deadline of the transaction. The deadline is given as the number of seconds elapsed since the creation of the nemesis block.
   * If a transaction does not get included in a block before the deadline is reached, it is deleted.
   */
  readonly deadline: number;

  /**
   * The version of the structure.
   */
  readonly version: number;

  /**
   * The public key of the account that created the transaction.
   */
  readonly signer: string;
}