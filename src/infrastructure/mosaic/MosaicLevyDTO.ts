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

import {MosaicIdDTO} from "./MosaicIdDTO";

/**
 * @internal
 * 1: The levy is an absolute fee. The field 'fee' states how many sub-units of the specified mosaic will be transferred to the recipient.
 * 2: The levy is calculated from the transferred amount. The field 'fee' states how many percentiles of the transferred quantity will transferred to the recipient.
 */
export type MosaicLevyType = 1 | 2;

/**
 * @internal
 * A mosaic definition can optionally specify a levy for transferring those mosaics. This might be needed by legal entities needing to collect some taxes for transfers.
 */
export interface MosaicLevyDTO {

  /**
   * 	The levy type
   */
  readonly type: MosaicLevyType;

  /**
   * The recipient of the levy.
   */
  readonly recipient: string;

  /**
   * The mosaic in which the levy is paid.
   */
  readonly mosaicId: MosaicIdDTO;

  /**
   * The fee. The interpretation is dependent on the type of the levy
   */
  readonly fee: number;

}
