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
import {MosaicId} from "../../../src/models/mosaic/MosaicId";

describe("MosaicId", () => {

  it("should create a mosaicId object", () => {
    const namespaceId = "nem";
    const name = "coin";

    const mosaicId = new MosaicId(namespaceId, name);

    expect(mosaicId.namespaceId).to.be.equal(namespaceId);
    expect(mosaicId.name).to.be.equal(name);
  });

  it("should two mosaics be equal", () => {
    const mosaic = new MosaicId("nem", "coin");
    expect(mosaic.equals(mosaic)).to.be.true;
  });

  it("should two mosaics be different with different namespaceId", () => {
    const mosaic = new MosaicId("nem", "coin");
    const otherMosaic = new MosaicId("xem", "coin");
    expect(mosaic.equals(otherMosaic)).to.be.false;
  });

  it("should two mosaics be different with different name", () => {
    const mosaic = new MosaicId("nem", "coin");
    const otherMosaic = new MosaicId("nem", "xem");
    expect(mosaic.equals(otherMosaic)).to.be.false;
  });

  it("should return mosaicId description", () => {
    const mosaic = new MosaicId("nem", "coin");
    expect(mosaic.description()).to.be.equal("nem:coin");
  });

  it("should return the mosaic to string", () => {
    const mosaic = new MosaicId("nem", "coin");
    expect(mosaic.toString()).to.be.equal("nem:coin");
    expect("" + mosaic).to.be.equal("nem:coin");
  });
});
