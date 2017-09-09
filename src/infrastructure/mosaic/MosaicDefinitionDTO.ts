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
import {MosaicPropertyDTO} from "./MosaicPropertyDTO";
import {MosaicLevyDTO} from "./MosaicLevyDTO";

/**
 * @internal
 * A mosaic definition describes an asset class. Some fields are mandatory while others are optional.
 * The properties of a mosaic definition always have a default value and only need to be supplied if they differ from the default value.
 */
export interface MosaicDefinitionDTO {

  /**
   * 	The public key of the mosaic definition creator.
   */
  readonly creator: string;

  /**
   * The mosaic id
   */
  readonly id: MosaicIdDTO;

  /**
   * The mosaic description. The description may have a length of up to 512 characters and cannot be empty.
   */
  readonly description: string;

  /**
   * The mosaic properties. The properties may be an empty array in which case default values for all properties are applied.
   * Each property has a default value which will be applied in case it was not specified.
   * Future release may add additional properties to the set of available properties.
   */
  readonly properties: MosaicPropertyDTO[];

  /**
   * The optional levy for the mosaic. A creator can demand that each mosaic transfer induces an additional fee
   */
  readonly levy: MosaicLevyDTO | null | {};



}