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

import {NamespaceDTO} from "../../infrastructure/namespace/NamespaceDTO";
import {NamespaceMetaDataPairDTO} from "../../infrastructure/namespace/NamespaceMetaDataPairDTO";
import {Address} from "../account/Address";

/**
 * A namespace is the NEM version of a domain. You can rent a namespace for the duration of a year by paying a fee.
 * The naming of the parts of a namespace has certain restrictions, see the corresponding chapter on namespaces.
 */
export class Namespace {
  /**
   * The fully qualified name of the namespace, also named namespace id.
   */
  public readonly name: string;

  /**
   * The owner of the namespace.
   */
  public readonly owner: Address;

  /**
   * The height at which the ownership begins.
   */
  public readonly height: number;

  /**
   * The database id for the namespace object.
   */
  public readonly id?: number;

  /**
   * constructor
   * @internal
   * @param name
   * @param owner
   * @param height
   * @param id
   */
  constructor(
    name: string,
    owner: Address,
    height: number,
    id?: number,
  ) {
    this.name = name;
    this.owner = owner;
    this.height = height;
    this.id = id;
  }

  /**
   * @internal
   * @param dto
   * @returns {Namespace}
   */
  public static createFromNamespaceMetaDataPairDTO(dto: NamespaceMetaDataPairDTO): Namespace {
    return new Namespace(
      dto.namespace.fqn,
      new Address(dto.namespace.owner),
      dto.namespace.height,
      dto.meta.id,
    );
  }

  /**
   * @internal
   * @param dto
   * @returns {Namespace}
   */
  public static createFromNamespaceDTO(dto: NamespaceDTO): Namespace {
    return new Namespace(
      dto.fqn,
      new Address(dto.owner),
      dto.height,
    );
  }
}
