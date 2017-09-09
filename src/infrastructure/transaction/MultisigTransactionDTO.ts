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

import {TransferTransactionDTO} from "./TransferTransactionDTO";
import {TransactionDTO} from "./TransactionDTO";
import {MultisigSignatureTransactionDTO} from "./MultisigSignatureTransactionDTO";
import {ImportanceTransferTransactionDTO} from "./ImportanceTransferTransactionDTO";
import {MultisigAggregateModificationTransactionDTO} from "./MultisigAggregateModificationTransactionDTO";
import {ProvisionNamespaceTransactionDTO} from "./ProvisionNamespaceTransactionDTO";
import {MosaicDefinitionCreationTransactionDTO} from "./MosaicDefinitionCreationTransactionDTO";
import {MosaicSupplyChangeTransactionDTO} from "./MosaicSupplyChangeTransactionDTO";

/**
 * @internal
 * Multisig transaction are the only way to make transaction from a multisig account to another account.
 * A multisig transaction carries another transaction inside (often referred to as "inner" transaction).
 * The inner transaction can be a transfer, an importance transfer or an aggregate modification transaction.
 * A multisig transaction also has multisig signature transactions from the cosignatories of the multisig account inside.
 */
export interface MultisigTransactionDTO extends TransactionDTO {

  /**
   * The JSON array of MulsigSignatureTransaction objects.
   */
  readonly signatures: MultisigSignatureTransactionDTO[];

  /**
   * The inner transaction. The inner transaction can be a transfer transaction, an importance transfer transaction or a multisig aggregate modification transaction. The inner transaction does not have a valid signature.
   */
  readonly otherTrans: TransferTransactionDTO
    | ImportanceTransferTransactionDTO
    | MultisigAggregateModificationTransactionDTO
    | ProvisionNamespaceTransactionDTO
    | MosaicDefinitionCreationTransactionDTO
    | MosaicSupplyChangeTransactionDTO;
}