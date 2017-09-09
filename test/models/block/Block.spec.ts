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
import {BlockDTO} from "../../../src/infrastructure/blockchain/BlockDTO";
import {Block} from "../../../src/models/blockchain/Block";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../index";
import {TransferTransactionDTO} from "../../../src/infrastructure/transaction/TransferTransactionDTO";
import {PublicAccount} from "../../../src/models/account/PublicAccount";

describe("Block", () => {
  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a block given a BlockDTO", () => {
    const signature = "signature";
    const signer =  "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966";
    const blockHash = "blockHash";
    const blockDTO = <BlockDTO>{
      timeStamp: 1234,
      signature: signature,
      prevBlockHash: {
        data: blockHash
      },
      type: 1,
      transactions: [<TransferTransactionDTO>{
          "timeStamp": 71847392,
          "amount": 15674000000,
          "signature": "6b306b2310e576ed21a821c329062289f2461b769b3504186a4390e4027d9232fb86f235a1c378cfe30f55f8f8e78c0e9ec537e6e4e9550ebbca31f5835ddd09",
          "fee": 1000000,
          "recipient": "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
          "type": 257,
          "deadline": 71850992,
          "message": {},
          "version": -1744830463,
          "signer": "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966"

      }],
      version: 0x68,
      signer: signer,
      height: 1234
    };

    const block = Block.createFromBlockDTO(blockDTO);
    expect(block.timeStamp).to.be.equal(1234);
    expect(block.signature).to.be.equal(signature);
    expect(block.prevBlockHash.data).to.be.equal(blockHash);
    expect(block.type).to.be.equal(1);
    expect(block.version).to.be.equal(0x68);
    expect(block.signer.publicKey).to.be.equal(signer);
    expect(block.height).to.be.equal(1234);

  });
});

