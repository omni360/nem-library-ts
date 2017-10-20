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
import {AccountHttp} from "../../src/infrastructure/AccountHttp";
import {MosaicHttp} from "../../src/infrastructure/MosaicHttp";
import {Address} from "../../src/models/account/Address";
import {MosaicDefinition} from "../../src/models/mosaic/MosaicDefinition";
import {MosaicTransferable} from "../../src/models/mosaic/MosaicTransferable";
import {NetworkTypes} from "../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../src/NEMLibrary";
import {AccountOwnedMosaicsService} from "../../src/services/AccountOwnedMosaicsService";

describe("AccountOwnedMosaicsService", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should return all mosaic definitions", (done) => {
    const accountOwnedMosaics = new AccountOwnedMosaicsService(new AccountHttp(), new MosaicHttp());
    accountOwnedMosaics.fromAddress(new Address("TANLDM5VDKSZJQX4GFLOEC4V5OVHIJZFACRHUWI5")).subscribe((mosaics) => {
      expect(mosaics).to.have.length.greaterThan(0);
      expect(mosaics[0]).to.be.instanceof(MosaicTransferable);
      done();
    });
  });
});
