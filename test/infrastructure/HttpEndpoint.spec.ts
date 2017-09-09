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

import {HttpEndpoint, Protocol, ServerConfig} from "../../src/infrastructure/HttpEndpoint";
import {NEMLibrary} from "../../src/NEMLibrary";
import {NetworkTypes} from "../../src/models/node/NetworkTypes";
import {expect} from "chai";

class MockHttpEndpoint extends HttpEndpoint {

  constructor(nodes?: ServerConfig[], preferredProtocol?: Protocol) {
    super("mock", nodes, preferredProtocol)
  }
}


describe("HttpEndpoint", () => {

  it("should just have testnet nodes with protocol https", () => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    let mockHttpEndpoint = new MockHttpEndpoint(undefined, "https");
    expect(mockHttpEndpoint.nextNode()).to.contain("https://");
    expect(mockHttpEndpoint.nextNode()).to.contain("https://");
    NEMLibrary.reset();
  });


  it("should just have testnet nodes with protocol http", () => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    let mockHttpEndpoint = new MockHttpEndpoint(undefined, "http");
    expect(mockHttpEndpoint.nextNode()).to.contain("http://");
    expect(mockHttpEndpoint.nextNode()).to.contain("http://");
    NEMLibrary.reset();
  });

  it("should just have mainnet nodes with protocol https", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    let mockHttpEndpoint = new MockHttpEndpoint(undefined, "https");
    expect(mockHttpEndpoint.nextNode()).to.contain("https://");
    expect(mockHttpEndpoint.nextNode()).to.contain("https://");
    NEMLibrary.reset();
  });


  it("should just have mainnet nodes with protocol http", () => {
    NEMLibrary.bootstrap(NetworkTypes.MAIN_NET);
    let mockHttpEndpoint = new MockHttpEndpoint(undefined, "http");
    expect(mockHttpEndpoint.nextNode()).to.contain("http://");
    expect(mockHttpEndpoint.nextNode()).to.contain("http://");
    NEMLibrary.reset();
  });
});