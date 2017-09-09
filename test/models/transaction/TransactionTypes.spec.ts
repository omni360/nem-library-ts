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

import {TransactionTypes} from "../../../src/models/transaction/TransactionTypes";
import {expect} from "chai";

describe("TransactionTypes", () => {

  it("TRANSFER", () => {
    expect(TransactionTypes.TRANSFER).to.be.equal(0x0101);
    expect(TransactionTypes.TRANSFER).to.be.equal(257);
  });

  it("IMPORTANCE_TRANSFER", () => {
    expect(TransactionTypes.IMPORTANCE_TRANSFER).to.be.equal(0x0801);
    expect(TransactionTypes.IMPORTANCE_TRANSFER).to.be.equal(2049);
  });

  it("ASSET_NEW", () => {
    expect(TransactionTypes.ASSET_NEW).to.be.equal(0x0201);
    expect(TransactionTypes.ASSET_NEW).to.be.equal(513);
  });

  it("ASSET_ASK", () => {
    expect(TransactionTypes.ASSET_ASK).to.be.equal(0x0202);
    expect(TransactionTypes.ASSET_ASK).to.be.equal(514);
  });

  it("ASSET_BID", () => {
    expect(TransactionTypes.ASSET_BID).to.be.equal(0x0203);
    expect(TransactionTypes.ASSET_BID).to.be.equal(515);
  });

  it("SNAPSHOT", () => {
    expect(TransactionTypes.SNAPSHOT).to.be.equal(0x0401);
    expect(TransactionTypes.SNAPSHOT).to.be.equal(1025);
  });

  it("MULTISIG_AGGREGATE_MODIFICATION", () => {
    expect(TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION).to.be.equal(0x1001);
    expect(TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION).to.be.equal(4097);
  });

  it("MULTISIG_SIGNATURE", () => {
    expect(TransactionTypes.MULTISIG_SIGNATURE).to.be.equal(0x1002);
    expect(TransactionTypes.MULTISIG_SIGNATURE).to.be.equal(4098);
  });

  it("MULTISIG", () => {
    expect(TransactionTypes.MULTISIG).to.be.equal(0x1004);
    expect(TransactionTypes.MULTISIG).to.be.equal(4100);
  });

  it("PROVISION_NAMESPACE", () => {
    expect(TransactionTypes.PROVISION_NAMESPACE).to.be.equal(0x2001);
    expect(TransactionTypes.PROVISION_NAMESPACE).to.be.equal(8193);
  });

  it("MOSAIC_DEFINITION_CREATION", () => {
    expect(TransactionTypes.MOSAIC_DEFINITION_CREATION).to.be.equal(0x4001);
    expect(TransactionTypes.MOSAIC_DEFINITION_CREATION).to.be.equal(16385);
  });

  it("MOSAIC_SUPPLY_CHANGE", () => {
    expect(TransactionTypes.MOSAIC_SUPPLY_CHANGE).to.be.equal(0x4002);
    expect(TransactionTypes.MOSAIC_SUPPLY_CHANGE).to.be.equal(16386);
  });

  it("should return all multisig embeddable types", () => {
    const multisigEmbeddableTypes = [
      TransactionTypes.TRANSFER,
      TransactionTypes.IMPORTANCE_TRANSFER,
      TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION,
      TransactionTypes.PROVISION_NAMESPACE,
      TransactionTypes.MOSAIC_DEFINITION_CREATION,
      TransactionTypes.MOSAIC_SUPPLY_CHANGE
    ];
    expect(TransactionTypes.getMultisigEmbeddableTypes()).to.deep.equal(multisigEmbeddableTypes)
  });

  it("should return all block embeddable types", () => {
    const embeddableTypes = [
      TransactionTypes.TRANSFER,
      TransactionTypes.IMPORTANCE_TRANSFER,
      TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION,
      TransactionTypes.PROVISION_NAMESPACE,
      TransactionTypes.MOSAIC_DEFINITION_CREATION,
      TransactionTypes.MOSAIC_SUPPLY_CHANGE,
      TransactionTypes.MULTISIG
    ];
    expect(TransactionTypes.getBlockEmbeddableTypes()).to.deep.equal(embeddableTypes);
  });

  it("should return all active types", () => {
    const activeTypes = [
      TransactionTypes.TRANSFER,
      TransactionTypes.IMPORTANCE_TRANSFER,
      TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION,
      TransactionTypes.PROVISION_NAMESPACE,
      TransactionTypes.MOSAIC_DEFINITION_CREATION,
      TransactionTypes.MOSAIC_SUPPLY_CHANGE,
      TransactionTypes.MULTISIG,
      TransactionTypes.MULTISIG_SIGNATURE
    ];
    expect(TransactionTypes.getActiveTypes()).to.deep.equal(activeTypes);
  });
});

