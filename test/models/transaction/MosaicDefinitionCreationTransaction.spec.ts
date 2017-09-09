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

import {MosaicDefinitionCreationTransaction} from "../../../src/models/transaction/MosaicDefinitionCreationTransaction";
import {PublicAccount} from "../../../src/models/account/PublicAccount";
import {MosaicDefinition, MosaicProperties} from "../../../src/models/mosaic/MosaicDefinition";
import {MosaicId} from "../../../src/models/mosaic/MosaicId";
import {expect} from "chai";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {deepEqual} from "assert";

describe("MosaicDefinitionCreationTransaction", () => {
  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  const PUBLIC_KEY = "5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b";

  it("should be created", () => {
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = new MosaicDefinitionCreationTransaction(
      TimeWindow.createWithDeadline(),
      1744830466,
      5,
      publicAccount.address,
      mosaicDefinition,
      454545
    );
    deepEqual(transaction.mosaicDefinition, mosaicDefinition);
    expect(transaction.creationFee).to.be.equal(5);
    expect(transaction.mosaicDefinition.levy).to.be.undefined;
    deepEqual(transaction.creationFeeSink, publicAccount.address);
    expect(transaction.fee).to.be.equal(454545);
  });

  it("should be created from DTO", () => {
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = new MosaicDefinitionCreationTransaction(
      TimeWindow.createWithDeadline(),
      1744830466,
      5,
      publicAccount.address,
      mosaicDefinition,
      454545
    );
    deepEqual(transaction.mosaicDefinition, mosaicDefinition);
    expect(transaction.creationFee).to.be.equal(5);
    expect(transaction.mosaicDefinition.levy).to.be.undefined;
    deepEqual(transaction.creationFeeSink, publicAccount.address);
    expect(transaction.fee).to.be.equal(454545);
  });


  it("should be created by named constructor", () => {
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = MosaicDefinitionCreationTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicDefinition);
    deepEqual(transaction.mosaicDefinition, mosaicDefinition);
    expect(transaction.creationFee).to.be.equal(10 * 1000000);
  });

  it("should have the fee calculated for TEST_NET", () => {
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = MosaicDefinitionCreationTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicDefinition);
    expect(transaction.fee).to.be.equal(Math.floor(3 * 0.05 * 1000000));
  });

  it("should have the specific rental fee sink for TEST_NET", () => {
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = MosaicDefinitionCreationTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicDefinition);
    expect(transaction.creationFeeSink.pretty()).to.be.equal("TBMOSA-ICOD4F-54EE5C-DMR23C-CBGOAM-2XSJBR-5OLC");
    NEMLibrary.reset();
  });

  it("should have the specific rental fee sink for MAIN_NET", () => {
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    let publicAccount = PublicAccount.createWithPublicKey(PUBLIC_KEY);
    let mosaicDefinition = new MosaicDefinition(publicAccount, new MosaicId("nem-library", "nem-library"), "my definition", new MosaicProperties());
    const transaction = MosaicDefinitionCreationTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicDefinition);
    expect(transaction.creationFeeSink.pretty()).to.be.equal("NBMOSA-ICOD4F-54EE5C-DMR23C-CBGOAM-2XSIUX-6TRS");
    NEMLibrary.reset();
  });
});