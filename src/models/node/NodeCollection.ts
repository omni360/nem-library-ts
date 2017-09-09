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

import {NodeCollectionDTO} from "../../infrastructure/node/NodeCollectionDTO";
import {Node} from "./Node";

/**
 * A NodeCollection object holds arrays of nodes with different statuses.
 */
export class NodeCollection {
  /**
   * A connection to the node cannot be established.
   */
  readonly inactive: Node[];

  /**
   * A connection can be established and the remote node responds in a timely manner.
   */
  readonly active: Node[];

  /**
   * A connection can be established but the node cannot provide information within the timeout limits.
   */
  readonly busy: Node[];

  /**
   * A fatal error occurs when trying to establish a connection or the node couldn't authenticate itself correctly.
   */
  readonly failure: Node[];

  /**
   * @internal
   * @param inactive
   * @param active
   * @param busy
   * @param failure
   */
  private constructor(
    inactive: Node[],
    active: Node[],
    busy: Node[],
    failure: Node[]
  ) {
    this.inactive = inactive;
    this.active = active;
    this.busy = busy;
    this.failure = failure;
  }

  /**
   * @internal
   * @param dto
   * @returns {Node}
   */
  static createFromNodeCollectionDTO(dto: NodeCollectionDTO): NodeCollection {
    return new NodeCollection(
      dto.inactive.map(nodeDTO => { return Node.createFromNodeDTO(nodeDTO)}),
      dto.active.map(nodeDTO => { return Node.createFromNodeDTO(nodeDTO)}),
      dto.busy.map(nodeDTO => { return Node.createFromNodeDTO(nodeDTO)}),
      dto.failure.map(nodeDTO => { return Node.createFromNodeDTO(nodeDTO)}));
  }
}