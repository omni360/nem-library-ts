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

import {NetworkTypes} from "../src/models/node/NetworkTypes";
import {Environment, NEMLibrary} from "../src/NEMLibrary";
import {expect} from "chai";

describe("NEMLibrary", () => {

  beforeEach(() => {
    NEMLibrary.reset();
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should be initialized with a NetworkType", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    expect(NEMLibrary.getNetworkType() == NetworkTypes.MAIN_NET);
  });

  it("should throw Errror when the bootstrap is called twice", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    expect(() => {
      NEMLibrary.bootstrap(NetworkTypes.MAIN_NET)
    }).to.throw(Error, "NEMLibrary should only be initialized once");
  });

  it("should throw exception when the NEMLibrary is not initialized", () => {
    expect(() => {
      NEMLibrary.getNetworkType()
    }).to.throw(Error, "NEMLibrary should be initialized using NEMLibrary.bootstrap(NetworkType.TEST_NET)");
  });

  it("should be able to call bootstrap, then reset the status, and call bootstrap again", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    expect(NEMLibrary.getNetworkType()).to.be.equal(NetworkTypes.MAIN_NET);
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    expect(NEMLibrary.getNetworkType()).to.be.equal(NetworkTypes.TEST_NET);
  });

  it("should return node", () => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    expect(NEMLibrary.getEnvironment()).to.be.equal(Environment.Node);
  });
});