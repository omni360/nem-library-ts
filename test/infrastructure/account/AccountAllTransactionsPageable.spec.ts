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

import {expect} from "chai";
import nock = require("nock");
import {AccountHttp} from "../../../src/infrastructure/AccountHttp";
import {Address} from "../../../src/models/account/Address";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../../src/NEMLibrary";

describe("AccountAllTransactionsPageable", () => {
  let address: Address;
  let accountHttp: AccountHttp;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    address = new Address("TCFFOM-Q2SBX7-7E2FZC-3VX43Z-TRV4ZN-TXTCGW-BM5J");
    accountHttp = new AccountHttp([{protocol: "http", domain: "bigalice2.nem.ninja"}]);
    nock("http://bigalice2.nem.ninja:7890")
      .get("/account/transfers/all?address=TCFFOMQ2SBX77E2FZC3VX43ZTRV4ZNTXTCGWBM5J&pageSize=10")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_all_1.json")
      .get("/account/transfers/all?address=TCFFOMQ2SBX77E2FZC3VX43ZTRV4ZNTXTCGWBM5J&id=124876&pageSize=10")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_all_2.json");
  });

  after(() => {
    NEMLibrary.reset();
    nock.cleanAll();
  });

  it("should receive the first file", (done) => {
    accountHttp.allTransactions(address, {pageSize: 10})
      .subscribe(
        (x) => {
          expect(x).to.have.length(10);
          expect(x[0].getTransactionInfo().hash.data).to.be.equal("339645a75f41b40ebae4d39abbdbede7c5dec472efe812143142926bcb17124b");
          done();
        },
      );
  });

  it("should receive the second json file", (done) => {
    accountHttp.allTransactions(address, {
      id: 124876,
      pageSize: 10,
    })
      .subscribe(
        (x) => {
          expect(x).to.have.length(10);
          expect(x[0].getTransactionInfo().hash.data).to.be.equal("3879ae9070a5a17cdfbb3eee09467e4e63c46edb8c7dbdcf44eab97fe15ae1f8");
          done();
        },
      );
  });

  it("should be able to iterate the responses", (done) => {
    const pageable = accountHttp.allTransactionsPaginated(address, {pageSize: 10});
    let first = true;
    pageable.subscribe((x) => {
      if (first) {
        first = false;
        pageable.nextPage();
        expect(x).to.be.length(10);
        expect(x[0].getTransactionInfo().hash.data).to.be.equal("339645a75f41b40ebae4d39abbdbede7c5dec472efe812143142926bcb17124b");
      } else {
        expect(x[0].getTransactionInfo().hash.data).to.be.equal("3879ae9070a5a17cdfbb3eee09467e4e63c46edb8c7dbdcf44eab97fe15ae1f8");
        done();
      }
    });
  });
});
