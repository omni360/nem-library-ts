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

import {Base64} from "js-base64";
import {LocalDateTime} from "js-joda";
import * as nemSdk from "nem-sdk";
import {NEMLibrary} from "../../NEMLibrary";
import {Account} from "../account/Account";
import {Address} from "../account/Address";
import {NetworkTypes} from "../node/NetworkTypes";
import {BrainPassword} from "./BrainPassword";
import {Password} from "./Password";
import {Wallet} from "./Wallet";

/**
 * Brain wallet derived the private key from the brainPassword, hashing the brainPassword multiple times, therefore it's crucial to select a SAFE brainPassword.
 */
export class BrainWallet extends Wallet {

  /**
   * @internal
   * @param name
   * @param network
   * @param address
   * @param creationDate
   */
  constructor(name: string, network: NetworkTypes, address: Address, creationDate: LocalDateTime) {
    super(name, network, address, creationDate, 1);
  }

  /**
   * Create a BrainWallet
   * @param name
   * @param password
   * @returns {BrainWallet}
   */
  public static create(name: string, password: BrainPassword): BrainWallet {
    const network = NEMLibrary.getNetworkType();
    const wallet = nemSdk.default.model.wallet.createBrain(name, password.value, Wallet.networkTypesSDKAdapter(network));
    return new BrainWallet(
      name,
      network,
      new Address(wallet.accounts["0"].address),
      LocalDateTime.now(),
    );
  }

  /**
   * Open a wallet and generate an Account
   * @param password
   * @returns {Account}
   */
  public open(password: BrainPassword): Account {
    const common = nemSdk.default.model.objects.create("common")(password.value, "");
    nemSdk.default.crypto.helpers.passwordToPrivatekey(common, {}, "pass:6k");
    return Account.createWithPrivateKey(common.privateKey);
  }

  public unlockPrivateKey(password: Password): string {
    const common = nemSdk.default.model.objects.create("common")(password.value, "");
    nemSdk.default.crypto.helpers.passwordToPrivatekey(common, {}, "pass:6k");
    return common.privateKey;
  }

  /**
   * Converts BrainWallet into writable string to persist into a file
   * @returns {string}
   */
  public writeWLTFile(): string {
    return Base64.encode(JSON.stringify({
      name: this.name,
      network: this.network.toString(),
      address: this.address.plain(),
      creationDate: this.creationDate.toString(),
      schema: this.schema,
      type: "brain",
    }));
  }

  /**
   * Reads the WLT content and converts it into a BrainWallet
   * @param {string} wlt
   * @returns {BrainWallet}
   */
  public static readFromWLT(wlt: string): BrainWallet {
    const wallet = JSON.parse(Base64.decode(wlt));
    if (wallet.type != "brain") {
      throw new Error("ERROR WLT TYPE");
    }
    return new BrainWallet(
      wallet.name,
      wallet.network,
      new Address(wallet.address),
      LocalDateTime.parse(wallet.creationDate),
    );
  }

}
