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

import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Block} from "../models";
import {BlockHeight} from "./BlockHttp";
import {Listener, WebSocketConfig} from "./Listener";

/**
 * Blockchain listener
 */
export class BlockchainListener extends Listener {

  /**
   * Constructor
   * @param nodes
   */
  constructor(nodes?: WebSocketConfig[]) {
    super(nodes);
  }

  /**
   * Start listening new blocks
   * @returns {Observable<Block>}
   */
  newBlock(): Observable<Block> {
    return Observable.create((observer: Observer<Block>) => {
      let client = this.createClient();
      client.connect({}, () => {
        client.subscribe('/blocks', (data) => {
          try {
            const dto = JSON.parse(data.body);
            observer.next(Block.createFromBlockDTO(dto));
          } catch (e) {
            observer.error(e);
          }
        });
      }, (err) => {
        observer.error(err);
      });
      return () => {
        client.unsubscribe();
      };
    }).retry(10);
  }

  /**
   * Start listening new blockchain height
   * @returns {Observable<BlockHeight>}
   */
  newHeight(): Observable<BlockHeight> {
    return Observable.create((observer: Observer<BlockHeight>) => {
      let client = this.createClient();
      client.connect({}, () => {
        client.subscribe('/blocks/new', (data) => {
          try {
            const dto = JSON.parse(data.body);
            observer.next(dto.height);
          } catch (e) {
            observer.error(e);
          }
        });
      }, (err) => {
        observer.error(err);
      });
      return () => {
        client.unsubscribe();
      };
    }).retry(10);
  }
}