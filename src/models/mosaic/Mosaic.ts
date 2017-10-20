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

import {MosaicDTO} from "../../infrastructure/mosaic/MosaicDTO";
import {MosaicId} from "./MosaicId";

/**
 * A mosaic describes an instance of a mosaic definition. Mosaics can be transferred by means of a transfer transaction.
 */
export class Mosaic {

  /**
   * The mosaic id
   */
  public readonly mosaicId: MosaicId;

  /**
   * The mosaic quantity. The quantity is always given in smallest units for the mosaic, i.e. if it has a divisibility of 3 the quantity is given in millis.
   */
  public readonly quantity: number;

  /**
   * constructor
   * @param mosaicId
   * @param quantity
   */
  constructor(
    mosaicId: MosaicId,
    quantity: number,
  ) {
    this.mosaicId = mosaicId;
    this.quantity = quantity;
  }

  /**
   * @internal
   * @param dto
   * @returns {Mosaic}
   */
  public static createFromMosaicDTO(dto: MosaicDTO): Mosaic {
    return new Mosaic(
      MosaicId.createFromMosaicIdDTO(dto.mosaicId),
      dto.quantity);
  }

}
