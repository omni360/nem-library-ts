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
import {EmptyMessage, PlainMessage} from "../../../src/models/transaction/PlainMessage";

describe("PlainMessage", () => {

  it("should create a plain message from a DTO", () => {
    const plainMessage = PlainMessage.createFromDTO("74657374207472616e73616374696f6e");
    expect(plainMessage.payload).to.be.equal("74657374207472616e73616374696f6e");
  });

  it("should return the plain text when it's a Plain Message", () => {
    const plainMessage = PlainMessage.createFromDTO("74657374207472616e73616374696f6e");
    expect(plainMessage.plain()).to.be.equal("test transaction");
  });

  it("should create a plain message from a string", () => {
    const plainMessage = PlainMessage.create("test transaction");
    expect(plainMessage.payload).to.be.equal("74657374207472616e73616374696f6e");
  });

  it("should create an EmptyMessage", () => {
    const emptyMessage = EmptyMessage;
    expect(emptyMessage.payload).to.be.equal("");
  });

  it("should return a DTO", () => {
    const plainMessage = PlainMessage.createFromDTO("74657374207472616e73616374696f6e");
    const dto = plainMessage.toDTO();
    expect(dto.payload).to.be.equal("74657374207472616e73616374696f6e");
    expect(dto.type).to.be.equal(1);
  });

  it("should try to encode estrange characters", () => {
    const plainMessage = PlainMessage.create("La blockchain és una manera eficaç d'obtindre beneficis. !?{}[]_ł€¶");
    expect(plainMessage.plain()).to.be.equal("La blockchain és una manera eficaç d'obtindre beneficis. !?{}[]_ł€¶");
  })
});