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
 * @internal
 * Each account is assigned an importance in the NEM network. The ability of an account to generate new blocks is proportional to its importance. The importance is a number between 0 and 1.
 */
export interface AccountImportanceViewModelDTO {

  /**
   * The address of the account.
   */
  readonly address: string;

  /**
   * Substructure that describes the importance of the account.
   */
  readonly importance: AccountImportanceDataDTO;

}

/**
 * @internal
 * Substructure that describes the importance of the account.
 */
export interface AccountImportanceDataDTO {

  /**
   * Indicates if the fields "score", "ev" and "height" are available.isSet can have the values 0 or 1. In case isSet is 0 the fields are not available.
   */
  readonly isSet: number;

  /**
   * The importance of the account. The importance ranges between 0 and 1.
   */
  readonly score: number;

  /**
   * The page rank portion of the importance. The page rank ranges between 0 and 1.
   */
  readonly ev: number;

  /**
   * The height at which the importance calculation was performed.
   */
  readonly height: number;
}

