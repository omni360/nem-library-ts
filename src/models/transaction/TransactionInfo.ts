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

export class HashData {
  constructor(readonly data: string) {
  }
}

export class TransactionInfo {
  /**
   * The height of the block in which the transaction was included.
   */
  readonly height: number;

  /**
   *  The id of the transaction.
   */
  readonly id: number;

  /**
   *  The transaction hash.
   */
  readonly hash: HashData;

  /**
   * constructor
   * @param height
   * @param id
   * @param hash
   */
  constructor(
    height: number,
    id: number,
    hash: HashData) {

    this.height = height;
    this.id = id;
    this.hash = hash;
  }
}

export class MultisigTransactionInfo extends TransactionInfo {
  /**
   * The hash of the inner transaction. This entry is only available for multisig transactions.
   */
  readonly innerHash: HashData;

  /**
   * constructor
   * @param height
   * @param id
   * @param hash
   * @param innerHash
   */
  constructor(height: number, id: number, hash: HashData, innerHash: HashData) {
    super(height, id, hash);
    this.innerHash = innerHash;
  }
}