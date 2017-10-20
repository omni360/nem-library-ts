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
 * Nodes are the entities that perform communication in the network like sending and receiving data.
 * A node has an identity which is tied to an account through which the node can identify itself to the network.
 * The communication is done through the endpoint of the node. Additionally a node provides meta data information.
 */
export interface NodeDTO {

  /**
   * Denotes the beginning of the meta data substructure.
   */
  readonly metaData: NodeMetaDataDTO;

  /**
   * Denotes the beginning of the endpoint substructure.
   */
  readonly endpoint: NodeEndpointDTO;

  /**
   * Denotes the beginning of the identity substructure.
   */
  readonly identity: NodeIdentityDTO;
}

/**
 * @internal
 * Node meta data
 */
export interface NodeMetaDataDTO {

  /**
   * The number of features the nodes has.
   */
  readonly features: number;

  /**
   * The network id
   */
  readonly networkId: number;

  /**
   * The name of the application that is running the node.
   */
  readonly application: string;

  /**
   * The version of the application.
   */
  readonly version: string;

  /**
   * The underlying platform (OS, java version).
   */
  readonly platform: string;
}

/**
 * @internal
 * Node endpoint
 */
export interface NodeEndpointDTO {

  /**
   * The protocol used for the communication (HTTP or HTTPS).
   */
  readonly protocol: string;

  /**
   * The port used for the communication.
   */
  readonly port: number;

  /**
   * The IP address of the endpoint.
   */
  readonly host: string;

}

/**
 * @internal
 * Node identity
 */
export interface NodeIdentityDTO {

  /**
   * The name of the node.
   */
  readonly name: string;

  /**
   * The public key used to identify the node.
   */
  readonly publickey: string;

}
