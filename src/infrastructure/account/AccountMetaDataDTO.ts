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
 * @internal
 * "UNKNOWN": The harvesting status of the account is not known.
 * "LOCKED": The account is not harvesting.
 * "UNLOCKED": The account is harvesting.
 */
import {AccountInfoDTO} from "./AccountInfoDTO";

/**
 * @internal
 */
export type Status = "UNKNOWN"
  | "LOCKED"
  | "UNLOCKED";

/**
 * @internal
 * "REMOTE": The account is a remote account and therefore remoteStatus is not applicable for it.
 * "ACTIVATING": The account has activated remote harvesting but it is not yet active.
 * "ACTIVE": The account has activated remote harvesting and remote harvesting is active.
 * "DEACTIVATING": The account has deactivated remote harvesting but remote harvesting is still active.
 * "INACTIVE": The account has inactive remote harvesting, or it has deactivated remote harvesting and deactivation is operational.
 */
export type RemoteStatus = "REMOTE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "INACTIVE";

/**
 * @internal
 * The account meta data describes additional information for the account
 */
export interface AccountMetaDataDTO {

  /**
   * The harvesting status of a queried account
   */
  readonly status: Status;

  /**
   * The status of remote harvesting of a queried account
   */
  readonly remoteStatus: RemoteStatus;

  /**
   * JSON array of AccountInfo structures. The account is cosignatory for each of the accounts in the array.
   */
  readonly cosignatoryOf: AccountInfoDTO[];

  /**
   * JSON array of AccountInfo structures. The array holds all accounts that are a cosignatory for this account.
   */
  readonly cosignatories: AccountInfoDTO[];
}
