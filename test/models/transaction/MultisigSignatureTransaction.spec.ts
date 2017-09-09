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

import {MultisigSignatureTransaction} from "../../../src/models/transaction/MultisigSignatureTransaction";
import {expect} from "chai";
import {UnconfirmedTransactionMetaDataPairDTO} from "../../../src/infrastructure/transaction/UnconfirmedTransactionMetaDataPairDTO";
import {TimeWindow} from "../../../src/models/transaction/TimeWindow";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {Address} from "../../../src/models/account/Address";
import {PublicAccount} from "../../../src/models/account/PublicAccount";

describe("MultisigSignatureTransaction", () => {
  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a MultisigSignatureTransaction", () => {
    const transaction = new MultisigSignatureTransaction(
      TimeWindow.createWithDeadline(),
      -1744830463,
      new Address("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N"),
      {data: "d6103d88aad57055e31e8f7a90e08c8a40883b5a427e63e6acc69ccf22ebc94e"},
      6000000,
      "585e68a4a4677a2fef3883353e0b1e57d7c9d9a9b0ee84baff58462a044aabee38353c29d81d5ccee23ae1ea6bb34f6bcd54500d4c4d1dd68ce8d0eb6eac730a"
    );
    transaction.signer = PublicAccount.createWithPublicKey("5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b");
    expect(transaction.fee).to.be.equal(6000000);
    expect(transaction.signer.publicKey).to.be.equal("5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b");
    expect(transaction.otherAccount.plain()).to.be.equal("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N");
    expect(transaction.otherHash).to.deep.equal({data: "d6103d88aad57055e31e8f7a90e08c8a40883b5a427e63e6acc69ccf22ebc94e"});
    expect(transaction.type).to.be.equal(4098);
    expect(transaction.version).to.be.equal(-1744830463);
  });

  it('should create a create MultisigSignatureTransaction given UnconfirmedTransaction', () => {
    const unconfirmedTransaction: UnconfirmedTransactionMetaDataPairDTO = {
      "meta": {
        "data": "04eca09564f9fc81adf4f5a4d5bc1c08b122aca2a2afd13ace73a0c080cd924a"
      },
      "transaction": {
        "timeStamp": 68502384,
        "signature": "10148fc22a92774a94ae99d1da19f91b60bdeee5b43c3aaf6424b41b4119652b31560af91d7c04698fcc853d2b17cd475e921662b43f9360741d9e9502bcf606",
        "fee": 6000000,
        "type": 4100,
        "deadline": 68505984,
        "version": -1744830463,
        "signatures": [],
        "signer": "0414fe7647ec008e533aac98a4bf1c5fbf1d236c75b81fdadf1f5d1042fdd2ff",
        "otherTrans": {
          "timeStamp": 69092834,
          "amount": 10000000,
          "fee": 1000000,
          "recipient": "TCFFOMQ2SBX77E2FZC3VX43ZTRV4ZNTXTCGWBM5J",
          "type": 257,
          "deadline": 69096434,
          "message": {},
          "version": -1744830463,
          "signer": "0a4dcc50b3c61677ff9b0b04717e1e9268611acb7cd0a8343e1b60ca3583ec2e"
        }
      }
    };
    const transaction = MultisigSignatureTransaction.createUnconfirmedFromDTO(
      unconfirmedTransaction
    );
    transaction.signer = PublicAccount.createWithPublicKey("5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b");
    expect(transaction.fee).to.be.equal(6000000);
    expect(transaction.signer.publicKey).to.be.equal("5d5d829644625eb6554273f70b1187d904761fab4c5c0e5f01666f6725e9278b");
    expect(transaction.otherAccount.plain()).to.be.equal("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N");
    expect(transaction.otherHash).to.deep.equal({data: "04eca09564f9fc81adf4f5a4d5bc1c08b122aca2a2afd13ace73a0c080cd924a"});
    expect(transaction.type).to.be.equal(4098);
    expect(transaction.version).to.be.equal(-1744830463);
  });

  it("should be created by named constructor", () => {
    const transaction = MultisigSignatureTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N"),
      {data: "d6103d88aad57055e31e8f7a90e08c8a40883b5a427e63e6acc69ccf22ebc94e"});
    expect(transaction.otherAccount.plain()).to.be.equal("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N");
    expect(transaction.otherHash).to.deep.equal({data: "d6103d88aad57055e31e8f7a90e08c8a40883b5a427e63e6acc69ccf22ebc94e"});
    expect(transaction.type).to.be.equal(4098);
    expect(transaction.version).to.be.equal(1);
  });

  it("should have the fee calculated for TEST_NET", () => {
    const transaction = MultisigSignatureTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address("TBUAUC3VYKPP3PJPOH7A7BCB2C4I64XZAAOZBO6N"),
      {data: "d6103d88aad57055e31e8f7a90e08c8a40883b5a427e63e6acc69ccf22ebc94e"});
    expect(transaction.fee).to.be.equal(Math.floor(3 * 0.05 * 1000000));
  });
});