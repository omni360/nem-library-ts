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

import {Observable} from "rxjs";
import * as requestPromise from "request-promise-native";
import {UnconfirmedTransactionsDTO} from "./transaction/UnconfirmedTransactionsDTO";
import {HttpEndpoint, ServerConfig} from "./HttpEndpoint";
import {AccountMetaDataPairDTO} from "./account/AccountMetaDataPairDTO";
import {AccountMetaDataDTO} from "./account/AccountMetaDataDTO";
import {CreateUnconfirmedTransactionFromDTO} from "./transaction/CreateUnconfirmedTransactionFromDTO";
import {Transaction} from "../models/transaction/Transaction";
import {TransactionMetaDataPairDTO} from "./transaction/TransactionMetaDataPairDTO";
import {CreateTransactionFromDTO} from "./transaction/CreateTransactionFromDTO";
import {Address} from "../models/account/Address";
import {AccountInfoWithMetaData} from "../models/account/AccountInfo";
import {AccountHarvestInfo} from "../models/account/AccountHarvestInfo";
import {HarvestInfoDTO} from "./account/HarvestInfoDTO";
import {AccountImportanceViewModelDTO} from "./account/AccountImportanceViewModelDTO";
import {AccountImportanceInfo} from "../models/account/AccountImportanceInfo";
import {NamespaceDTO} from "./namespace/NamespaceDTO";
import {Namespace} from "../models/namespace/Namespace";
import {MosaicDefinitionDTO} from "./mosaic/MosaicDefinitionDTO";
import {MosaicDefinition} from "../models/mosaic/MosaicDefinition";
import {Mosaic} from "../models/mosaic/Mosaic";
import {MosaicDTO} from "./mosaic/MosaicDTO";
import {NodeHarvestInfo} from "../models/account/NodeHarvestInfo";
import {AccountHistoricalDataViewModelDTO} from "./account/AccountHistoricalDataViewModelDTO";
import {AccountHistoricalInfo} from "../models/account/AccountHistoricalInfo";
import {AccountStatus} from "../models";
import {Pageable} from "./Pageable";
import {IncomingTransactionsPageable} from "./IncomingTransactionsPageable";
import {OutgoingTransactionsPageable} from "./OutgoingTransactionsPageable";
import {AllTransactionsPageable} from "./AllTransactionsPageable";
import {HarvestInfoPageable} from "./HarvestInfoPageable";

export interface QueryParams {
  /**
   * (Optional) The xem of transactions returned. Between 5 and 100, otherwise 10
   */
  pageSize?: number,
  /**
   * (Optional) The 256 bit sha3 hash of the transaction up to which transactions are returned.
   */
  hash?: string,
  /**
   * (Optional) The transaction id up to which transactions are returned. This parameter will prevail over hash.
   */
  id?: number
}

/**
 *
 */
export class AccountHttp extends HttpEndpoint {

  constructor(nodes?: ServerConfig[]) {
    super("account", nodes);
  }

  /**
   * Gets an AccountInfoWithMetaData for an account.
   * @param address - Address
   * @return Observable<AccountInfoWithMetaData>
   */
  getFromAddress(address: Address): Observable<AccountInfoWithMetaData> {
    return Observable.of('get?address=' + address.plain())
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((accountMetaDataPairDTO: AccountMetaDataPairDTO) => {
        return AccountInfoWithMetaData.createFromAccountMetaDataPairDTO(accountMetaDataPairDTO)
      });
  }

  /**
   * Gets an AccountInfoWithMetaData for an account with publicKey
   * @param publicKey - NEM
   * @return Observable<AccountInfoWithMetaData>
   */
  getFromPublicKey(publicKey: string): Observable<AccountInfoWithMetaData> {
    return Observable.of('get/from-public-key?publicKey=' + publicKey)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((accountMetaDataPairDTO: AccountMetaDataPairDTO) => {
        return AccountInfoWithMetaData.createFromAccountMetaDataPairDTO(accountMetaDataPairDTO)
      });
  }

