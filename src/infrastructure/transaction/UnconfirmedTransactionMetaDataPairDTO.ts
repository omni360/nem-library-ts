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

import {ImportanceTransferTransactionDTO} from "./ImportanceTransferTransactionDTO";
import {MosaicDefinitionCreationTransactionDTO} from "./MosaicDefinitionCreationTransactionDTO";
import {MosaicSupplyChangeTransactionDTO} from "./MosaicSupplyChangeTransactionDTO";
import {MultisigAggregateModificationTransactionDTO} from "./MultisigAggregateModificationTransactionDTO";
import {MultisigTransactionDTO} from "./MultisigTransactionDTO";
import {ProvisionNamespaceTransactionDTO} from "./ProvisionNamespaceTransactionDTO";
import {TransferTransactionDTO} from "./TransferTransactionDTO";
import {UnconfirmedTransactionMetaDataDTO} from "./UnconfirmedTransactionMetaDataDTO";

/**
 * @internal
 * Transactions meta data object contains additional information about the transaction.
 */
export interface UnconfirmedTransactionMetaDataPairDTO {

  /**
   * Contains the transaction meta data object.
   */
  readonly meta: UnconfirmedTransactionMetaDataDTO;

  /**
   * Contains the transaction object.
   */
  readonly transaction: TransferTransactionDTO
    | ImportanceTransferTransactionDTO
    | ProvisionNamespaceTransactionDTO
    | MosaicDefinitionCreationTransactionDTO
    | MosaicSupplyChangeTransactionDTO
    | MultisigTransactionDTO
    | MultisigAggregateModificationTransactionDTO;
}
