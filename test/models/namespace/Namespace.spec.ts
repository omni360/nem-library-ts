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

import {deepEqual} from "assert";
import {expect} from "chai";
import {NamespaceDTO} from "../../../src/infrastructure/namespace/NamespaceDTO";
import {NamespaceMetaDataPairDTO} from "../../../src/infrastructure/namespace/NamespaceMetaDataPairDTO";
import {Address} from "../../../src/models/account/Address";
import {Namespace} from "../../../src/models/namespace/Namespace";

describe("Namespace", () => {

  it("should create a namespace given a NamespaceMetaDataPairDTO", () => {
    const name = "namespaceName";
    const owner = "TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA";
    const height = 1;
    const id = 1;
    const namespaceMetaDataPairDTO = {
      meta: {
        id,
      },
      namespace: {
        fqn: name,
        owner,
        height,
      },
    } as NamespaceMetaDataPairDTO;

    const namespace = Namespace.createFromNamespaceMetaDataPairDTO(namespaceMetaDataPairDTO);
    expect(namespace.name).to.be.equal(name);
    deepEqual(namespace.owner, new Address(owner));
    expect(namespace.height).to.be.equal(height);
    expect(namespace.id).to.be.equal(id);

  });

  it("should create a namespace given a NamespaceDTO", () => {
    const name = "namespaceName";
    const owner =  "TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA";
    const height = 1;
    const namespaceDTO = {
      fqn: name,
      owner,
      height,
    } as NamespaceDTO;

    const namespace = Namespace.createFromNamespaceDTO(namespaceDTO);
    expect(namespace.name).to.be.equal(name);
    deepEqual(namespace.owner, new Address(owner));
    expect(namespace.height).to.be.equal(height);

  });

  it("should create a namespace with constructor", () => {
    const name = "namespaceName";
    const owner = new Address("TCJZJHAV63RE2JSKN27DFIHZRXIHAI736WXEOJGA");
    const height = 1;
    const namespaceId = 1;

    const namespace = new Namespace(
      name,
      owner,
      height,
      namespaceId,
    );
    expect(namespace.name).to.be.equal(name);
    deepEqual(namespace.owner, owner);
    expect(namespace.height).to.be.equal(height);
    expect(namespace.id).to.be.equal(namespaceId);

  });
});
