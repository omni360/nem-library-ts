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

import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {AccountHttp} from "../../../src/infrastructure/AccountHttp";
import {Address} from "../../../src/models/account/Address";
import {TestVariables} from "../../config/TestVariables.spec";

describe("AccountHttp.DecodeMessage", () => {
  let accountHttp: AccountHttp;
  let address: Address;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    accountHttp = new AccountHttp();
    address = new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K");
  });

  after(() => {
    NEMLibrary.reset();
  });

  /**
   * Used for ensure decoding for multiple langagues
   */
  /*it("read plain message", done => {
    accountHttp.incomingTransactions(address)
      .flatMap(x => x)
      .take(1)
      .subscribe(transaction => {
        expect(transaction.type).to.be.equal(TransactionTypes.TRANSFER);
        let transferTransaction = <TransferTransaction>transaction;
        let plainMessage = <PlainMessage>transferTransaction.message;
        expect(plainMessage.plain()).to.be.equal("have a nice testing");
        done();
      })
  })*/
});