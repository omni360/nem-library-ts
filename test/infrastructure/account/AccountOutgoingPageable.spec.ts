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

import nock = require("nock");
import {AccountHttp} from "../../../src/infrastructure/AccountHttp";
import {Address} from "../../../src/models/account/Address";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {expect} from "chai";

describe("AccountOutgoingPageable", () => {
  let address: Address;
  let accountHttp: AccountHttp;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    address = new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K");
    accountHttp = new AccountHttp([{domain: "bigalice2.nem.ninja"}]);
    nock("http://bigalice2.nem.ninja:7890")
      .get("/account/transfers/outgoing?address=TDM3DOZM5WJ3ZRBPSMYRU6JSWKUCAH5VIPOF4W7K&pageSize=10")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_outgoing_1.json")
      .get("/account/transfers/outgoing?address=TDM3DOZM5WJ3ZRBPSMYRU6JSWKUCAH5VIPOF4W7K&id=128332&pageSize=10")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_outgoing_2.json")
  });

  after(() => {
    NEMLibrary.reset();
    nock.cleanAll();
  });


  it("should receive the first file", done => {
    accountHttp.outgoingTransactions(address)
      .subscribe(x => {
          expect(x).to.have.length(10);
          expect(x[0].getTransactionInfo().hash.data).to.be.equal("8ff2505f82bf0706708cc96cbe472fd0ef6c7db799d0c309004cbbc06bea9d0f");
          done();
        }
      )
  });

  it("should receive the second json file", done => {
    accountHttp.outgoingTransactions(address, {id: 128332})
      .subscribe(x => {
          expect(x).to.have.length(10);
          expect(x[0].getTransactionInfo().hash.data).to.be.equal("a0f634f947b1e69581f757f0745cfcad7ab5c41fac952b78e402ce80edbaaf68");
          done();
        }
      )
  });

  it("should be able to iterate the responses", done => {
    let pageable = accountHttp.outgoingTransactionsPaginated(address);
    let first = true;
    pageable.subscribe(x => {
      if (first) {
        first = false;
        pageable.nextPage();
        expect(x).to.be.length(10);
        expect(x[0].getTransactionInfo().hash.data).to.be.equal("8ff2505f82bf0706708cc96cbe472fd0ef6c7db799d0c309004cbbc06bea9d0f");
      } else {
        expect(x[0].getTransactionInfo().hash.data).to.be.equal("a0f634f947b1e69581f757f0745cfcad7ab5c41fac952b78e402ce80edbaaf68");
        done();
      }
    });
  });
});

