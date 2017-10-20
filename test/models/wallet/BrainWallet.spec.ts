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

import {deepEqual} from "assert";
import {expect} from "chai";
import {LocalDateTime} from "js-joda";
import {Address} from "../../../src/models/account/Address";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {BrainPassword} from "../../../src/models/wallet/BrainPassword";
import {BrainWallet} from "../../../src/models/wallet/BrainWallet";
import {NEMLibrary} from "../../../src/NEMLibrary";

describe("BrainWallet", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a brain wallet", () => {
    const brainWallet = BrainWallet.create("My wallet", new BrainPassword("entertain destruction sassy impartial morning electric limit glib bait grape icy measure"));
    expect(brainWallet.name).to.be.equal("My wallet");
    expect(brainWallet.network).to.be.equal(NetworkTypes.TEST_NET);
    expect(brainWallet.address.plain()).to.be.equal("TBUWTIIYM2BFFAE3JOEW3LGG5X3QTO7L2RWGZ6XV");
  });

  it("should open a brain wallet", () => {
    const brainWallet = BrainWallet.create("My wallet", new BrainPassword("entertain destruction sassy impartial morning electric limit glib bait grape icy measure"));
    const account = brainWallet.open(new BrainPassword("entertain destruction sassy impartial morning electric limit glib bait grape icy measure"));
    expect(account.address.plain()).to.be.equal("TBUWTIIYM2BFFAE3JOEW3LGG5X3QTO7L2RWGZ6XV");
  });

  it("should return a wlt content", () => {
    const simpleWallet = new BrainWallet("My wallet",
      NetworkTypes.TEST_NET,
      new Address("TAZ53XZ2PLF2CRMF7AWPAMYZKW63ZOCBKMEJEOQJ"),
      LocalDateTime.of(2017, 11, 20));
    const wlt = simpleWallet.writeWLTFile();
    expect(wlt).to.be.equal("eyJuYW1lIjoiTXkgd2FsbGV0IiwibmV0d29yayI6IjE1MiIsImFkZHJlc3MiOiJUQVo1M1haMlBMRjJDUk1GN0FXUEFNWVpLVzYzWk9DQktNRUpFT1FKIiwiY3JlYXRpb25EYXRlIjoiMjAxNy0xMS0yMFQwMDowMCIsInNjaGVtYSI6MSwidHlwZSI6ImJyYWluIn0=");
  });

  it("should return a simple wallet from WLT", () => {
    const simpleWallet = BrainWallet.readFromWLT("eyJuYW1lIjoiTXkgd2FsbGV0IiwibmV0d29yayI6IjE1MiIsImFkZHJlc3MiOiJUQVo1M1haMlBMRjJDUk1GN0FXUEFNWVpLVzYzWk9DQktNRUpFT1FKIiwiY3JlYXRpb25EYXRlIjoiMjAxNy0xMS0yMFQwMDowMCIsInNjaGVtYSI6MSwidHlwZSI6ImJyYWluIn0=");
    expect(simpleWallet.name).to.be.equal("My wallet");
    deepEqual(simpleWallet.network, NetworkTypes.TEST_NET);
    deepEqual(simpleWallet.address, new Address("TAZ53XZ2PLF2CRMF7AWPAMYZKW63ZOCBKMEJEOQJ"));
    deepEqual(simpleWallet.creationDate, LocalDateTime.of(2017, 11, 20));
  });

  it("should read the private key", () => {
    const brainPassword = new BrainPassword("entertain destruction sassy impartial morning electric limit glib bait grape icy measure nemlibrary ktNRUp");
    const brainWallet = BrainWallet.create("My wallet", brainPassword);
    expect(brainWallet.unlockPrivateKey(brainPassword)).to.be.equal("2670badad52fb639a21c257f44bee2597ac77790886b71c7151eed9086dd9d68");
  });

});
