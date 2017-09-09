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
import {Wallet, WalletType} from "../../../src/models/wallet/Wallet";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {Address} from "../../../src/models/account/Address";
import {Password} from "../../../src/models/wallet/Password";
import {MockWallet} from "./MockWallet.spec";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {LocalDateTime} from "js-joda";

describe("Wallet", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create a new wallet instance", () => {
    const wallet = new MockWallet("name", NetworkTypes.TEST_NET, new Address("TASDA3XWVADEVKDFMSVOO7OCAEQ2QS23XDW5E4A2"), LocalDateTime.now(), 1);
    expect(wallet.address.plain()).to.be.equal("TASDA3XWVADEVKDFMSVOO7OCAEQ2QS23XDW5E4A2");
    expect(wallet.name).to.be.equal("name");
    expect(wallet.network).to.be.equal(NetworkTypes.TEST_NET);
  });

  it("should create a new wallet instance", () => {
    const wallet = new MockWallet("name", NetworkTypes.TEST_NET, new Address("TASDA3XWVADEVKDFMSVOO7OCAEQ2QS23XDW5E4A2"), LocalDateTime.now(), 1);
    const account = wallet.open(new Password("password"));
    expect(account.address.plain()).to.be.equal("TASDA3XWVADEVKDFMSVOO7OCAEQ2QS23XDW5E4A2");
  });

  it("should transform TEST_NET NetworkType to nemSdk", () => {
    expect(Wallet.networkTypesSDKAdapter(NetworkTypes.TEST_NET)).to.be.equal(-104);
  });

  it("should transform MAIN_NET NetworkType to nemSdk", () => {
    expect(Wallet.networkTypesSDKAdapter(NetworkTypes.MAIN_NET)).to.be.equal(104);
  });

  it("should return simple wallet type", () => {
    let type = Wallet.walletTypeGivenWLT("eyJuYW1lIjoiTXkgd2FsbGV0IiwibmV0d29yayI6IjE1MiIsImFkZHJlc3MiOiJUQVo1M1haMlBMRjJDUk1GN0FXUEFNWVpLVzYzWk9DQktNRUpFT1FKIiwiY3JlYXRpb25EYXRlIjoiMjAxNy0xMS0yMFQwMDowMCIsInNjaGVtYSI6MSwidHlwZSI6ImJyYWluIn0=");
    expect(type).to.be.equal(WalletType.BRAIN);
  });

  it("should return brain wallet type", () => {
    let type = Wallet.walletTypeGivenWLT("eyJuYW1lIjoiTXkgd2FsbGV0IiwibmV0d29yayI6IjE1MiIsImFkZHJlc3MiOiJUQVo1M1haMlBMRjJDUk1GN0FXUEFNWVpLVzYzWk9DQktNRUpFT1FKIiwiY3JlYXRpb25EYXRlIjoiMjAxNy0xMS0yMFQwMDowMCIsInNjaGVtYSI6MSwidHlwZSI6InNpbXBsZSIsImVuY3J5cHRlZFByaXZhdGVLZXkiOiJhNGViMGRmYjBiYmMzOGRlY2UzOGQ1ODYwMWRhNTc1OTZjZmUyNWU5OWE3ZjlhNDJhMjg2Mzk3MmFmMzJjODM5YzIzZThhMTJkNDViZmUwOWYxYzhkMGZkNTJlNzcyNzQiLCJpdiI6Ijk4YTUzZTcwNDY1MzViOWNlMGJlMjgyZDNhMjcxZjEyIn0=");
    expect(type).to.be.equal(WalletType.SIMPLE);
  });

  it("should return error when the wallet type is not recognized", () => {
    expect(() => {
      Wallet.walletTypeGivenWLT("eyJuYW1lIjoiTXkgd2FsbGV0IiwibmV0d29yayI6IjE1MiIsImFkZHJlc3MiOiJUQVo1M1haMlBMRjJDUk1GN0FXUEFNWVpLVzYzWk9DQktNRUpFT1FKIiwiY3JlYXRpb25EYXRlIjoiMjAxNy0xMS0yMFQwMDowMCIsInNjaGVtYSI6MSwidHlwZSI6InNpbXBsZTIyMjIiLCJlbmNyeXB0ZWRQcml2YXRlS2V5IjoiYTRlYjBkZmIwYmJjMzhkZWNlMzhkNTg2MDFkYTU3NTk2Y2ZlMjVlOTlhN2Y5YTQyYTI4NjM5NzJhZjMyYzgzOWMyM2U4YTEyZDQ1YmZlMDlmMWM4ZDBmZDUyZTc3Mjc0IiwiaXYiOiI5OGE1M2U3MDQ2NTM1YjljZTBiZTI4MmQzYTI3MWYxMiJ9=");
    }).to.throw(Error)
  })
});