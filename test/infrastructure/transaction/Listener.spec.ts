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
import {Listener} from "../../../src/infrastructure/Listener";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../../src/NEMLibrary";

class MockListener extends Listener {
  public getWSURL(): string {
    return this.nextNode();
  }
}

describe("Listener", () => {

  before(() => {
    NEMLibrary.reset();
  });

  it("should have the URL of bigalice2.nem.ninja with NEMLibrary.bootstrap(NetworkType.TEST_NET)", () => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

    const listener = new MockListener();
    expect(listener.getWSURL()).to.be.equal("http://bigalice2.nem.ninja:7778/w/messages");

    NEMLibrary.reset();
  });

  it("should have the URL of bigalice2.nem.ninja with NEMLibrary.bootstrap(NetworkType.TEST_NET)", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);

    const listener = new MockListener();
    expect(listener.getWSURL()).to.be.equal("http://alice6.nem.ninja:7778/w/messages");

    NEMLibrary.reset();
  });

  it("should have a different port", () => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

    const listener = new MockListener([{protocol: "http", domain: "bigalice2.nem.ninja", port: 2323}]);
    expect(listener.getWSURL()).to.be.equal("http://bigalice2.nem.ninja:2323/w/messages");

    NEMLibrary.reset();
  });
});
