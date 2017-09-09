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

import {HashData} from "./HashData";
import {NemRequestResultDTO} from "./NemRequestResultDTO";

/**
 * @internal
 * The NemAnnounceResult extends the NemRequestResult by supplying the additional fields 'transactionHash' and in case of a multisig transaction 'innerTransactionHash'.
 */
export interface NemAnnounceResultDTO extends NemRequestResultDTO {

  /**
   * The JSON hash object of the transaction.
   */
  readonly transactionHash: HashData;

  /**
   * The JSON hash object of the inner transaction or null if the transaction is not a multisig transaction.
   */
  readonly innerTransactionHash: HashData;

}
