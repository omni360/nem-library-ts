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
import {MosaicHttp} from "../../src/infrastructure/MosaicHttp";
import {Address} from "../../src/models/account/Address";
import {MosaicProperties} from "../../src/models/mosaic/MosaicDefinition";
import {MosaicId} from "../../src/models/mosaic/MosaicId";
import {MosaicLevy, MosaicLevyType} from "../../src/models/mosaic/MosaicLevy";
import {MosaicTransferable} from "../../src/models/mosaic/MosaicTransferable";
import {XEM} from "../../src/models/mosaic/XEM";
import {NetworkTypes} from "../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../src/NEMLibrary";
import {MosaicService} from "../../src/services/MosaicService";

describe("MosaicService", () => {

  before(() => {
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should return levy 0 when mosaicTransferable don't have levy", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const mosaicTransferable = new XEM(10);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0);
      done();
    });
  });

  it("should calculate levy for absolute", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 100000000, true, false);
    const mosaicId = XEM.MOSAICID;
    const levy = new MosaicLevy(MosaicLevyType.Absolute, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), XEM.MOSAICID, 5);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 10, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0.000005);
      done();
    });
  });

  it("should calculate levy for absolute different xem", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 100000000, true, false);
    const mosaicId = XEM.MOSAICID;
    const levy = new MosaicLevy(MosaicLevyType.Absolute, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), XEM.MOSAICID, 5);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 10000, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0.000005);
      done();
    });
  });

  it("should calculate levy for percentile xem 100", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 100000000, true, false);
    const mosaicId = XEM.MOSAICID;
    const levy = new MosaicLevy(MosaicLevyType.Percentil, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), XEM.MOSAICID, 150);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 100, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0.000001);
      done();
    });
  });

  it("should calculate levy for percentile xem 1000", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 100000000, true, false);
    const mosaicId = XEM.MOSAICID;
    const levy = new MosaicLevy(MosaicLevyType.Percentil, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), XEM.MOSAICID, 150);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 1000, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0.000015);
      done();
    });
  });

  it("should calculate levy for percentile xem 10000", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 100000000, true, false);
    const mosaicId = XEM.MOSAICID;
    const levy = new MosaicLevy(MosaicLevyType.Percentil, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), XEM.MOSAICID, 150);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 10000, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(0.00015);
      done();
    });
  });

  it("should calculate levy for mosaic no XEM xem 10000", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 10000000, true, false);
    const mosaicId = new MosaicId("server", "alcapone");
    const levyMosaicId = new MosaicId("server", "masteroftheworld");
    const levy = new MosaicLevy(MosaicLevyType.Percentil, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), levyMosaicId, 5);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 10000, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(5);
      done();
    });
  });

  it("should calculate levy for mosaic no XEM xem 100000", (done) => {
    const mosaicService = new MosaicService(new MosaicHttp());
    const properties = new MosaicProperties(0, 10000000, true, false);
    const mosaicId = new MosaicId("server", "alcapone");
    const levyMosaicId = new MosaicId("server", "masteroftheworld");
    const levy = new MosaicLevy(MosaicLevyType.Percentil, new Address("TBV7LE4TFDEMGVOON5MYOK2P7TU2KEKLMHOLHQT6"), levyMosaicId, 5);
    const mosaicTransferable = new MosaicTransferable(mosaicId, properties, 100000, levy);
    mosaicService.calculateLevy(mosaicTransferable).subscribe((levy) => {
      expect(levy).to.be.equal(50);
      done();
    });
  });

});
