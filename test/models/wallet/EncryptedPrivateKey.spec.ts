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
import {EncryptedPrivateKey} from "../../../src/models/wallet/EncryptedPrivateKey";
import {Password} from "../../../src/models/wallet/Password";

describe("EncryptedPrivateKey", () => {

  it("should create a private key encrypted object", () => {
    const privateKeyEncrypted = new EncryptedPrivateKey("b6edb40bae6d099f099775bc828e36961f7fbb5e3ee62236714ad1e980ac8986bd4ed690f576abb5268ba0915ae575e7",
      "4344645752e57065f814b51713d05810");
    expect(privateKeyEncrypted.encryptedKey).to.be.equal("b6edb40bae6d099f099775bc828e36961f7fbb5e3ee62236714ad1e980ac8986bd4ed690f576abb5268ba0915ae575e7");
    expect(privateKeyEncrypted.iv).to.be.equal("4344645752e57065f814b51713d05810");
  });

  it("should decrypt a private key encrypted object", () => {
    const privateKeyEncrypted = new EncryptedPrivateKey("b6edb40bae6d099f099775bc828e36961f7fbb5e3ee62236714ad1e980ac8986bd4ed690f576abb5268ba0915ae575e7",
      "4344645752e57065f814b51713d05810");
    const privateKeyDecrypted = privateKeyEncrypted.decrypt(new Password("password"));
    expect(privateKeyDecrypted).to.be.equal("e85467d94fdf70b5713d3b3b083597e0962f38843feb10259158a3fa6dc444b6");
  });
});
