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

import {Observable} from "rxjs";
import * as requestPromise from "request-promise-native";
import {HttpEndpoint, ServerConfig} from "./HttpEndpoint";
import {Namespace} from "../models/namespace/Namespace";
import {NamespaceMetaDataPairDTO} from "./namespace/NamespaceMetaDataPairDTO";
import {NamespaceDTO} from "./namespace/NamespaceDTO";

export class NamespaceHttp extends HttpEndpoint {

  constructor(nodes?: ServerConfig[]) {
    super("namespace", nodes);
  }

  /**
   * Gets the root namespaces. The requests supports paging, i.e. retrieving the root namespaces in batches of a specified size.
   * @param id - The topmost namespace database id up to which root namespaces are returned. The parameter is optional. If not supplied the most recent rented root namespaces are returned.
   * @param pageSize - (Optional) The number of namespace objects to be returned for each request. The parameter is optional. The default value is 25, the minimum value is 5 and hte maximum value is 100.
   * @returns Observable<Namespace[]>
   */
  getRootNamespaces(id: number, pageSize?: string): Observable<Namespace[]> {
    const url = 'root/page?id=' + id +
      (pageSize === undefined ? "" : "&pageSize=" + pageSize);

    return Observable.of(url)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map(namespacesData => {
        return namespacesData.data.map((namespace: NamespaceMetaDataPairDTO) => {
          return Namespace.createFromNamespaceMetaDataPairDTO(namespace);
        });
      });
  }

  /**
   * Gets the namespace with given id.
   * @param namespace - The namespace id.
   * @returns Observable<Namespace>
   */
  getNamespace(namespace: string): Observable<Namespace> {
    return Observable.of("?namespace=" + namespace)
      .flatMap(url => requestPromise.get(this.nextNode() + url, {json: true}))
      .retryWhen(this.replyWhenRequestError)
      .map((namespace: NamespaceDTO) => {
         return Namespace.createFromNamespaceDTO(namespace);
      });
  }

}