  /**
   * Given a delegate (formerly known as remote) account's address, gets the AccountMetaDataPair for the account for which the given account is the delegate account.
   * If the given account address is not a delegate account for any account, the request returns the AccountMetaDataPair for the given address.
   * @param address - Address
   * @return Observable<AccountInfoWithMetaData>
   */
  getOriginalAccountDataFromDelegatedAccountAddress(address: Address): Observable<AccountInfoWithMetaData> {
    return Observable.of('get/forwarded?address=' + address.plain())
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((accountMetaDataPairDTO: AccountMetaDataPairDTO) => {
        return AccountInfoWithMetaData.createFromAccountMetaDataPairDTO(accountMetaDataPairDTO)
      });
  }

  /**
   * retrieve the original account data by providing the public key of the delegate account.
   * @param publicKey - string
   * @return Observable<AccountInfoWithMetaData>
   */
  getOriginalAccountDataFromDelegatedAccountPublicKey(publicKey: string): Observable<AccountInfoWithMetaData> {
    return Observable.of('get/forwarded/from-public-key?publicKey=' + publicKey)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((accountMetaDataPairDTO: AccountMetaDataPairDTO) => {
        return AccountInfoWithMetaData.createFromAccountMetaDataPairDTO(accountMetaDataPairDTO)
      });
  }

  /**
   * Gets the AccountMetaData from an account.
   * @param address - NEM Address
   * @return Observable<AccountStatus>
   */
  status(address: Address): Observable<AccountStatus> {
    return Observable.of('status?address=' + address.plain())
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((result: AccountMetaDataDTO) => AccountStatus.createFromAccountMetaDataDTO(result));
  }

  /**
   * A transaction is said to be incoming with respect to an account if the account is the recipient of the transaction.
   * In the same way outgoing transaction are the transactions where the account is the sender of the transaction.
   * Unconfirmed transactions are those transactions that have not yet been included in a block.
   * Unconfirmed transactions are not guaranteed to be included in any block
   * @param address - The address of the account.
   * @param params
   */
  incomingTransactions(address: Address, params?: QueryParams): Observable<Transaction[]> {
    if (params == undefined) params = {};
    params.pageSize = params.pageSize && (params.pageSize >= 5 && params.pageSize <= 100) ? params.pageSize : 10;
    const url = 'transfers/incoming?address=' + address.plain() +
      (params.hash === undefined ? "" : "&hash=" + params.hash) +
      (params.id === undefined ? "" : "&id=" + params.id) +
      (params.pageSize === undefined ? "" : "&pageSize=" + params.pageSize);
    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(transactions => transactions.data.map((dto: TransactionMetaDataPairDTO) => CreateTransactionFromDTO(dto)));
  }

  /**
   * Paginaged version of incomingTransactions request
   * @param address
   * @param params
   */
  incomingTransactionsPaginated(address: Address, params?: QueryParams): Pageable<Transaction[]> {
    if (params === undefined) params = {};
    return new IncomingTransactionsPageable(this, address, params);
  }

  /**
   * Gets an array of transaction meta data pairs where the recipient has the address given as parameter to the request.
   * A maximum of 25 transaction meta data pairs is returned. For details about sorting and discussion of the second parameter see Incoming transactions.
   * @param address - The address of the account.
   * @param params
   */
  outgoingTransactions(address: Address, params?: QueryParams): Observable<Transaction[]> {
    if (params == undefined) params = {};
    params.pageSize = params.pageSize && (params.pageSize >= 5 && params.pageSize <= 100) ? params.pageSize : 10;
    const url = 'transfers/outgoing?address=' + address.plain() +
      (params.hash === undefined ? "" : "&hash=" + params.hash) +
      (params.id === undefined ? "" : "&id=" + params.id) +
      (params.pageSize === undefined ? "" : "&pageSize=" + params.pageSize);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(transactions => transactions.data.map((dto: TransactionMetaDataPairDTO) => CreateTransactionFromDTO(dto)));
  }

  /**
   * Paginaged version of outgoingTransactions request
   * @param address
   * @param params
   * @param params
   */
  outgoingTransactionsPaginated(address: Address, params?: QueryParams): Pageable<Transaction[]> {
    if (params === undefined) params = {};
    return new OutgoingTransactionsPageable(this, address, params);
  }

