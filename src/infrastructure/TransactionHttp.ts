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

import * as requestPromise from "request-promise-native";
import {Observable} from "rxjs";
import {NemAnnounceResult} from "../models/transaction/NemAnnounceResult";
import {SignedTransaction} from "../models/transaction/SignedTransaction";
import {Transaction} from "../models/transaction/Transaction";
import {HttpEndpoint, ServerConfig} from "./HttpEndpoint";
import {CreateTransactionFromDTO} from "./transaction/CreateTransactionFromDTO";
import {NemAnnounceResultDTO} from "./transaction/NemAnnounceResultDTO";

export class TransactionHttp extends HttpEndpoint {

  constructor(nodes?: ServerConfig[]) {
    super("transaction", nodes);
  }

  /**
   * Send the signed transaction
   * @param transaction
   * @returns Observable<NemAnnounceSuccessResult>
   */
  public announceTransaction(transaction: SignedTransaction): Observable<NemAnnounceResult> {
    return Observable.of("announce")
      .flatMap((url) => requestPromise.post({
        uri: this.nextNode() + url,
        body: transaction,
        json: true,
      }))
      .retryWhen(this.replyWhenRequestError)
      .map((nemAnnonceResultDTO: NemAnnounceResultDTO) => {
        if (nemAnnonceResultDTO.message != "SUCCESS") {
          throw new Error(nemAnnonceResultDTO.message);
        }
        return NemAnnounceResult.createFromNemAnnounceResultDTO(nemAnnonceResultDTO);
      });
  }

  /**
   * Receive a transaction by its hash
   * @param {string} hash - transaction hash
   * @returns Observable<Transaction>
   */
  public getByHash(hash: string): Observable<Transaction> {
    return Observable.of("get?hash=" + hash)
      .flatMap((url) => requestPromise.get({
        uri: this.nextNode() + url,
        json: true,
      }))
      .retryWhen(this.replyWhenRequestError)
      .map((transactionDTO) => CreateTransactionFromDTO(transactionDTO));
  }
}
