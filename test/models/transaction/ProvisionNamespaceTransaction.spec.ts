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
import {Address} from "../../../src/models/account/Address";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {ProvisionNamespaceTransaction} from "../../../src/models/transaction/ProvisionNamespaceTransaction";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";
import {NEMLibrary} from "../../../src/NEMLibrary";

describe("ProvisionNamespaceTransaction", () => {
  const address = "TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35";

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should be created from constructor", () => {
    const transaction = new ProvisionNamespaceTransaction(
      TimeWindow.createWithDeadline(),
      1234,
      new Address(address),
      54545,
      "library",
      54545,
      undefined,
      "nem");
    expect(transaction.newPart).to.be.equal("library");
    expect(transaction.parent).to.be.equal("nem");
    expect(transaction.rentalFeeSink.plain()).to.be.equal(address);
    expect(transaction.fee).to.be.equal(54545);
  });

  it("should be created from static constructor", () => {
    const transaction = ProvisionNamespaceTransaction.create(
      TimeWindow.createWithDeadline(),
      "library",
      "nem");
    expect(transaction.newPart).to.be.equal("library");
    expect(transaction.parent).to.be.equal("nem");
    expect(transaction.rentalFeeSink.plain()).to.be.equal(address);
  });

  it("should have the fee calculated for root namesapce TEST_NET", () => {
    const transaction = ProvisionNamespaceTransaction.create(
      TimeWindow.createWithDeadline(),
      "library");
    expect(transaction.fee).to.be.equal(Math.floor(3 * 0.05 * 1000000));
    expect(transaction.rentalFee).to.be.equal(Math.floor(100 * 1000000));
  });

  it("should have the fee calculated for sub namesapce TEST_NET", () => {
    const transaction = ProvisionNamespaceTransaction.create(
      TimeWindow.createWithDeadline(),
      "library",
      "nem");
    expect(transaction.fee).to.be.equal(Math.floor(3 * 0.05 * 1000000));
    expect(transaction.rentalFee).to.be.equal(Math.floor(10 * 1000000));
  });

  it("should have the specific rental fee sink for TEST_NET", () => {
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    const transaction = ProvisionNamespaceTransaction.create(
      TimeWindow.createWithDeadline(),
      "library",
      "nem");
    expect(transaction.rentalFeeSink.pretty()).to.be.equal("TAMESP-ACEWH4-MKFMBC-VFERDP-OOP4FK-7MTDJE-YP35");
    NEMLibrary.reset();
  });

  it("should have the specific rental fee sink for MAIN_NET", () => {
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    const transaction = ProvisionNamespaceTransaction.create(
      TimeWindow.createWithDeadline(),
      "library",
      "nem");
    expect(transaction.rentalFeeSink.pretty()).to.be.equal("NAMESP-ACEWH4-MKFMBC-VFERDP-OOP4FK-7MTBXD-PZZA");
    NEMLibrary.reset();
  });
});
