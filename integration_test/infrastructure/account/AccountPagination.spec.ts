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

import {NEMLibrary, NetworkTypes} from "../../../index";
import {AccountHttp} from "../../../src/infrastructure/AccountHttp";
import {Address} from "../../../src/models/account/Address";

describe("AccountPagination", () => {
  let accountHttp: AccountHttp;
  let address: Address;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    accountHttp = new AccountHttp([
      {protocol: "http", domain: "bigalice2.nem.ninja", port: 7890}
    ]);
    address = new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K")
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should do pagination", done => {
    let pagedTransactions = accountHttp.allTransactionsPaginated(address, 5);
    let time = 0;
    pagedTransactions.subscribe(x => {
      if (time == 2) {
        done();
      }
      else {
        pagedTransactions.nextPage();
      }
    }, err => {
      console.error(err);
    }, () => {
      done();
    });

  });

  it("should return transactions confirmed", done => {
    let paginatedTransactions = accountHttp.incomingTransactionsPaginated(address, 5);
    paginatedTransactions
      .subscribe(transactions => {
        transactions.map(_ => _.getTransactionInfo());
        done();
      });
  });
});

