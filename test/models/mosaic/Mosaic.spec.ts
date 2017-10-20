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

import {deepEqual} from "assert";
import {expect} from "chai";
import {Address} from "../../../src/models/account/Address";
import {PublicAccount} from "../../../src/models/account/PublicAccount";
import {Mosaic} from "../../../src/models/mosaic/Mosaic";
import {MosaicDefinition, MosaicProperties} from "../../../src/models/mosaic/MosaicDefinition";
import {MosaicId} from "../../../src/models/mosaic/MosaicId";
import {MosaicLevy} from "../../../src/models/mosaic/MosaicLevy";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../../src/NEMLibrary";

describe("Mosaic", () => {
  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a mosaic object", () => {
    const namespaceId = "nem";
    const name = "coin";
    const quantity = 10;

    const mosaic = new Mosaic(new MosaicId(namespaceId, name), quantity);
    expect(mosaic.mosaicId.namespaceId).to.be.equal(namespaceId);
    expect(mosaic.mosaicId.name).to.be.equal(name);
    expect(mosaic.quantity).to.be.equal(quantity);
  });

  it("should create a mosaicId object", () => {
    const namespaceId = "nem";
    const name = "coin";

    const mosaic = new MosaicId(namespaceId, name);
    expect(mosaic.namespaceId).to.be.equal(namespaceId);
    expect(mosaic.name).to.be.equal(name);
  });

  it("should create a mosaicLevy object", () => {
    const type = 1;
    const recipient = new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA");
    const mosaicId = new MosaicId("nem", "coin");
    const fee = 1000000;

    const mosaicLevy = new MosaicLevy(type, recipient, mosaicId, fee);
    expect(mosaicLevy.type).to.be.equal(type);
    expect(mosaicLevy.recipient).to.be.equal(recipient);
  });

  it("should create a mosaicDefinition object", () => {
    const creator = PublicAccount.createWithPublicKey("a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a");
    const id = new MosaicId("nem", "coin");
    const description = "mosaicDescription";
    const properties = new MosaicProperties(1000, 1000, true, false);
    const levy: MosaicLevy = new MosaicLevy(1, new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA"), id, 1000000);

    const mosaic = new MosaicDefinition(creator, id, description, properties, levy);
    deepEqual(mosaic.creator, creator);
    deepEqual(mosaic.id, id);
    expect(mosaic.description).to.be.equal(description);
    expect(mosaic.properties.transferable).to.be.equal(true);
    expect(mosaic.properties.supplyMutable).to.be.equal(false);
    expect(mosaic.properties.initialSupply).to.be.equal(1000);
    expect(mosaic.properties.divisibility).to.be.equal(1000);
    deepEqual(mosaic.levy, levy);

  });

});
