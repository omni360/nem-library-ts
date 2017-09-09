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

/**
 *
 * divisibility: defines the smallest sub-unit that a mosaic can be divided into. A divisibility of 0 means that only entire units can be transferred while a divisibility of 3 means the mosaic can be transferred in milli-units.
 * initialSupply: defines how many units of the mosaic are initially created. These mosaics are credited to the creator of the mosaic. The initial supply has an upper limit of 9,000,000,000 units.
 * supplyMutable: determines whether or not the supply can be changed by the creator at a later point using a MosaicSupplyChangeTransaction. Possible values are "true" and "false", the former meaning the supply can be changed and the latter that the supply is fixed for all times.
 * transferable: determines whether or not the a mosaic can be transferred to a user other than the creator. In certain scenarios it is not wanted that user are able to trade the mosaic (for example when the mosaic represents bonus points which the company does not want to be tranferable to other users). Possible values are "true" and "false", the former meaning the mosaic can be arbitrarily transferred among users and the latter meaning the mosaic can only be transferred to and from the creator.
 */
export type MosaicPropertyName =
  "divisibility" |
  "initialSupply" |
  "supplyMutable" |
  "transferable";

/**
 * @internal
 * Each mosaic definition comes with a set of properties.
 * Each property has a default value which will be applied in case it was not specified.
 * Future release may add additional properties to the set of available properties
 */
export interface MosaicPropertyDTO {

  /**
   * The name of the mosaic property.
   */
  readonly name: MosaicPropertyName;

  /**
   * The value of the mosaic property.
   */
  readonly value: string;

}
