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
 * Nodes can support a feature for retrieving historical data of accounts. If a node supports this feature, it will return an array of AccountHistoricalDataViewModelDTO objects
 */
export interface AccountHistoricalDataViewModelDTO {

  /**
   * The height for which the data is valid.
   */
  readonly height: number;

  /**
   * The address of the account.
   */
  readonly address: string;

  /**
   * The balance of the account.
   */
  readonly balance: number;

  /**
   * The vested part of the balance.
   */
  readonly vestedBalance: number;

  /**
   * The unvested part of the balance.
   */
  readonly unvestedBalance: number;

  /**
   * The importance of the account.
   */
  readonly importance: number;

  /**
   * The page rank part of the importance.
   */
  readonly pageRank: number;
}
