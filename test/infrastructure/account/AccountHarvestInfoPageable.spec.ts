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

describe("AccountHarvestInfoPageable", () => {
  let address: Address;
  let accountHttp: AccountHttp;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    address = new Address("TALICESKTW5TAN5GEOK4TQKD43AUGSDTHK7UIIAK");
    accountHttp = new AccountHttp([{domain: "bigalice2.nem.ninja"}]);
    nock("http://bigalice2.nem.ninja:7890")
      .get("/account/harvests?address=TALICESKTW5TAN5GEOK4TQKD43AUGSDTHK7UIIAK")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_harvest_info_1.json")
      .get("/account/harvests?address=TALICESKTW5TAN5GEOK4TQKD43AUGSDTHK7UIIAK&id=1044488")
      .thrice()
      .replyWithFile(200, __dirname + "/responses/account_harvest_info_2.json")
  });

  after(() => {
    NEMLibrary.reset();
    nock.cleanAll();
  });


  it("should receive the first file", done => {
    accountHttp.getHarvestInfoDataForAnAccount(address).subscribe(
      x => {
        expect(x).to.have.length(25);
        expect(x[0].id).to.be.equal(1044775);
        done();
      }
    )
  });

  it("should receive the second json file", done => {
    accountHttp.getHarvestInfoDataForAnAccount(address, "1044488").subscribe(
      x => {
        expect(x).to.have.length(25);
        expect(x[0].id).to.be.equal(1044484);
        done();
      }
    )
  });

  it("should be able to iterate the responses", done => {
    let pageable = accountHttp.getHarvestInfoDataForAnAccountPaginated(address);
    let first = true;
    pageable.subscribe(x => {
      if (first) {
        first = false;
        pageable.nextPage();
        expect(x[0].id).to.be.equal(1044775);
      } else {
        expect(x[0].id).to.be.equal(1044484);
        done();
      }
    });
  });
});