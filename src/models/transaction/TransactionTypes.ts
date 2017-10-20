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
 * Static class containing transaction type constants.
 */
export class TransactionTypes {

  /**
   * @internal
   * @type {number}
   */
  private static readonly TRANSFER_TYPE = 0x0100;

  /**
   * @internal
   * @type {number}
   */
  private static readonly ASSET_TYPE = 0x0200;

  /**
   * @internal
   * @type {number}
   */
  private static readonly SNAPSHOT_TYPE = 0x0400;

  /**
   * @internal
   * @type {number}
   */
  private static readonly IMPORTANCE_TYPE = 0x0800;

  /**
   * @internal
   * @type {number}
   */
  private static readonly MULTISIG_TYPE = 0x1000;

  /**
   * @internal
   * @type {number}
   */
  private static readonly NAMESPACE_TYPE = 0x2000;

  /**
   * @internal
   * @type {number}
   */
  private static readonly MOSAIC_TYPE = 0x4000;

  /**
   * Transfer Transaction
   * @type {number}
   */
  public static readonly TRANSFER = TransactionTypes.TRANSFER_TYPE | 0x01;

  /**
   * Importance transfer transaction.
   * @type {number}
   */
  public static readonly IMPORTANCE_TRANSFER = TransactionTypes.IMPORTANCE_TYPE | 0x01;

  /**
   * A new asset transaction.
   * @type {number}
   */
  public static readonly ASSET_NEW = TransactionTypes.ASSET_TYPE | 0x01;

  /**
   * An asset ask transaction.
   * @type {number}
   */
  public static readonly ASSET_ASK = TransactionTypes.ASSET_TYPE | 0x02;

  /**
   * An asset bid transaction.
   * @type {number}
   */
  public static readonly ASSET_BID = TransactionTypes.ASSET_TYPE | 0x03;

  /**
   * A snapshot transaction.
   * @type {number}
   */
  public static readonly SNAPSHOT = TransactionTypes.SNAPSHOT_TYPE | 0x01;

  /**
   * A multisig change transaction (e.g. announce an account as multi-sig).
   * @type {number}
   */
  public static readonly MULTISIG_AGGREGATE_MODIFICATION = TransactionTypes.MULTISIG_TYPE | 0x01;

  /**
   * A multisig signature transaction.
   * @type {number}
   */
  public static readonly MULTISIG_SIGNATURE = TransactionTypes.MULTISIG_TYPE | 0x02;

  /**
   * A multisig transaction.
   * @type {number}
   */
  public static readonly MULTISIG = TransactionTypes.MULTISIG_TYPE | 0x04;

  /**
   * A provision namespace transaction.
   * @type {number}
   */
  public static readonly PROVISION_NAMESPACE = TransactionTypes.NAMESPACE_TYPE | 0x01;

  /**
   * A mosaic definition creation transaction.
   * @type {number}
   */
  public static readonly MOSAIC_DEFINITION_CREATION = TransactionTypes.MOSAIC_TYPE | 0x01;

  /**
   * A mosaic supply change transaction.
   * @type {number}
   */
  public static readonly MOSAIC_SUPPLY_CHANGE = TransactionTypes.MOSAIC_TYPE | 0x02;

  /**
   * Gets all multisig embeddable types.
   * @returns {number[]}
   */
  public static getMultisigEmbeddableTypes(): number[] {
    return [
      TransactionTypes.TRANSFER,
      TransactionTypes.IMPORTANCE_TRANSFER,
      TransactionTypes.MULTISIG_AGGREGATE_MODIFICATION,
      TransactionTypes.PROVISION_NAMESPACE,
      TransactionTypes.MOSAIC_DEFINITION_CREATION,
      TransactionTypes.MOSAIC_SUPPLY_CHANGE,
    ];
  }

  /**
   * Gets all block embeddable types.
   * @returns {number[]}
   */
  public static getBlockEmbeddableTypes(): number[] {
    const types = TransactionTypes.getMultisigEmbeddableTypes();
    types.push(TransactionTypes.MULTISIG);
    return types;
  }

  /**
   * Gets all active types.
   * @returns {number[]}
   */
  public static getActiveTypes(): number[] {
    const types = TransactionTypes.getBlockEmbeddableTypes();
    types.push(TransactionTypes.MULTISIG_SIGNATURE);
    return types;
  }
}