  /**
   * Gets an array of transaction meta data pairs for which an account is the sender or receiver.
   * A maximum of 25 transaction meta data pairs is returned.
   * For details about sorting and discussion of the second parameter see Incoming transactions.
   * @param address - The address of the account.
   * @param params
   */
  allTransactions(address: Address, params?: QueryParams): Observable<Transaction[]> {
    if (params == undefined) params = {};
    params.pageSize = params.pageSize && (params.pageSize >= 5 && params.pageSize <= 100) ? params.pageSize : 10;
    const url = 'transfers/all?address=' + address.plain() +
      (params.hash === undefined ? "" : "&hash=" + params.hash) +
      (params.id === undefined ? "" : "&id=" + params.id) +
      (params.pageSize === undefined ? "" : "&pageSize=" + params.pageSize);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(transactions => transactions.data.map((dto: TransactionMetaDataPairDTO) => CreateTransactionFromDTO(dto)));
  }

  /**
   * Paginaged version of allTransactions request
   * @param address
   * @param params
   */
  allTransactionsPaginated(address: Address, params?: QueryParams): Pageable<Transaction[]> {
    if (params === undefined) params = {};
    return new AllTransactionsPageable(this, address, params);
  }

  /**
   * Gets the array of transactions for which an account is the sender or receiver and which have not yet been included in a block
   * @param address - NEM Address
   * @return Observable<Transaction[]>
   */
  unconfirmedTransactions(address: Address): Observable<Transaction[]> {
    return Observable.of('unconfirmedTransactions?address=' + address.plain())
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((unconfirmedTransactions: UnconfirmedTransactionsDTO) => {
        return unconfirmedTransactions.data.map(unconfirmedTransaction => {
          return CreateUnconfirmedTransactionFromDTO(unconfirmedTransaction);
        });
      });
  }

  /**
   * Gets an array of harvest info objects for an account.
   * @param address - Address
   * @param id - string (optional)
   * @return Observable<AccountHarvestInfo[]>
   */
  getHarvestInfoDataForAnAccount(address: Address, id?: string): Observable<AccountHarvestInfo[]> {
    const url = 'harvests?address=' + address.plain() +
      (id === undefined ? "" : "&id=" + id);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(harvestInfoData => {
        return harvestInfoData.data.map((harvestInfoDTO: HarvestInfoDTO) => {
          return AccountHarvestInfo.createFromHarvestInfoDTO(harvestInfoDTO);
        });
      });
  }

  /**
   * Paginaged version of allTransactions request
   * @param address
   * @param id
   * @returns {HarvestInfoPageable}
   */
  getHarvestInfoDataForAnAccountPaginated(address: Address, id?: string): Pageable<AccountHarvestInfo[]> {
    return new HarvestInfoPageable(this, address, id);
  }

  /**
   * Gets an array of account importance view model objects.
   * @return Observable<AccountImportanceInfo[]>
   */
  getAccountImportances(): Observable<AccountImportanceInfo[]> {
    return Observable.of('importances')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(importanceData => {
        return importanceData.data.map((accountImportanceViewModel: AccountImportanceViewModelDTO) => {
          return AccountImportanceInfo.createFromAccountImportanceViewModelDTO(accountImportanceViewModel);
        });
      });
  }

  /**
   * Gets an array of namespace objects for a given account address.
   * The parent parameter is optional. If supplied, only sub-namespaces of the parent namespace are returned.
   * @param address - Address
   * @param parent - The optional parent namespace id.
   * @param id - The optional namespace database id up to which namespaces are returned.
   * @param pageSize - The (optional) number of namespaces to be returned.
   * @return Observable<Namespace[]>
   */
  getNamespaceOwnedByAddress(address: Address, parent?: string, pageSize?: number, id?: string): Observable<Namespace[]> {
    const url = 'namespace/page?address=' + address.plain() +
      (parent === undefined ? "" : "&parent=" + parent) +
      (id === undefined ? "" : "&id=" + id) +
      (pageSize === undefined ? "" : "&pageSize=" + pageSize);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(namespacesData => {
        return namespacesData.data.map((namespaceDTO: NamespaceDTO) => {
          return Namespace.createFromNamespaceDTO(namespaceDTO);
        });
      });
  }


