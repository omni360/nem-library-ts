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
import {HttpEndpoint, ServerConfig} from "./HttpEndpoint";
import {Block} from "../models/blockchain/Block";
import {BlockChainScore, BlockHeight} from "./BlockHttp";

export class ChainHttp extends HttpEndpoint {

  constructor(nodes?: ServerConfig[]) {
    super("chain", nodes);
  }

  /**
   * Gets the current height of the block chain.
   * @returns Observable<BlockHeight>
   */
  getBlockchainHeight(): Observable<BlockHeight> {
    return Observable.of('height')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(result => {
        return result.height
      });
  }

  /**
   * Gets the current score of the block chain. The higher the score, the better the chain.
   * During synchronization, nodes try to get the best block chain in the network.
   * @returns Observable<BlockChainScore>
   */
  getBlockchainScore(): Observable<BlockChainScore> {
    return Observable.of('score')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(result => {
        return result.score
      });
  }

  /**
   * Gets the current last block of the chain.
   * @returns Observable<Block>
   */
  getBlockchainLastBlock(): Observable<Block> {
    return Observable.of('last-block')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(result => {
        return Block.createFromBlockDTO(result)
      });
  }
}