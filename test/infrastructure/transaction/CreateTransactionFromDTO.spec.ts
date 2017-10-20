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
import {
  CreateSimpleTransactionFromDTO,
  CreateTransactionFromDTO,
} from "../../../src/infrastructure/transaction/CreateTransactionFromDTO";
import {MultisigTransactionDTO} from "../../../src/infrastructure/transaction/MultisigTransactionDTO";
import {TransactionMetaDataPairDTO} from "../../../src/infrastructure/transaction/TransactionMetaDataPairDTO";
import {NetworkTypes} from "../../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../../src/NEMLibrary";

describe("CreateTransactionFromDTO", () => {

  before(() => {
    NEMLibrary.reset();
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("TRANSFER", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121123,
        hash: {
          data: "0aaf097e8071ab084d7c28d03fd26f2fc2690ad20e66720c922afd1bbaf97a36",
        },
        height: 1019766,
      },
      transaction: {
        timeStamp: 71847392,
        amount: 15674000000,
        signature: "6b306b2310e576ed21a821c329062289f2461b769b3504186a4390e4027d9232fb86f235a1c378cfe30f55f8f8e78c0e9ec537e6e4e9550ebbca31f5835ddd09",
        fee: 1000000,
        recipient: "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
        type: 257,
        deadline: 71850992,
        message: {},
        version: -1744830463,
        signer: "0e4573c386c5f891d2e61bfb5a96144fbd9881980b885751dba471ae1807dc34",
      },
    };
    const resultDTO: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121123,
        hash: {
          data: "0aaf097e8071ab084d7c28d03fd26f2fc2690ad20e66720c922afd1bbaf97a36",
        },
        height: 1019766,
      },
      transaction: {
        timeStamp: 71847392,
        amount: 15674000000,
        signature: "6b306b2310e576ed21a821c329062289f2461b769b3504186a4390e4027d9232fb86f235a1c378cfe30f55f8f8e78c0e9ec537e6e4e9550ebbca31f5835ddd09",
        fee: 1000000,
        recipient: "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
        type: 257,
        deadline: 71850992,
        message: {
          payload: "",
          type: 1,
        },
        version: -1744830463,
        signer: "0e4573c386c5f891d2e61bfb5a96144fbd9881980b885751dba471ae1807dc34",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), resultDTO.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);

  });

  it("IMPORTANCE_TRANSFER", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121124,
        hash: {
          data: "dc6774a264fd2655948c19a32b5ed1cb90d665c3047d7eaa451dc4c538f7cfe5",
        },
        height: 1019768,
      },
      transaction: {
        timeStamp: 71847490,
        mode: 1,
        signature: "79c0bad3cf5ee5e94e39dcf582bafe8506fe1cc19e3177d70dc371d47606be6e6b276eec1493d8a31049baa7b74a8c898878c458cb35e99c3371975690a1b202",
        fee: 6000000,
        remoteAccount: "31e869652a16fcf76073bb73aa94854f2fc5b4d7acd880c9f5a663b054f0efec",
        type: 2049,
        deadline: 71851090,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("PROVISION_NAMESPACE", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121125,
        hash: {
          data: "911b6d39d6246be58345cdc7b85f9f5737677c62d0c14be18138c5c0407b5f0b",
        },
        height: 1019768,
      },
      transaction: {
        timeStamp: 71847610,
        parent: "parent",
        signature: "c52450a9646337f4f404e94920c390ccfad45263b64285bc44a20c2889006acf54a8259c395cb22603c939b0224924d261ad77b52484c85fa182660e7c8ca101",
        fee: 20000000,
        rentalFeeSink: "TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35",
        rentalFee: 5000000000,
        newPart: "lonwon",
        type: 8193,
        deadline: 71851210,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MOSAIC_DEFINITION_CREATION without levy", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121129,
        hash: {
          data: "ecd2dbf3fdc2fdb47230aaff6301bdfb78723a489d12fcab00a11f05adb769ae",
        },
        height: 1019784,
      },
      transaction: {
        timeStamp: 71848573,
        creationFee: 500000000,
        mosaicDefinition: {
          creator: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
          description: "description",
          id: {
            namespaceId: "lonwon",
            name: "joe",
          },
          properties: [
            {
              name: "divisibility",
              value: "1",
            },
            {
              name: "initialSupply",
              value: "1000000",
            },
            {
              name: "supplyMutable",
              value: "true",
            },
            {
              name: "transferable",
              value: "true",
            },
          ],
          levy: {},
        },
        signature: "2222633625eda5e4b16597f5cdabc300a2e68850c5a419d81caa3c027f566ce98c47f3f9e22e1160cf96b68cc921338bc6db9647e8f9a056953a97044aec9709",
        fee: 20000000,
        creationFeeSink: "TBMOSAICOD4F54EE5CDMR23CCBGOAM2XSJBR5OLC",
        type: 16385,
        deadline: 71852173,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const resultDTO: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121129,
        hash: {
          data: "ecd2dbf3fdc2fdb47230aaff6301bdfb78723a489d12fcab00a11f05adb769ae",
        },
        height: 1019784,
      },
      transaction: {
        timeStamp: 71848573,
        creationFee: 500000000,
        mosaicDefinition: {
          creator: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
          description: "description",
          id: {
            namespaceId: "lonwon",
            name: "joe",
          },
          properties: [
            {
              name: "divisibility",
              value: "1",
            },
            {
              name: "initialSupply",
              value: "1000000",
            },
            {
              name: "supplyMutable",
              value: "true",
            },
            {
              name: "transferable",
              value: "true",
            },
          ],
          levy: null,
        },
        signature: "2222633625eda5e4b16597f5cdabc300a2e68850c5a419d81caa3c027f566ce98c47f3f9e22e1160cf96b68cc921338bc6db9647e8f9a056953a97044aec9709",
        fee: 20000000,
        creationFeeSink: "TBMOSAICOD4F54EE5CDMR23CCBGOAM2XSJBR5OLC",
        type: 16385,
        deadline: 71852173,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), resultDTO.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MOSAIC_DEFINITION_CREATION with levy percentile", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121130,
        hash: {
          data: "c27c098f4348f86d93a3bf68161310eb116a44fc1521d07127ccff037151a2cc",
        },
        height: 1019787,
      },
      transaction: {
        type: 16385,
        fee: 20000000,
        timeStamp: 71848752,
        creationFee: 500000000,
        mosaicDefinition: {
          creator: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
          description: "description",
          id: {
            namespaceId: "lonwon",
            name: "joe2",
          },
          properties: [
            {
              name: "divisibility",
              value: "1",
            },
            {
              name: "initialSupply",
              value: "1000000",
            },
            {
              name: "supplyMutable",
              value: "false",
            },
            {
              name: "transferable",
              value: "false",
            },
          ],
          levy: {
            fee: 100,
            recipient: "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
            type: 2,
            mosaicId: {
              namespaceId: "nem",
              name: "xem",
            },
          },
        },
        signature: "8c77d9ab2143eeff2ad8d731497ab51ad443024d9b677f1b400a49e715cb5822b1f9ac105161fdbc6ae3b4f75cb77b36ac0e93e31aa421d7dde3b77d5a5cfa01",
        creationFeeSink: "TBMOSAICOD4F54EE5CDMR23CCBGOAM2XSJBR5OLC",
        deadline: 71852352,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };

    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MOSAIC_DEFINITION_CREATION with levy absolute", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121131,
        hash: {
          data: "4e1a5c10d60d6d4b8935c0d754fa68768b2d09727cd25059f515a012cee632a9",
        },
        height: 1019789,
      },
      transaction: {
        timeStamp: 71848871,
        creationFee: 500000000,
        mosaicDefinition: {
          creator: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
          description: "description",
          id: {
            namespaceId: "lonwon",
            name: "joe3",
          },
          properties: [
            {
              name: "divisibility",
              value: "1",
            },
            {
              name: "initialSupply",
              value: "1000000",
            },
            {
              name: "supplyMutable",
              value: "false",
            },
            {
              name: "transferable",
              value: "false",
            },
          ],
          levy: {
            fee: 100,
            recipient: "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
            type: 1,
            mosaicId: {
              namespaceId: "nem",
              name: "xem",
            },
          },
        },
        signature: "a22d23d593e98471c6c488a4608b5f529a0b586d64e99fa4a7ba5024e35074abf4959b26109187f709d0ce95c890b2ea5162b8966c2afb934a66c6283d1dfb01",
        fee: 20000000,
        creationFeeSink: "TBMOSAICOD4F54EE5CDMR23CCBGOAM2XSJBR5OLC",
        type: 16385,
        deadline: 71852471,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MOSAIC_SUPPLY_CHANGE create new mosaics", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121132,
        hash: {
          data: "d8cabf3331a6009e7e577e6e8a2dfb99720a91757fb147f8f13ced36587361ba",
        },
        height: 1019792,
      },
      transaction: {
        timeStamp: 71849052,
        signature: "0b736c5ddb84d745401cd8328449f4de3a68f661a4ad33ee89324c0048dadfb348cf515063efea95f55f3716dfdd033c99e7be240f179a098df6d2f460dd0b03",
        fee: 20000000,
        supplyType: 1,
        delta: 10,
        type: 16386,
        deadline: 71852652,
        mosaicId: {
          namespaceId: "lonwon",
          name: "joe",
        },
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MOSAIC_SUPPLY_CHANGE remove mosaics", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121133,
        hash: {
          data: "26bd482b6725be6eb09c4c6acedd31417ee1dce82f8a2d7007cd78bc190fa51c",
        },
        height: 1019792,
      },
      transaction: {
        timeStamp: 71849053,
        signature: "3fb706e0fd4f10be95862f19df91d35dbd2bc7da862671f15d93e8e478cd3ce256cf862ba4d369383c3631169cc2b2c75c5ab1b809398d80948c3ddbc0b3d308",
        fee: 20000000,
        supplyType: 2,
        delta: 10,
        type: 16386,
        deadline: 71852653,
        mosaicId: {
          namespaceId: "lonwon",
          name: "joe",
        },
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MULTISIG create multisig", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121134,
        hash: {
          data: "4211b43bb5b5ebe8b5d98e84f162bb0004683b80f1f5f031e92ca38e2c51a44a",
        },
        height: 1019794,
      },
      transaction: {
        timeStamp: 71849411,
        signature: "05127fdc52253d9b5e82c921bc518b24397bdc4964e858e7fe7bae438d6cd8df8a35c1c5529c27a51c6d5a24e54d3751e73cba6f58d60ae402742448e91aa60f",
        fee: 34000000,
        minCosignatories: {
          relativeChange: 1,
        },
        type: 4097,
        deadline: 71853011,
        version: -1744830462,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
        modifications: [
          {
            modificationType: 1,
            cosignatoryAccount: "3cf6f259c032933fcc9482cc70dc94244908895dbee16658ff3aa831b05fe205",
          },
          {
            modificationType: 1,
            cosignatoryAccount: "31b4c0ef182c0e029b4ee2663df296b1bde1ad821990c41ca08fc9773f60af37",
          },
          {
            modificationType: 1,
            cosignatoryAccount: "4afae122ee0dba43a45ce8482a0db2181d99964cc9609acbd4bcc5652c02d031",
          },
        ],
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MULTISIG_AGGREGATE_MODIFICATION add cosignatory", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "38a4afb9733f86031fecf3311ec641ae820f7fb577c816d2b47c931f0466e470",
        },
        id: 121260,
        hash: {
          data: "2b3a00dc07c29d2341bf0589f0138606801799235f00c7b2f58405fdccac302d",
        },
        height: 1021080,
      },
      transaction: {
        timeStamp: 71927100,
        signature: "bffd973c7125927927fc89a7117fe5f3a2aa2286e452c3a97e381776a7d20675e88d350c6c63723787e3988b79bc05bee3ff4cd5f3850118ae7a819d1afa0304",
        fee: 6000000,
        type: 4100,
        deadline: 71930700,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71927161,
            otherHash: {
              data: "38a4afb9733f86031fecf3311ec641ae820f7fb577c816d2b47c931f0466e470",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "74ff5beeab52be6663d636bc07e785adbb7569b9dfd3a3e0449fdd6b8680f24db175c52e79c86e836251c6d292f707e9227b0fa4b29d8e4562d68152b5ec0805",
            fee: 6000000,
            type: 4098,
            deadline: 71930761,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71927100,
          fee: 16000000,
          type: 4097,
          deadline: 71930700,
          version: -1744830463,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
          modifications: [
            {
              modificationType: 1,
              cosignatoryAccount: "d207e5e61b983c98afef5ee6bbf2ed03af9ccdb460d08e397f1d15debd1d0d09",
            },
          ],
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG_AGGREGATE_MODIFICATION remove cosignatory", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "68c22df185844ad9438313c14e103614130414c06945be60a4944ef378303680",
        },
        id: 121266,
        hash: {
          data: "8de8dae83a7598cdec1d49bdcb17308610ff799efd2ec4b53575b5cfbd101ef8",
        },
        height: 1021084,
      },
      transaction: {
        timeStamp: 71927359,
        signature: "082d47ad8b99133534cde2855b9fac34a7751af37eebc944e94895d8ce94bb0196235c255648ffbd24ef24bcdc0cd13cbd6e66e5641ce3f7709bbe782ae73e07",
        fee: 6000000,
        type: 4100,
        deadline: 71930959,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71927408,
            otherHash: {
              data: "68c22df185844ad9438313c14e103614130414c06945be60a4944ef378303680",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "1185dbd0e41aef2adb00e0972e1364af3118f89dd699ec9af34ca861fb1c91e1c43d80375d9f428c3f87712b4a6ee5b10ce318a765d4960d7d0d6936c06df203",
            fee: 6000000,
            type: 4098,
            deadline: 71931008,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71927359,
          fee: 22000000,
          minCosignatories: {
            relativeChange: 1,
          },
          type: 4097,
          deadline: 71930959,
          version: -1744830462,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
          modifications: [
            {
              modificationType: 2,
              cosignatoryAccount: "d207e5e61b983c98afef5ee6bbf2ed03af9ccdb460d08e397f1d15debd1d0d09",
            },
          ],
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG - TRANSFER with mosaics", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "1d885b297f67f90b3a13f8b0ae6175e6c0ab6587d50284f37b68da2ff2d95310",
        },
        id: 121268,
        hash: {
          data: "cbae0096c4fc9a3920c502473d2a27448e1423a9e40df29224bc53fe638f8362",
        },
        height: 1021090,
      },
      transaction: {
        timeStamp: 71927531,
        signature: "15585b9e504bddba323703b4d37c6d11341034d35754f648e8d8f77656cc4ec8a0fac7c1c9232446e89cb5570fa86cb86eb1dca5c2997cf586994a695b767f0c",
        fee: 6000000,
        type: 4100,
        deadline: 71931131,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71927521,
            otherHash: {
              data: "1d885b297f67f90b3a13f8b0ae6175e6c0ab6587d50284f37b68da2ff2d95310",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "7e7ba2ac47824447400ea11a9593d131a6ceef52596432ad112a5ff458cbfe723d2e5ddb728b78baf6a34e23517866be2930ff3f054a88ff3359eb69413c8803",
            fee: 6000000,
            type: 4098,
            deadline: 71931121,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71927531,
          amount: 1000000,
          fee: 1000000,
          recipient: "TBUTWOAPNAM543YRECRGZPEMTF7SXMWAKIW26EIO",
          mosaics: [
            {
              quantity: 3000000,
              mosaicId: {
                namespaceId: "nem",
                name: "xem",
              },
            },
          ],
          type: 257,
          deadline: 71931131,
          message: {},
          version: -1744830462,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const resultDTO: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "1d885b297f67f90b3a13f8b0ae6175e6c0ab6587d50284f37b68da2ff2d95310",
        },
        id: 121268,
        hash: {
          data: "cbae0096c4fc9a3920c502473d2a27448e1423a9e40df29224bc53fe638f8362",
        },
        height: 1021090,
      },
      transaction: {
        timeStamp: 71927531,
        signature: "15585b9e504bddba323703b4d37c6d11341034d35754f648e8d8f77656cc4ec8a0fac7c1c9232446e89cb5570fa86cb86eb1dca5c2997cf586994a695b767f0c",
        fee: 6000000,
        type: 4100,
        deadline: 71931131,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71927521,
            otherHash: {
              data: "1d885b297f67f90b3a13f8b0ae6175e6c0ab6587d50284f37b68da2ff2d95310",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "7e7ba2ac47824447400ea11a9593d131a6ceef52596432ad112a5ff458cbfe723d2e5ddb728b78baf6a34e23517866be2930ff3f054a88ff3359eb69413c8803",
            fee: 6000000,
            type: 4098,
            deadline: 71931121,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71927531,
          amount: 1000000,
          fee: 1000000,
          recipient: "TBUTWOAPNAM543YRECRGZPEMTF7SXMWAKIW26EIO",
          mosaics: [
            {
              quantity: 3000000,
              mosaicId: {
                namespaceId: "nem",
                name: "xem",
              },
            },
          ],
          type: 257,
          deadline: 71931131,
          message: {
            payload: "",
            type: 1,
          },
          version: -1744830462,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), resultDTO.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG - IMPORTANCE_TRANSFER", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "e7576e7d090edd33f523c2bd53b4dff3319e13d7a65b64a484854743d96d7def",
        },
        id: 121273,
        hash: {
          data: "26f273a405520604d925861b53be9d88d3f59bffd2062e608192171c1dd16d26",
        },
        height: 1021094,
      },
      transaction: {
        timeStamp: 71928123,
        signature: "c22e9d70c52a5a673d0c800af11b72a70b9f196f82b47a2543a8acd1de842a104ae3527ca0d16243ced8b1295e1d3e5270cb8f0f5bb7d8bf04ccd9598593d309",
        fee: 6000000,
        type: 4100,
        deadline: 71931723,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71928158,
            otherHash: {
              data: "e7576e7d090edd33f523c2bd53b4dff3319e13d7a65b64a484854743d96d7def",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "310d36957253030b3a2cb169357a0fab00e2d6622d29f530cd4bbdf355e18ebe665e53360b27d8fdd73ce5eee6c3d67b80796ab00b2856e27e903c0c8856ea04",
            fee: 6000000,
            type: 4098,
            deadline: 71931758,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71928123,
          mode: 1,
          fee: 6000000,
          remoteAccount: "7d1b5680d0b250a8f12cd176edd5c8560c2cfa3f89e15fc8e35b18a59c2fac4e",
          type: 2049,
          deadline: 71931723,
          version: -1744830463,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG - PROVISION_NAMESPACE", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "79f284226005a6eb500d59a6b2ad8b129fce594f2f195565923580c602bf5b41",
        },
        id: 121275,
        hash: {
          data: "3584e542bec8054777037d173f2d284c9c0da39ab8aec55f608357692d36cdb3",
        },
        height: 1021094,
      },
      transaction: {
        timeStamp: 71928189,
        signature: "4a839352046c6a977e6ca23f091942562e45e6abe1c22924a19475f690ca332632188ea02dee3091862c114bf1f9f8253461abc6e4adcfc3f0ab60eeab8b0001",
        fee: 6000000,
        type: 4100,
        deadline: 71931789,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71928162,
            otherHash: {
              data: "79f284226005a6eb500d59a6b2ad8b129fce594f2f195565923580c602bf5b41",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "0d1b7811bae126255cd490a35f90dd3b8542c987f1cb4f6cd2f345eb3716204bf2747d956d3281b631f6fec11b0bb32e86d1d09f26c1a0107bb938cd32bef504",
            fee: 6000000,
            type: 4098,
            deadline: 71931762,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71928189,
          parent: "parent",
          fee: 20000000,
          rentalFeeSink: "TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35",
          rentalFee: 5000000000,
          newPart: "multisig",
          type: 8193,
          deadline: 71931789,
          version: -1744830463,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG - MOSAIC_DEFINITION_CREATION", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "b7cc0f1be8c0869a7b82655b41befa077e83608dc7fde0babfb5d12dc0f2032e",
        },
        id: 121279,
        hash: {
          data: "6f0b6b4a5a79ffa1dd7cd2d1b26eb350743f3a59eaaea91e6635d799946f5f35",
        },
        height: 1021097,
      },
      transaction: {
        timeStamp: 71928306,
        signature: "9b70d57d527f39c2448dc4145e26509dcd87cd2233d42fdb2a00d0600d935f7fcc60ed8d30742353bcce2a159c839a3c859c40be0de55c409fb6bf1951cbf601",
        fee: 6000000,
        type: 4100,
        deadline: 71931906,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71928369,
            otherHash: {
              data: "b7cc0f1be8c0869a7b82655b41befa077e83608dc7fde0babfb5d12dc0f2032e",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "908b882d5595e7e89e70fa7eefa5bdf9b3fc0ce612612d55ec865e13851fa5bcc50115345a24611850cddf05bf851bd06303842415de680d65dcb98cb92a7b0c",
            fee: 6000000,
            type: 4098,
            deadline: 71931969,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71928306,
          creationFee: 500000000,
          mosaicDefinition: {
            creator: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
            description: "description",
            id: {
              namespaceId: "multisig",
              name: "cosig",
            },
            properties: [
              {
                name: "divisibility",
                value: "0",
              },
              {
                name: "initialSupply",
                value: "10",
              },
              {
                name: "supplyMutable",
                value: "true",
              },
              {
                name: "transferable",
                value: "true",
              },
            ],
            levy: {
              fee: 100,
              recipient: "TBNDYR4AVGYFEEUQ5LBPNEON42HSQ37NYGLZC344",
              type: 1,
              mosaicId: {
                namespaceId: "nem",
                name: "xem",
              },
            },
          },
          fee: 20000000,
          creationFeeSink: "TBMOSAICOD4F54EE5CDMR23CCBGOAM2XSJBR5OLC",
          type: 16385,
          deadline: 71931906,
          version: -1744830463,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    deepEqual(transaction.getTransactionInfo().id, dto.meta.id);
    deepEqual(transaction.getTransactionInfo().height, dto.meta.height);
  });

  it("MULTISIG - MOSAIC_SUPPLY_CHANGE", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {
          data: "38328c34a0c6cd280f6b21ff6378cb2fa574fdce13a6fc7d667f829aac2bb7bc",
        },
        id: 121282,
        hash: {
          data: "57228a8df1f48aeb682609fb0832fca5435abcd5e4c5b1abb3eefe858378fb45",
        },
        height: 1021100,
      },
      transaction: {
        timeStamp: 71928424,
        signature: "585e68a4a4677a2fef3883353e0b1e57d7c9d9a9b0ee84baff58462a044aabee38353c29d81d5ccee23ae1ea6bb34f6bcd54500d4c4d1dd68ce8d0eb6eac730a",
        fee: 6000000,
        type: 4100,
        deadline: 71932024,
        version: -1744830463,
        signatures: [
          {
            timeStamp: 71928435,
            otherHash: {
              data: "38328c34a0c6cd280f6b21ff6378cb2fa574fdce13a6fc7d667f829aac2bb7bc",
            },
            otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
            signature: "1ed9e18cdfaf7e616924aa11c457f327509c807493b90ecb9ae23d1dd23dc972f64f472ad4cdfdf1ec831551ff937ed43521bdcfcc32ba7de043182774f0510e",
            fee: 6000000,
            type: 4098,
            deadline: 71932035,
            version: -1744830463,
            signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
          },
        ],
        signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
        otherTrans: {
          timeStamp: 71928424,
          fee: 20000000,
          supplyType: 1,
          delta: 10,
          type: 16386,
          deadline: 71932024,
          mosaicId: {
            namespaceId: "multisig",
            name: "cosig",
          },
          version: -1744830463,
          signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
        },
      },
    };
    const transaction = CreateTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto.transaction);
    deepEqual(transaction.getTransactionInfo().hash, dto.meta.hash);
    expect(transaction.getTransactionInfo().id).to.be.equal(dto.meta.id);
    expect(transaction.getTransactionInfo().height).to.be.equal(dto.meta.height);
  });

  it("MULTISIG create multisig simple transaction", () => {
    const dto: MultisigTransactionDTO = {
      timeStamp: 71927531,
      signature: "15585b9e504bddba323703b4d37c6d11341034d35754f648e8d8f77656cc4ec8a0fac7c1c9232446e89cb5570fa86cb86eb1dca5c2997cf586994a695b767f0c",
      fee: 6000000,
      type: 4100,
      deadline: 71931131,
      version: -1744830463,
      signatures: [
        {
          timeStamp: 71927521,
          otherHash: {
            data: "1d885b297f67f90b3a13f8b0ae6175e6c0ab6587d50284f37b68da2ff2d95310",
          },
          otherAccount: "TAVBSWJV3XNA7MRVEH3XQQYRTJGXM3VRKCQDKHR7",
          signature: "7e7ba2ac47824447400ea11a9593d131a6ceef52596432ad112a5ff458cbfe723d2e5ddb728b78baf6a34e23517866be2930ff3f054a88ff3359eb69413c8803",
          fee: 6000000,
          type: 4098,
          deadline: 71931121,
          version: -1744830463,
          signer: "6248bd062d212ab654e73325a7ab2588b96d7054b39f2e8ee99a5bb688d6e91e",
        },
      ],
      signer: "388211dbda71fcbcde2bacc72d396d9a2c74a3cc35dc48a1f09cc241319f973b",
      otherTrans: {
        timeStamp: 71927531,
        amount: 1000000,
        fee: 1000000,
        recipient: "TBUTWOAPNAM543YRECRGZPEMTF7SXMWAKIW26EIO",
        mosaics: [
          {
            quantity: 3000000,
            mosaicId: {
              namespaceId: "nem",
              name: "xem",
            },
          },
        ],
        type: 257,
        deadline: 71931131,
        message: {
          payload: "",
          type: 1,
        },
        version: -1744830462,
        signer: "e310655ea1173df2c22e775853e86ceeaebf2660f94021116463d693415febe1",
      },
    };
    const transaction = CreateSimpleTransactionFromDTO(dto);
    deepEqual(transaction.toDTO(), dto);
  });

  it("throws an error when the transaction type is not implemented", () => {
    const dto: TransactionMetaDataPairDTO = {
      meta: {
        innerHash: {},
        id: 121125,
        hash: {
          data: "911b6d39d6246be58345cdc7b85f9f5737677c62d0c14be18138c5c0407b5f0b",
        },
        height: 1019768,
      },
      transaction: {
        timeStamp: 71847610,
        parent: "parent",
        signature: "c52450a9646337f4f404e94920c390ccfad45263b64285bc44a20c2889006acf54a8259c395cb22603c939b0224924d261ad77b52484c85fa182660e7c8ca101",
        fee: 20000000,
        rentalFeeSink: "TAMESPACEWH4MKFMBCVFERDPOOP4FK7MTDJEYP35",
        rentalFee: 5000000000,
        newPart: "lonwon",
        type: 400000,
        deadline: 71851210,
        version: -1744830463,
        signer: "697ab20e3f1349c4868c6443c4bef0ac23707621f94257cf1d71f743633c5966",
      },
    };
    expect(() => {
      CreateTransactionFromDTO(dto);
    }).to.throw(Error, "Unimplemented transaction with type 400000");
  });

});
