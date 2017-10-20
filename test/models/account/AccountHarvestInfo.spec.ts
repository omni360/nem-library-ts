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
import {HarvestInfoDTO} from "../../../src/infrastructure/account/HarvestInfoDTO";
import {AccountHarvestInfo} from "../../../src/models/account/AccountHarvestInfo";

describe("AccountHarvestInfo", () => {

  it("should create an AccountHarvestInfo object", (done) => {
    const harvestInfoDTO = {
      timeStamp: 1,
      id: 1,
      difficulty: 1,
      totalFee: 1,
      height: 1,
    } as HarvestInfoDTO;

    const accountHarvestInfo = AccountHarvestInfo.createFromHarvestInfoDTO(harvestInfoDTO);
    expect(accountHarvestInfo.timeStamp).to.be.equal(1);
    expect(accountHarvestInfo.id).to.be.equal(1);
    expect(accountHarvestInfo.difficulty).to.be.equal(1);
    expect(accountHarvestInfo.totalFee).to.be.equal(1);
    expect(accountHarvestInfo.height).to.be.equal(1);

    done();
  });

});
