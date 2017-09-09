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

import {Mosaic} from "../../../src/models/mosaic/Mosaic";
import {expect} from "chai";
import {MosaicId} from "../../../src/models/mosaic/MosaicId";
import {MosaicDefinition, MosaicProperties} from "../../../src/models/mosaic/MosaicDefinition";
import {PublicAccount} from "../../../src/models/account/PublicAccount";
import {MosaicLevy, MosaicLevyType} from "../../../src/models/mosaic/MosaicLevy";
import {Address} from "../../../src/models/account/Address";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {deepEqual} from "assert";
import {MosaicTransferable} from "../../../src/models/mosaic/MosaicTransferable";

describe("Mosaic", () => {
  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a mosaic transferable object", () => {
    const namespaceId = "nem";
    const name = "coin";
    const quantity = 10;

    const mosaicTransferable = new MosaicTransferable(new MosaicId(namespaceId, name), new MosaicProperties(0, 1000, true, false), quantity);
    expect(mosaicTransferable.mosaicId.namespaceId).to.be.equal(namespaceId);
    expect(mosaicTransferable.mosaicId.name).to.be.equal(name);
    expect(mosaicTransferable.quantity()).to.be.equal(quantity);
    expect(mosaicTransferable.levy).to.be.undefined;
    expect(mosaicTransferable.properties.initialSupply).to.be.equal(1000);
    expect(mosaicTransferable.properties.divisibility).to.be.equal(0);
    expect(mosaicTransferable.properties.transferable).to.be.true;
    expect(mosaicTransferable.properties.supplyMutable).to.be.false;
  });

  it("should create a mosaic transferable object with levy", () => {
    const quantity = 10;
    const mosaicId = new MosaicId("nem", "xem");
    const levy = new MosaicLevy(MosaicLevyType.Absolute, new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA"), new MosaicId("nem", "xem"), 1);

    const mosaicTransferable = new MosaicTransferable(mosaicId, new MosaicProperties(0, 1000, true, false), quantity, levy);
    deepEqual(mosaicTransferable.mosaicId, mosaicId);
    expect(mosaicTransferable.quantity()).to.be.equal(quantity);
    expect(mosaicTransferable.properties.initialSupply).to.be.equal(1000);
    expect(mosaicTransferable.properties.divisibility).to.be.equal(0);
    expect(mosaicTransferable.properties.transferable).to.be.true;
    expect(mosaicTransferable.properties.supplyMutable).to.be.false;
    deepEqual(mosaicTransferable.levy, levy);
  });


  it("should create a mosaicDefinition object", () => {
    const creator = PublicAccount.createWithPublicKey("a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a");
    const id = new MosaicId("nem", "coin");
    const description = "mosaicDescription";
    const properties = new MosaicProperties(0, 1000, true, false);
    const levy: MosaicLevy = new MosaicLevy(1, new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA"), id, 1000000);

    const mosaicDefinition = new MosaicDefinition(creator, id, description, properties, levy);
    const mosaicTransferable = MosaicTransferable.createWithMosaicDefinition(mosaicDefinition, 10);

    deepEqual(mosaicTransferable.mosaicId, id);
    expect(mosaicTransferable.quantity()).to.be.equal(10);
    expect(mosaicTransferable.properties.transferable).to.be.equal(true);
    expect(mosaicTransferable.properties.supplyMutable).to.be.equal(false);
    expect(mosaicTransferable.properties.initialSupply).to.be.equal(1000);
    expect(mosaicTransferable.properties.divisibility).to.be.equal(0);
    deepEqual(mosaicTransferable.levy, levy);

  });

});
