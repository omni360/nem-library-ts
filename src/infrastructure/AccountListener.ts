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

import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {AccountInfoWithMetaData} from "../models/account/AccountInfo";
import {Address} from "../models/account/Address";
import {Listener, WebSocketConfig} from "./Listener";

/**
 * Account listener
 */
export class AccountListener extends Listener {

  /**
   * Constructor
   * @param nodes
   */
  constructor(nodes?: WebSocketConfig[]) {
    super(nodes);
  }

  /**
   * Start listening updates
   * @param address
   * @returns {Observable<AccountInfoWithMetaData>}
   */
  public given(address: Address): Observable<AccountInfoWithMetaData> {
    return Observable.create((observer: Observer<AccountInfoWithMetaData>) => {
      const client = this.createClient();
      client.connect({}, () => {
        client.subscribe("/account/" + address.plain(), (data) => {
          try {
            const account = AccountInfoWithMetaData.createFromAccountMetaDataPairDTO(JSON.parse(data.body));
            observer.next(account);
          } catch (e) {
            observer.error(e);
          }
        });
      }, (err) => {
        observer.error(err);
      });
      return () => {
        client.unsubscribe();
      };
    }).retry(10);
  }
}
