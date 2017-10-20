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
 * NIS uses timers to schedule periodic tasks. Those tasks are monitored and their result is memorized.
 * The NemAsyncTimeVisitor structure holds the information.
 */
export interface NemAsyncTimerVisitorDTO {

  /**
   * The number of milliseconds since the last execution of the timer.
   */
  readonly lastdelaytime: number;

  /**
   * The number of times the task was executed.
   */
  readonly executions: number;

  /**
   * The number times the task failed.
   */
  readonly failures: number;

  /**
   * The number times the task was successful.
   */
  readonly successes: number;

  /**
   * The time at which the task started last time.
   */
  readonly lastoperationstarttime: number;

  /**
   * True if the task is executing, false otherwise.
   */
  readonly isexecuting: number;

  /**
   * The name of the task.
   */
  readonly name: string;

  /**
   * The number of seconds the task needed on average.
   */
  readonly averageoperationtime: number;

  /**
   * The number of seconds the task needed the last time.
   */
  readonly lastoperationtime: number;

}