  /**
   * Gets an array of mosaic definition objects for a given account address. The parent parameter is optional.
   * If supplied, only mosaic definitions for the given parent namespace are returned.
   * The id parameter is optional and allows retrieving mosaic definitions in batches of 25 mosaic definitions.
   * @param address - The address of the account.
   * @param parent - The optional parent namespace id.
   * @param id - The optional mosaic definition database id up to which mosaic definitions are returned.
   * @return Observable<MosaicDefinition[]>
   */
  getMosaicCreatedByAddress(address: Address, parent?: string, id?: string): Observable<MosaicDefinition[]> {
    const url = 'mosaic/definition/page?address=' + address.plain() +
      (parent === undefined ? "" : "&parent=" + parent) +
      (id === undefined ? "" : "&id=" + id);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(mosaicsData => {
        return mosaicsData.data.map((mosaicDefinitionDTO: MosaicDefinitionDTO) => {
          return MosaicDefinition.createFromMosaicDefinitionDTO(mosaicDefinitionDTO);
        });
      });
  }


  /**
   * Gets an array of mosaic objects for a given account address.
   * @param address - Address
   * @return Observable<Mosaic[]>
   */
  getMosaicOwnedByAddress(address: Address): Observable<Mosaic[]> {
    return Observable.of('mosaic/owned?address=' + address.plain())
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(mosaicsData => {
        return mosaicsData.data.map((mosaicDTO: MosaicDTO) => {
          return Mosaic.createFromMosaicDTO(mosaicDTO);
        });
      });
  }

  /**
   * Unlocks an account (starts harvesting).
   * @param host - string
   * @param privateKey - string
   * @return Observable<boolean>
   */
  unlockHarvesting(host: string, privateKey: string): Observable<boolean> {
    return Observable.fromPromise(
      requestPromise.post({
        uri: 'http://' + host + ':7890/account/unlock',
        body: {
          value: privateKey
        },
        json: true
      }).promise())
      .map(x => true);
  }

  /**
   * Locks an account (stops harvesting).
   * @param host - string
   * @param privateKey - string
   * @return Observable<boolean>
   */
  lockHarvesting(host: string, privateKey: string): Observable<boolean> {
    return Observable.fromPromise(
      requestPromise.post({
        uri: 'http://' + host + ':7890/account/lock',
        body: {
          value: privateKey
        },
        json: true
      }).promise())
      .map(x => true);
  }

  /**
   * Each node can allow users to harvest with their delegated key on that node.
   * The NIS configuration has entries for configuring the maximum number of allowed harvesters and optionally allow harvesting only for certain account addresses.
   * The unlock info gives information about the maximum number of allowed harvesters and how many harvesters are already using the node.
   * @return Observable<NodeHarvestInfo>
   */
  unlockInfo(): Observable<NodeHarvestInfo> {
    return Observable.of('unlocked/info')
      .flatMap(url => requestPromise.post({
        uri: this.nextNode() + url,
        json: true
      }))
      .retryWhen(this.replyWhenRequestError)
      .map(nodeHarvestInfo => {
        return new NodeHarvestInfo(nodeHarvestInfo['max-unlocked'], nodeHarvestInfo['num-unlocked'])
      });
  }

  /**
   * Gets historical information for an account.
   * @param address - The address of the account.
   * @param startHeight - The block height from which on the data should be supplied.
   * @param endHeight - The block height up to which the data should be supplied. The end height must be greater than or equal to the start height.
   * @param increment - The value by which the height is incremented between each data point. The value must be greater than 0. NIS can supply up to 1000 data points with one request. Requesting more than 1000 data points results in an error.
   * @return Observable<AccountHistoricalInfo[]>
   */
  getHistoricalAccountData(address: Address, startHeight: number, endHeight: number, increment: number): Observable<AccountHistoricalInfo[]> {
    return Observable.of('historical/get?address=' + address.plain() + '&startHeight=' + startHeight + '&endHeight=' + endHeight + '&increment=' + increment)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(historicalAccountData => {
        return historicalAccountData.data.map((accountHistoricalDataViewModelDTO: AccountHistoricalDataViewModelDTO) => {
          return AccountHistoricalInfo.createFromAccountHistoricalDataViewModelDTO(accountHistoricalDataViewModelDTO);
        });
      });
  }


}