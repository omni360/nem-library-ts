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

import {AccountHttp} from "../infrastructure/AccountHttp";
import {MosaicHttp} from "../infrastructure/MosaicHttp";
import {Address} from "../models/account/Address";
import {MosaicDefinition} from "../models/mosaic/MosaicDefinition";
import {Observable} from "rxjs/Observable";
import {Mosaic} from "../models/mosaic/Mosaic";
import {MosaicTransferable} from "../models/mosaic/MosaicTransferable";
import {XEM} from "../models/mosaic/XEM";

/**
 * Service to get account owned mosaics
 */
export class AccountOwnedMosaicsService {
  /**
   * accountHttp
   */
  private accountHttp: AccountHttp;

  /**
   * mosaicHttp
   */
  private mosaicHttp: MosaicHttp;

  /**
   * constructor
   * @param accountHttp
   * @param mosaicHttp
   */
  constructor(accountHttp: AccountHttp, mosaicHttp: MosaicHttp) {
    this.accountHttp = accountHttp;
    this.mosaicHttp = mosaicHttp;
  }

  /**
   * Account owned mosaics definitions
   * @param address
   * @returns {Observable<MosaicDefinition[]>}
   */
  fromAddress(address: Address): Observable<MosaicTransferable[]> {
    return this.accountHttp.getMosaicOwnedByAddress(address)
      .flatMap(_ => _)
      .flatMap((mosaic: Mosaic) => {
        if (XEM.MOSAICID.equals(mosaic.mosaicId)) return Observable.of(new XEM(mosaic.quantity / Math.pow(10, 6)));
        else {
          return this.mosaicHttp.getMosaicDefinition(mosaic.mosaicId)
            .map(mosaicDefinition => {
              return MosaicTransferable.createWithMosaicDefinition(mosaicDefinition, mosaic.quantity / Math.pow(10, mosaicDefinition.properties.divisibility));
            });
        }
      })
      .toArray();
  }
}
