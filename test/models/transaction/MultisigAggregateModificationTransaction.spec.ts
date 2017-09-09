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

import {
  CosignatoryModification,
  CosignatoryModificationAction,
  MultisigAggregateModificationTransaction
} from "../../../src/models/transaction/MultisigAggregateModificationTransaction";
import {expect} from "chai";
import {PublicAccount} from "../../../src/models/account/PublicAccount";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";

describe("MultisigAggregateModificationTransaction", () => {
  let modifications;
  let publicKey;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    publicKey = 'a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a';
    modifications = [
      new CosignatoryModification(PublicAccount.createWithPublicKey(publicKey), CosignatoryModificationAction.ADD)
    ];
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should be created", () => {
    const transaction = new MultisigAggregateModificationTransaction(TimeWindow.createWithDeadline(), -1744830462, modifications, 454545, "585e68a4a4677a2fef3883353e0b1e57d7c9d9a9b0ee84baff58462a044aabee38353c29d81d5ccee23ae1ea6bb34f6bcd54500d4c4d1dd68ce8d0eb6eac730a", 2);
    expect(transaction.relativeChange).to.be.equal(2);
    expect(transaction.modifications).to.have.length(1);
    expect(transaction.fee).to.be.equal(454545);
  });

  it("should be created by named constructor", () => {
    const transaction = MultisigAggregateModificationTransaction.create(TimeWindow.createWithDeadline(), modifications, 2);
    expect(transaction.relativeChange).to.be.equal(2);
    expect(transaction.modifications).to.have.length(1);
  });

  it("should have the fee calculated for TEST_NET", () => {
    const transaction = MultisigAggregateModificationTransaction.create(TimeWindow.createWithDeadline(), modifications, 2);
    expect(transaction.fee).to.be.equal(Math.floor(10.0 * 0.05 * 1000000));
  });
});