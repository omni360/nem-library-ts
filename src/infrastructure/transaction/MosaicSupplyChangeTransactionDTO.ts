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

import {MosaicIdDTO} from "../mosaic/MosaicIdDTO";
import {TransactionDTO} from "./TransactionDTO";

/**
 * @internal
 * 1: Increase in supply.
 * 2: Decrease in supply.
 */
export type MosaicSupplyType = 1 | 2;

/**
 * @internal
 * In case a mosaic definition has the property 'supplyMutable' set to true, the creator of the mosaic definition can change the supply, i.e. increase or decrease the supply.
 */
export interface MosaicSupplyChangeTransactionDTO extends TransactionDTO {

  /**
   * The supply type.
   */
  readonly supplyType: MosaicSupplyType;

  /**
   * The supply change in units for the mosaic.
   */
  readonly delta: number;

  /**
   * 	The mosaic id.
   */
  readonly mosaicId: MosaicIdDTO;

}
