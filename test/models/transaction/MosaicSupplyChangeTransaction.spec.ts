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
import {MosaicId} from "../../../src/models/mosaic/MosaicId";
import {
  MosaicSupplyChangeTransaction,
  MosaicSupplyType,
} from "../../../src/models/transaction/MosaicSupplyChangeTransaction";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";

describe("MosaicSupplyChangeTransaction", () => {
  const PUBLIC_KEY = "5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b";
  const mosaicId = new MosaicId("nem-library", "coin");

  it("should be created", () => {
    const transaction = new MosaicSupplyChangeTransaction(
      TimeWindow.createWithDeadline(),
      -1744830462,
      mosaicId,
      MosaicSupplyType.Increase,
      1000,
      454545,
    );
    deepEqual(transaction.mosaicId, mosaicId);
    expect(transaction.delta).to.be.equal(1000);
    expect(transaction.supplyType).to.be.equal(MosaicSupplyType.Increase);
    expect(transaction.fee).to.be.equal(454545);
  });

  it("should be created by named constructor", () => {
    const transaction = MosaicSupplyChangeTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicId,
      MosaicSupplyType.Increase,
      1000);

    deepEqual(transaction.mosaicId, mosaicId);
    expect(transaction.delta).to.be.equal(1000);
    expect(transaction.supplyType).to.be.equal(MosaicSupplyType.Increase);
  });

  it("should have the fee calculated for TEST_NET", () => {
    const transaction = MosaicSupplyChangeTransaction.create(
      TimeWindow.createWithDeadline(),
      mosaicId,
      MosaicSupplyType.Increase,
      1000);
    expect(transaction.fee).to.be.equal(Math.floor(3.0 * 0.05 * 1000000.0));
  });
});
