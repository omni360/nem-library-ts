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

import {MultisigTransaction} from "../../../src/models/transaction/MultisigTransaction";
import {expect} from "chai";
import {TransactionTypes} from "../../../src/models/transaction/TransactionTypes";
import {PublicAccount} from "../../../src/models/account/PublicAccount";
import {MockTransaction} from "./MockTransaction.spec";
import {HashData, MultisigTransactionInfo} from "../../../src/models/transaction/TransactionInfo";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {deepEqual} from "assert";

describe("MultisigTransaction", () => {
  let publicKey;
  let mockTransaction;
  let multisigAccount: PublicAccount;

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    publicKey = 'a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a';
    mockTransaction = new MockTransaction(PublicAccount.createWithPublicKey(publicKey));
    multisigAccount = PublicAccount.createWithPublicKey("0a4dcc50b3c61677ff9b0b04717e1e9268611acb7cd0a8343e1b60ca3583ec2e");
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a MultisigTransaction", () => {
    const version = -1744830462;
    const transaction = new MultisigTransaction(
      TimeWindow.createWithDeadline(),
      version,
      mockTransaction,
      124134,
      []
    );


    expect(transaction.type).to.be.equal(TransactionTypes.MULTISIG);
    expect(transaction.signatures).to.have.length(0);
    expect(transaction.otherTransaction).to.be.not.undefined;
    expect(transaction.fee).to.be.equal(124134);
    expect(transaction.version).to.be.equal(version);
  });

  it("should return false when the MultisigTransaction has not MultisigTransactionInfo", () => {
    const transaction = new MultisigTransaction(TimeWindow.createWithDeadline(), -1744830462, mockTransaction, 124134, [], undefined);
    expect(transaction.isConfirmed()).to.be.false;
  });

  it("should return true when the MultisigTransaction has MultisigTransactionInfo", () => {
    const transaction = new MultisigTransaction(
      TimeWindow.createWithDeadline(),
      -1744830462,
      mockTransaction,
      124134,
      [],
      "585e68a4a4677a2fef3883353e0b1e57d7c9d9a9b0ee84baff58462a044aabee38353c29d81d5ccee23ae1ea6bb34f6bcd54500d4c4d1dd68ce8d0eb6eac730a",
      PublicAccount.createWithPublicKey(publicKey),
      new MultisigTransactionInfo(123, 23123, new HashData("hash"), new HashData("innerhash")));
    expect(transaction.isConfirmed()).to.be.true;
  });

  it("should return true when the MultisigTransaction has MultisigTransactionInfo", () => {
    let multisigTransactionInfo = new MultisigTransactionInfo(123, 23123, new HashData("hash"), new HashData("innerhash"));
    const transaction = new MultisigTransaction(
      TimeWindow.createWithDeadline(),
      -1744830462,
      mockTransaction,
      124134,
      [],
      "585e68a4a4677a2fef3883353e0b1e57d7c9d9a9b0ee84baff58462a044aabee38353c29d81d5ccee23ae1ea6bb34f6bcd54500d4c4d1dd68ce8d0eb6eac730a",
      PublicAccount.createWithPublicKey(publicKey),
      multisigTransactionInfo);
    deepEqual(transaction.getTransactionInfo(), multisigTransactionInfo);
  });

  it("should throw Error when the MultisigTransaction is not confirmed and getTransactionInfo is called", () => {
    const transaction = new MultisigTransaction(TimeWindow.createWithDeadline(), -1744830462, mockTransaction, 124134, [], undefined);
    expect(transaction.isConfirmed).to.throw(Error);
  });

  it("isPendingToSign should return true when it has HashData but not MultisigTransactionInfo", () => {
    const transaction = new MultisigTransaction(TimeWindow.createWithDeadline(), -1744830462, mockTransaction, 124134, [], undefined, undefined, undefined, new HashData("my hash"));
    expect(transaction.isPendingToSign()).to.be.true;
  });

  it("isPendingToSign should return false when it has MultisigTransactionInfo", () => {
    let multisigTransactionInfo = new MultisigTransactionInfo(123, 23123, new HashData("hash"), new HashData("innerhash"));
    const transaction = new MultisigTransaction(TimeWindow.createWithDeadline(), -1744830462, mockTransaction, 124134, [], undefined, undefined, multisigTransactionInfo, undefined);
    expect(transaction.isPendingToSign()).to.be.false;
  });

  it("should return HashData when it's passed on constructor", () => {
    let hashData = new HashData("my hash");
    const transaction = new MultisigTransaction(TimeWindow.createWithDeadline(), -1744830462, mockTransaction, 124134, [], undefined, undefined, undefined, hashData);
    deepEqual(transaction.hashData, hashData);
  });

  it("should be created by named constructor", () => {
    const transaction = MultisigTransaction.create(
      TimeWindow.createWithDeadline(),
      mockTransaction,
      multisigAccount
    );

    expect(transaction.type).to.be.equal(TransactionTypes.MULTISIG);
    expect(transaction.signatures).to.have.length(0);
    expect(transaction.otherTransaction).to.be.not.undefined;
  });

  it("should have the fee calculated for TEST_NET", () => {
    const transaction = MultisigTransaction.create(
      TimeWindow.createWithDeadline(),
      mockTransaction,
      multisigAccount
    );
    expect(transaction.fee).to.be.equal(Math.floor(3 * 0.05 * 1000000));
  });

  it("should have the signature of the multisig account", () => {
    const transaction = MultisigTransaction.create(
      TimeWindow.createWithDeadline(),
      mockTransaction,
      multisigAccount
    );
    expect(transaction.otherTransaction.signer!.publicKey).to.be.equal(multisigAccount.publicKey);
  });
});