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

import {Balance} from "./Balance";
import {AccountHistoricalDataViewModelDTO} from "../../infrastructure/account/AccountHistoricalDataViewModelDTO";
import {Address} from "./Address";

/**
 *
 * Nodes can support a feature for retrieving historical data of accounts.
 * If this is supported, it returns an array of AccountHistoricalInfo
 */
export class AccountHistoricalInfo {

  /**
   * The balance of the account in micro NEM.
   */
  readonly balance: Balance;

  /**
   * The importance of the account.
   */
  readonly importance: number;

  /**
   * The public key of the account.
   */
  readonly address: Address;

  /**
   * The page rank part of the importance.
   */
  readonly pageRank: number;

  /**
   * @internal
   * @param balance
   * @param vestedBalance
   * @param importance
   * @param address
   * @param pageRank
   */
  constructor(
    balance: number,
    vestedBalance: number,
    importance: number,
    address: string,
    pageRank: number
  ){
    this.balance = new Balance(balance, vestedBalance);
    this.importance = importance;
    this.address = new Address(address);
    this.pageRank = pageRank;
  }

  /**
   * @internal
   * @param dto
   * @returns {AccountHistoricalInfo}
   */
  static createFromAccountHistoricalDataViewModelDTO(dto: AccountHistoricalDataViewModelDTO): AccountHistoricalInfo {
    return new AccountHistoricalInfo(
      dto.balance,
      dto.vestedBalance,
      dto.importance,
      dto.address,
      dto.pageRank,
    )
  }
}
