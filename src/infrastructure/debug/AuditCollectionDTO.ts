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

/**
 * @internal
 * An audit collection consists of two arrays, containing information about incoming requests from other nodes.
 * The first array contains information about outstanding (i.e. not yet processed requests) and the second array contains information about the most recent requests.
 * The audit collection is for debug purposes.
 */
export interface AuditCollectionDTO {

  /**
   * Outstanding audit collections info
   */
  readonly outstanding: AuditCollectionInfoDTO[];

  /**
   * Most recent audit collections info
   */
  readonly mostrecent: AuditCollectionInfoDTO[];

}

export interface AuditCollectionInfoDTO {

  /**
   * 	The relative URL path.
   */
  readonly path: string;

  /**
   * The number of seconds elapsed since the creation of the nemesis block.
   */
  readonly starttime: number;

  /**
   * The host which initiated the request.
   */
  readonly host: string;

  /**
   * The time in seconds that has elapsed since the request was received.
   */
  readonly elapsetime: number;

  /**
   * The unique id of the request.
   */
  readonly id: number;
}
