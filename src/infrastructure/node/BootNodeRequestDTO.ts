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
 * The BootNodeRequest JSNON object is used to transfer the relevant data for booting a local node to NIS.
 * With the boot data NIS can create the local node object and connect to the network.
 */
export interface BootNodeRequestDTO {

  /**
   * Denotes the beginning of the metaData substructure.
   */
  readonly metaData: BootNodeRequestMetaDataDTO;

  /**
   * Denotes the beginning of the endpoint substructure.
   */
  readonly endpoint: BootNodeRequestEndpointDTO;

  /**
   * Denotes the fof the identity substructure
   */
  readonly identity: BootNodeRequestIdentityDTO;
}

/**
 * @internal
 * BootNode meta data
 */
export interface BootNodeRequestMetaDataDTO {
  /**
   * 	The application name.
   */
  readonly application: string;
}

/**
 * @internal
 * BootNode endpoint
 */
export interface BootNodeRequestEndpointDTO {

  /**
   * The protocol to use (only HTTP supported as for now).
   */
  readonly protocol: string;

  /**
   * The port to use.
   */
  readonly port: number;

  /**
   * The IP address to use.
   */
  readonly host: string;

}

/**
 * @internal
 * BootNode identity
 */
export interface BootNodeRequestIdentityDTO {

  /**
   * The name of the node (can be anything).
   */
  readonly name: string;

  /**
   * The private key used for creating the identity.
   */
  readonly privatekey: string;

}
