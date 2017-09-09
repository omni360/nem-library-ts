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

import {NetworkTypes} from "../../src/models/node/NetworkTypes";
import {NEMLibrary} from "../../src/NEMLibrary";
import {BlockchainListener} from "../../src/infrastructure/BlockchainListener";
import {EmptyMessage} from "../../src/models/transaction/PlainMessage";
import {XEM} from "../../src/models/mosaic/XEM";
import {TimeWindow} from "../../src/models/transaction/TimeWindow";
import {Address} from "../../src/models/account/Address";
import {TransferTransaction} from "../../src/models/transaction/TransferTransaction";
import {Account} from "../../src/models/account/Account";
import {TransactionHttp} from "../../src/infrastructure/TransactionHttp";

declare let process: any;

describe("BlockchainListener", () => {
  const privateKey: string = process.env.PRIVATE_KEY;
  let transactionHttp: TransactionHttp;
  let account: Account;

  before(() => {
    // Initialize NEMLibrary for TEST_NET Network
    NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
    account = Account.createWithPrivateKey(privateKey);
    transactionHttp = new TransactionHttp();
  });

  after(() => {
    NEMLibrary.reset();
  });

  it("should listen the new block", done => {
    const address = new Address("TDM3DO-ZM5WJ3-ZRBPSM-YRU6JS-WKUCAH-5VIPOF-4W7K");

    const transferTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      address,
      new XEM(0),
      EmptyMessage
    );

    new BlockchainListener().newBlock().subscribe(x => {
      console.log(x);
      done();
    }, err => {
      console.log(err);
    });

    let transaction = account.signTransaction(transferTransaction);

    transactionHttp.announceTransaction(transaction).delay(1000).subscribe(x => {
      console.log(x);
    });
  });

  it("should listen the new block", done => {
    const address = new Address("TBUAUC-3VYKPP-3PJPOH-7A7BCB-2C4I64-XZAAOZ-BO6N");

    const transferTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      address,
      new XEM(0),
      EmptyMessage
    );

    new BlockchainListener().newHeight().subscribe(x => {
      console.log(x);
      done();
    }, err => {
      console.log(err);
    });

    let transaction = account.signTransaction(transferTransaction);

    transactionHttp.announceTransaction(transaction).delay(1000).subscribe(x => {
      console.log(x);
    });
  });
});