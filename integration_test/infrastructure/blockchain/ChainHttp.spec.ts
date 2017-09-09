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

import {ChainHttp} from "../../../src/infrastructure/ChainHttp";
import {expect} from "chai";
import {TestVariables} from "../../../test/config/TestVariables.spec";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";

describe("ChainHttp", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it('get blockchain height', done => {
    const chainHttp = new ChainHttp([{domain: TestVariables.DEFAULT_TEST_DOMAIN}]);
    chainHttp.getBlockchainHeight()
      .subscribe(blockHeight => {
        expect(blockHeight).to.not.be.undefined;
        expect(blockHeight).to.be.greaterThan(0);
        done();
      });
  });

  it('get blockchain score', done => {
    const chainHttp = new ChainHttp([{domain: TestVariables.DEFAULT_TEST_DOMAIN}]);
    chainHttp.getBlockchainScore()
      .subscribe(blockchainScore => {
        expect(blockchainScore).to.not.be.undefined;
        done();
      });
  });

  it('get last block of the blockchain score', done => {
    const chainHttp = new ChainHttp([{domain: TestVariables.DEFAULT_TEST_DOMAIN}]);
    chainHttp.getBlockchainLastBlock()
      .subscribe(block => {
        expect(block.timeStamp).to.not.be.undefined;
        expect(block.signature).to.not.be.undefined;
        expect(block.prevBlockHash).to.not.be.undefined;
        expect(block.type).to.not.be.undefined;
        expect(block.version).to.not.be.undefined;
        expect(block.signer).to.not.be.undefined;
        expect(block.height).to.not.be.undefined;
        done();
      });
  });

  it('uses the default testnet server when no argument is passed in constructor', () => {
    const chainHttp = new ChainHttp();
    expect(chainHttp.nextNode()).to.be.equals("http://bigalice2.nem.ninja:7890/chain/");
  });

  it('uses a specific domain when it is passed in constructor', () => {
    const chainHttp = new ChainHttp([{domain: "bob.nem.ninja"}]);
    expect(chainHttp.nextNode()).to.contain("bob.nem.ninja");
  });

});