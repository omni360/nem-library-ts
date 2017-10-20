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
import {DimCoin, DimToken, EcobitEco} from "../../../src/models/mosaic/ThirdPartyMosaics";

describe("ThirdPartyMosaics", () => {

  it("DimCoin", () => {
    const dimcoin = new DimCoin(20);

    expect(dimcoin.mosaicId.namespaceId).to.be.equal("dim");
    expect(dimcoin.mosaicId.name).to.be.equal("coin");
    expect(dimcoin.properties.divisibility).to.be.equal(6);
    expect(dimcoin.properties.initialSupply).to.be.equal(9000000000);
    expect(dimcoin.properties.transferable).to.be.equal(true);
    expect(dimcoin.properties.supplyMutable).to.be.equal(false);
    expect(dimcoin.quantity()).to.be.equal(20000000);
  });

  it("DimToken", () => {
    const dimToken = new DimToken(10);

    expect(dimToken.mosaicId.namespaceId).to.be.equal("dim");
    expect(dimToken.mosaicId.name).to.be.equal("token");
    expect(dimToken.properties.divisibility).to.be.equal(6);
    expect(dimToken.properties.initialSupply).to.be.equal(10000000);
    expect(dimToken.properties.transferable).to.be.equal(true);
    expect(dimToken.properties.supplyMutable).to.be.equal(false);
    expect(dimToken.quantity()).to.be.equal(10000000);
  });

  it("EcobitEco", () => {
    const ecobitEco = new EcobitEco(10);

    expect(ecobitEco.mosaicId.namespaceId).to.be.equal("ecobit");
    expect(ecobitEco.mosaicId.name).to.be.equal("eco");
    expect(ecobitEco.properties.divisibility).to.be.equal(0);
    expect(ecobitEco.properties.initialSupply).to.be.equal(8888888888);
    expect(ecobitEco.properties.transferable).to.be.equal(true);
    expect(ecobitEco.properties.supplyMutable).to.be.equal(false);
    expect(ecobitEco.quantity()).to.be.equal(10);
  });
});
