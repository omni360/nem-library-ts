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
import {NodeDTO} from "./node/NodeDTO";
import {NodeCollection} from "../models/node/NodeCollection";
import {Node} from "../models/node/Node";
import {BlockHeight} from "./BlockHttp";
import {NisNodeInfo} from "../models/node/NisNodeInfo";
import {ExtendedNodeExperience} from "../models/node/ExtendedNodeExperience";
import {NisNodeInfoDTO} from "./debug/NisNodeInfoDTO";
import {NodeCollectionDTO} from "./node/NodeCollectionDTO";
import {ExtendedNodeExperiencePairDTO} from "./node/ExtendedNodeExperiencePairDTO";

export class NodeHttp extends HttpEndpoint {

  constructor(nodes?: ServerConfig[]) {
    super("node", nodes);
  }

  /**
   * Gets basic information about a node
   * @returns Observable<Node>
   */
  getNodeInfo(): Observable<Node> {
    return Observable.of('info')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((nodeDTO: NodeDTO) => {
        return Node.createFromNodeDTO(nodeDTO);
      });
  }

  /**
   * Gets extended information about a node
   * @returns Observable<NisNodeInfo>
   */
  getNisNodeInfo(): Observable<NisNodeInfo> {
    return Observable.of('extended-info')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((nisNodeInfoDTO: NisNodeInfoDTO) => {
        return NisNodeInfo.createFromNisNodeInfoDTO(nisNodeInfoDTO);
      });
  }

  /**
   * Gets an array of all known nodes in the neighborhood.
   * @returns Observable<NodeCollection>
   */
  getAllNodes(): Observable<NodeCollection> {
    return Observable.of('peer-list/all')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((nodeCollectionDTO: NodeCollectionDTO) => {
        return NodeCollection.createFromNodeCollectionDTO(nodeCollectionDTO);
      });
  }

  /**
   * Gets an array of all nodes with status 'active' in the neighborhood.
   * @returns Observable<Node[]>
   */
  getActiveNodes(): Observable<Node[]> {
    return Observable.of('peer-list/reachable')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(nodeCollectionData => {
        return nodeCollectionData.data.map((nodeDTO: NodeDTO) => {
          return Node.createFromNodeDTO(nodeDTO);
        });
      });
  }

  /**
   * Gets an array of active nodes in the neighborhood that are selected for broadcasts.
   * @returns Observable<Node[]>
   */
  getActiveNeighbourNodes(): Observable<Node[]> {
    return Observable.of('peer-list/active')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(nodeCollectionData => {
        return nodeCollectionData.data.map((nodeDTO: NodeDTO) => {
          return Node.createFromNodeDTO(nodeDTO);
        });
      });
  }

  /**
   * Requests the chain height from every node in the active node list and returns the maximum height seen.
   * @returns Observable<BlockHeight>
   */
  getMaximumChainHeightInActiveNeighborhood(): Observable<BlockHeight> {
    return Observable.of('active-peers/max-chain-height')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(blockHeight => {
        return blockHeight.height
      });
  }

  /**
   * Requests the chain height from every node in the active node list and returns the maximum height seen.
   * @returns Observable<ExtendedNodeExperience[]>
   */
  getNodeExperiences(): Observable<ExtendedNodeExperience[]> {
    return Observable.of('experiences')
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(extendedNodeExperiencePairData => {
        return extendedNodeExperiencePairData.data.map((extendedNodeExperiencePairDTO: ExtendedNodeExperiencePairDTO) => {
          return ExtendedNodeExperience.createFromExtendedNodeExperiencePairDTO(extendedNodeExperiencePairDTO);
        })
      });
  }
}