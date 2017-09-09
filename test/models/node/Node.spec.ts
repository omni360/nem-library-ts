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

import {expect} from "chai";
import {Node, NodeEndpoint, NodeIdentity, NodeMetaData} from "../../../src/models/node/Node";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {NodeCollection} from "../../../src/models/node/NodeCollection";
import {NodeDTO, NodeEndpointDTO, NodeIdentityDTO, NodeMetaDataDTO} from "../../../src/infrastructure/node/NodeDTO";
import {NodeCollectionDTO} from "../../../src/infrastructure/node/NodeCollectionDTO";
import {ApplicationMetaDataDTO} from "../../../src/infrastructure/node/ApplicationMetaDataDTO";
import {NisNodeInfoDTO} from "../../../src/infrastructure/debug/NisNodeInfoDTO";
import {ApplicationMetaData, NisNodeInfo} from "../../../src/models/node/NisNodeInfo";
import {
  ExtendedNodeExperienceDataDTO,
  ExtendedNodeExperiencePairDTO
} from "../../../src/infrastructure/node/ExtendedNodeExperiencePairDTO";
import {ExtendedNodeExperience, ExtendedNodeExperienceData} from "../../../src/models/node/ExtendedNodeExperience";
import {NEMLibrary} from "../../../src/NEMLibrary";
import {deepEqual} from "assert";

describe("Node", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should create Node object", done => {
    const nodeDTO = generateNodeDTO();

    const node = Node.createFromNodeDTO(nodeDTO);
    deepEqual(node.metaData, NodeMetaData.createFromNodeMetaDataDTO(generateMetaDataDTO()));
    deepEqual(node.endpoint, NodeEndpoint.createFromNodeEndpointDTO(generateEndpointDTO()));
    deepEqual(node.identity, NodeIdentity.createFromNodeIdentityDTO(generateIdentityDTO()));
    done();
  });


  it("should create NodeCollection object", done => {
    const nodeDTO = generateNodeDTO();

    const nodeCollectionDTO = <NodeCollectionDTO> {
      inactive: [nodeDTO],
      active: [nodeDTO],
      busy: [nodeDTO],
      failure: [nodeDTO]
    };

    const nodeCollection = NodeCollection.createFromNodeCollectionDTO(nodeCollectionDTO);
    const node = Node.createFromNodeDTO(nodeDTO);

    deepEqual(nodeCollection.inactive, [node]);
    deepEqual(nodeCollection.active, [node]);
    deepEqual(nodeCollection.busy, [node]);
    deepEqual(nodeCollection.failure, [node]);
    done();
  });

  it("should create NisNodeInfo object", done => {
    const nodeDTO = generateNodeDTO();

    const applicationMetaDataDTO = <ApplicationMetaDataDTO> {
      currentTime: 12345678,
      application: "application",
      startTime: 12345678,
      version: "version",
      signer: "a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a",
    };

    const nisNodeInfoDTO = <NisNodeInfoDTO> {
      node: nodeDTO,
      nisInfo: applicationMetaDataDTO
    };

    const nisNodeInfo = NisNodeInfo.createFromNisNodeInfoDTO(nisNodeInfoDTO);
    deepEqual(nisNodeInfo.node, Node.createFromNodeDTO(nodeDTO));
    deepEqual(nisNodeInfo.nisInfo, ApplicationMetaData.createFromApplicationMetaDataDTO(applicationMetaDataDTO));
    done();

  });

  it("should create ExtendedNodeExperience object", done => {
    const nodeDTO = generateNodeDTO();

    const extendedNodeExperienceDataDTO = <ExtendedNodeExperienceDataDTO> {
      f: 1,
      s: 1
    };

    const extendedNodeExperiencePairDTO = <ExtendedNodeExperiencePairDTO>{
      node: nodeDTO,
      syncs: 1,
      experience: extendedNodeExperienceDataDTO
    };

    const extendedNodeExperience = ExtendedNodeExperience.createFromExtendedNodeExperiencePairDTO(extendedNodeExperiencePairDTO);
    deepEqual(extendedNodeExperience.node, Node.createFromNodeDTO(nodeDTO));
    expect(extendedNodeExperience.syncs).to.be.equal(1);
    deepEqual(extendedNodeExperience.experience, ExtendedNodeExperienceData.createFromExtendedNodeExperienceDataDTO(extendedNodeExperienceDataDTO));
    done();
  });

  let generateNodeDTO = (): NodeDTO => {
    return <NodeDTO> {
      metaData: generateMetaDataDTO(),
      endpoint: generateEndpointDTO(),
      identity: generateIdentityDTO()
    }
  };

  let generateMetaDataDTO = (): NodeMetaDataDTO => {
    return <NodeMetaDataDTO>{
      features: 1,
      networkId: NetworkTypes.TEST_NET,
      application: "application",
      version: "version",
      platform: "platform"
    }
  }

  let generateEndpointDTO = (): NodeEndpointDTO => {
    return <NodeEndpointDTO>{
      protocol: "http",
      port: 7890,
      host:"bob.nem.ninja"
    }
  }

  let generateIdentityDTO = (): NodeIdentityDTO => {
    return <NodeIdentityDTO> {
      name: "nodeName",
      publickey: "a4f9d42cf8e1f7c6c3216ede81896c4fa9f49071ee4aee2a4843e2711899b23a"
    }
  }
});