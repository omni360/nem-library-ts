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
import {TestVariables} from "../../../test/config/TestVariables.spec";
import {BlockHttp} from "../../../src/infrastructure/BlockHttp";
import {BlockHeightDTO} from "../../../src/infrastructure/blockchain/BlockHeightDTO";
import {Block} from "../../../src/models/blockchain/Block";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";

describe("BlockHttp", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });
  const blockHeight: BlockHeightDTO = {
    height: 10000
  };

  it('get blockchain block with a given block height', done => {
    const blockHttp = new BlockHttp([{domain: TestVariables.DEFAULT_TEST_DOMAIN}]);
    blockHttp.getBlockByHeight(10000)
      .subscribe(block => {
        expect(block).to.be.instanceOf(Block);
        expect(block.timeStamp).to.not.be.undefined;
        expect(block.signature).to.not.be.undefined;
        expect(block.prevBlockHash).to.not.be.undefined;
        expect(block.type).to.not.be.undefined;
        expect(block.version).to.not.be.undefined;
        expect(block.signer).to.not.be.undefined;
        expect(block.height).to.not.be.undefined;
        expect(block.transactions).to.have.length(0);
        done();
      });
  });

  it('uses the default testnet server when no argument is passed in constructor', () => {
    const blockHttp = new BlockHttp();
    expect(blockHttp.nextNode()).to.be.equals("http://bigalice2.nem.ninja:7890/block/");
  });

  it('uses a specific domain when it is passed in constructor', () => {
    const blockHttp = new BlockHttp([{domain: "bob.nem.ninja"}]);
    expect(blockHttp.nextNode()).to.contain("bob.nem.ninja");
  });
});