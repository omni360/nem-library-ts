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

import {MosaicHttp} from "../infrastructure/MosaicHttp";
import {MosaicTransferable} from "../models/mosaic/MosaicTransferable";
import {Observable} from "rxjs/Observable";
import {XEM} from "../models/mosaic/XEM";
import {MosaicProperties} from "../models/mosaic/MosaicDefinition";
import {MosaicLevyType} from "../models/mosaic/MosaicLevy";
/**
 * Mosaic service
 */
export class MosaicService {

  /**
   * mosaicHttp
   */
  private mosaicHttp: MosaicHttp;

  /**
   * constructor
   * @param mosaicHttp
   */
  constructor(mosaicHttp: MosaicHttp) {
    this.mosaicHttp = mosaicHttp;

  }

  /**
   * Calculate levy for a given mosaicTransferable
   * @param mosaicTransferable
   * @returns {any}
   */
  calculateLevy(mosaicTransferable: MosaicTransferable): Observable<number> {
    if (mosaicTransferable.levy == undefined) return Observable.of(0);
    if (mosaicTransferable.levy.mosaicId.equals(XEM.MOSAICID)) {
      return Observable.of(
        this.levyFee(mosaicTransferable, new MosaicProperties(XEM.DIVISIBILITY, XEM.INITIALSUPPLY, XEM.TRANSFERABLE, XEM.SUPPLYMUTABLE))
      );
    } else {
      return this.mosaicHttp.getMosaicDefinition(mosaicTransferable.levy.mosaicId).map(levyMosaicDefinition => {
        return this.levyFee(mosaicTransferable, levyMosaicDefinition.properties);
      })
    }
  }

  /**
   * @internal
   * @param mosaic
   * @param levy
   * @returns {any}
   */
  private levyFee(mosaicTransferable: MosaicTransferable, levyProperties: MosaicProperties): number {
    var levyValue;

    if (mosaicTransferable.levy!.type == MosaicLevyType.Absolute) {
      levyValue = mosaicTransferable.levy!.fee;
    } else {
      levyValue = mosaicTransferable.quantity() * mosaicTransferable.levy!.fee / 10000;
    }

    let o = parseInt(levyValue, 10);

    if (!o) {
      if (levyProperties.divisibility === 0) {
        return 0;
      } else {
        return parseFloat("0." + o.toFixed(levyProperties.divisibility).split('.')[1]);
      }
    }

    return o / Math.pow(10, levyProperties.divisibility);
  }
}