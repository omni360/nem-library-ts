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

import {Node} from "./Node";
import {NisNodeInfoDTO} from "../../infrastructure/debug/NisNodeInfoDTO";
import {ApplicationMetaDataDTO} from "../../infrastructure/node/ApplicationMetaDataDTO";

/**
 * A NodeCollection object holds arrays of nodes with different statuses.
 */
export class NisNodeInfo {

  /**
   * Denotes the beginning of the node substructure.
   */
  readonly node: Node;

  /**
   * Denotes the beginning of the application meta data substructure.
   */
  readonly nisInfo: ApplicationMetaData;

  /**
   * @internal
   * @param node
   * @param nisInfo
   */
  private constructor(
    node: Node,
    nisInfo: ApplicationMetaData
  ) {
    this.node = node;
    this.nisInfo = nisInfo;
  }

  /**
   * @internal
   * @param dto
   * @returns {NisNodeInfo}
   */
  static createFromNisNodeInfoDTO(dto: NisNodeInfoDTO): NisNodeInfo {
      return new NisNodeInfo(
        Node.createFromNodeDTO(dto.node),
        ApplicationMetaData.createFromApplicationMetaDataDTO(dto.nisInfo)
      );
  }

}

/**
 * The application meta data object supplies additional information about the application running on a node.
 */
export class ApplicationMetaData {

  /**
   * The current network time, i.e. the number of seconds that have elapsed since the creation of the nemesis block.
   */
  readonly currentTime: number;

  /**
   * The name of the application running on the node.
   */
  readonly application: string;

  /**
   * The network time when the application was started.
   */
  readonly startTime: number;

  /**
   * The application version.
   */
  readonly version: string;

  /**
   * The signer of the certificate used by the application.
   */
  readonly signer: string;


  /**
   * @internal
   * @param currentTime
   * @param application
   * @param startTime
   * @param version
   * @param signer
   */
  private constructor(
    currentTime: number,
    application: string,
    startTime: number,
    version: string,
    signer: string
  ) {
    this.currentTime = currentTime;
    this.application = application;
    this.startTime = startTime;
    this.version = version;
    this.signer = signer;
  }

  /**
   * @internal
   * @param dto
   * @returns {ApplicationMetaData}
   */
  static createFromApplicationMetaDataDTO(dto: ApplicationMetaDataDTO): ApplicationMetaData {
    return new ApplicationMetaData(
      dto.currentTime,
      dto.application,
      dto.startTime,
      dto.version,
      dto.signer
    );
  }
}