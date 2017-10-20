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

import {TransactionMetaDataPairDTO} from "../transaction/TransactionMetaDataPairDTO";
import {BlockDTO} from "./BlockDTO";
/**
 * @internal
 * The following structure is used by the NEM block blockchain explorer for convenience reason. The data is similar but not identical to that of a Block.
 */
export interface ExplorerBlockViewModelDTO {

  /**
   * Explorer block view model data
   */
  readonly data: ExplorerBlockViewModelDataDTO[];
}

/**
 * @internal
 * Explorer block view model data
 */
export interface ExplorerBlockViewModelDataDTO {

  /**
   * Array containing the transactions of the block.
   */
  readonly txes: ExplorerTransferViewModelDTO[];

  /**
   * Entry containing a JSON block object.
   */
  readonly block: BlockDTO;

  /**
   * The hash of the block as hexadecimal string.
   */
  readonly hash: string;

  /**
   * The block difficulty.
   */
  readonly difficulty: number;
}

/**
 * @internal
 * The following structure is used by the NEM block blockchain explorer for convenience reason.
 */
export interface ExplorerTransferViewModelDTO {

  /**
   * Entry containing the JSON Transaction object.
   */
  readonly txes: TransactionMetaDataPairDTO;

  /**
   * The hash of the transaction.
   */
  readonly hash: string;

  /**
   * The hash of the inner transaction. This entry is only available for multisig transactions
   */
  readonly innerHash: string;
}
