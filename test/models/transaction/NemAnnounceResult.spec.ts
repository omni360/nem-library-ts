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
import {NemAnnounceResult, TypeNemAnnounceResult} from "../../../src/models/transaction/NemAnnounceResult";
import {NemAnnounceResultDTO} from "../../../src/infrastructure/transaction/NemAnnounceResultDTO";

describe("NemAnnonceResult", () => {

  it("should be created from constructor", () => {
    const nemAnnounceResultDTO = <NemAnnounceResultDTO> {
        type: TypeNemAnnounceResult.HeartBeat,
      code: 2,
      message: "message",
      transactionHash: {
        data: "transactionHash"
      },
      innerTransactionHash: {
        data: "innerTransactionHash"
      }
    }
    const nemAnnounceResult = NemAnnounceResult.createFromNemAnnounceResultDTO(nemAnnounceResultDTO);

    expect(nemAnnounceResult.type).to.be.equal(TypeNemAnnounceResult.HeartBeat);
    expect(nemAnnounceResult.code).to.be.equal(2);
    expect(nemAnnounceResult.message).to.be.equal("message");
    expect(nemAnnounceResult.transactionHash.data).to.be.equal("transactionHash");
    expect(nemAnnounceResult.innerTransactionHash.data).to.be.equal("innerTransactionHash");

  });
});
