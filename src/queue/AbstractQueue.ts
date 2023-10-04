import Queue from 'bull';
import { _CLASS } from "http-status";

export default class AbstractQueueProcessor {
  queueName: string;
  queue: any;

  constructor(queueName: string) {
    //console.log(`___Processor___ AbstractQueueProcessor: ${queueName} >>> constructor`);
    this.queueName = queueName;
  }

  initQueue(data?: any) {
    this.queue = new Queue(this.queueName, `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`);
    this.start()
  }

  start() {
    this.queue.clean(20);
    this.queue.clean(20, 'failed');

    //TODO: do the same for this.queue & postQueue
    this.queue.process(50, (job: any, done: any) => this.processQueue(job, done))
      .catch(function (err: any) {
      });
  }

  processQueue = (job: any, done: any) => {
    done()
  }
}
