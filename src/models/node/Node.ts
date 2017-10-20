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

import {NodeDTO, NodeEndpointDTO, NodeIdentityDTO, NodeMetaDataDTO} from "../../infrastructure/node/NodeDTO";
import {PublicAccount} from "../account/PublicAccount";
import {NetworkTypes} from "./NetworkTypes";

/**
 * Nodes are the entities that perform communication in the network like sending and receiving data.
 * A node has an identity which is tied to an account through which the node can identify itself to the network.
 * The communication is done through the endpoint of the node. Additionally a node provides meta data information.
 */
export class Node {
  /**
   * Denotes the beginning of the meta data substructure.
   */
  public readonly metaData: NodeMetaData;

  /**
   * Denotes the beginning of the endpoint substructure.
   */
  public readonly endpoint: NodeEndpoint;

  /**
   * Denotes the beginning of the identity substructure.
   */
  public readonly identity: NodeIdentity;

  /**
   * @internal
   * @param metaData
   * @param endpoint
   * @param identity
   */
  private constructor(
    metaData: NodeMetaData,
    endpoint: NodeEndpoint,
    identity: NodeIdentity,
  ) {
    this.metaData = metaData;
    this.endpoint = endpoint;
    this.identity = identity;
  }

  /**
   * @internal
   * @param dto
   * @returns {NodeDTO}
   */
  public static createFromNodeDTO(dto: NodeDTO): Node {
    return new Node(
      NodeMetaData.createFromNodeMetaDataDTO(dto.metaData),
      NodeEndpoint.createFromNodeEndpointDTO(dto.endpoint),
      NodeIdentity.createFromNodeIdentityDTO(dto.identity),
    );
  }
}

/**
 * Node meta data
 */
export class NodeMetaData {
  /**
   * The number of features the nodes has.
   */
  public readonly features: number;

  /**
   * The network id
   */
  public readonly network: NetworkTypes;

  /**
   * The name of the application that is running the node.
   */
  public readonly application: string;

  /**
   * The version of the application.
   */
  public readonly version: string;

  /**
   * The underlying platform (OS, java version).
   */
  public readonly platform: string;

  /**
   * @internal
   * @param features
   * @param network
   * @param application
   * @param version
   * @param platform
   */
  private constructor(
    features: number,
    network: NetworkTypes,
    application: string,
    version: string,
    platform: string,
  ) {
    this.features = features;
    this.network = network;
    this.application = application;
    this.version = version;
    this.platform = platform;
  }

  /**
   * @internal
   * @param dto
   * @returns {NodeMetaDataDTO}
   */
  public static createFromNodeMetaDataDTO(dto: NodeMetaDataDTO): NodeMetaData {
    return new NodeMetaData(
        dto.features,
        dto.networkId,
        dto.application,
        dto.version,
        dto.platform,
    );
  }
}

/**
 * Node endpoint
 */
export class NodeEndpoint {
  /**
   * The protocol used for the communication (HTTP or HTTPS).
   */
  public readonly protocol: string;

  /**
   * The port used for the communication.
   */
  public readonly port: number;

  /**
   * The IP address of the endpoint.
   */
  public readonly host: string;

  /**
   * @internal
   * @param protocol
   * @param port
   * @param host
   */
  private constructor(
    protocol: string,
    port: number,
    host: string,
  ) {
    this.protocol = protocol;
    this.port = port;
    this.host = host;
  }

  /**
   * @internal
   * @param dto
   * @returns {NodeEndpointDTO}
   */
  public static createFromNodeEndpointDTO(dto: NodeEndpointDTO): NodeEndpoint {
    return new NodeEndpoint(
      dto.protocol,
      dto.port,
      dto.host,
    );
  }
}

/**
 * Node identity
 */
export class NodeIdentity {
  /**
   * The name of the node.
   */
  public readonly name: string;

  /**
   * The public account used to identify the node.
   */
  public readonly publicAccount?: PublicAccount;

  /**
   * @internal
   * @param name
   * @param publickey
   */
  private constructor(
    name: string,
    publicAccount?: PublicAccount,
  ) {
    this.name = name;
    this.publicAccount = publicAccount;
  }

  /**
   * @internal
   * @param dto
   * @returns {NodeIdentityDTO}
   */
  public static createFromNodeIdentityDTO(dto: NodeIdentityDTO): NodeIdentity {
    return new NodeIdentity(
      dto.name,
      dto.publickey === undefined ? undefined : PublicAccount.createWithPublicKey(dto.publickey),
    );
  }
}
