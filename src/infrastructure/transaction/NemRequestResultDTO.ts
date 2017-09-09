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

/**
 * 1: The result is a validation result.
 * 2: The result is a heart beat result.
 * 4: The result indicates a status.
 */
export type TypeNemAnnounceResult = 1 | 2 | 4;

/**
 * View specification at http://bob.nem.ninja/docs/#nemRequestResult
 */
export type CodeNemAnnounceResult =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

/**
 * @internal
 * The NemAnnounceResult extends the NemRequestResult by supplying the additional fields 'transactionHash' and in case of a multisig transaction 'innerTransactionHash'.
 */
export interface NemRequestResultDTO {
  /**
   * The type is dependent on the request which was answered.
   */
  readonly type: TypeNemAnnounceResult;

  /**
   * The meaning of the code is dependent on the type.
   */
  readonly code: CodeNemAnnounceResult;

  /**
   * Error or success message
   */
  readonly message: string;

}