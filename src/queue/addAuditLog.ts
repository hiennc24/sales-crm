import Queue from 'bull';
import { _CLASS } from "http-status";
import { auditLogService } from '../services/auditLogService';
import { IAuditLogDoc } from '../types';
import AbstractQueueProcessor from './AbstractQueue';

export type AuditLogQueueDataProps = {
  data: IAuditLogDoc
}
export default class AddAuditLogQueue extends AbstractQueueProcessor {

  processQueue = (job: AuditLogQueueDataProps, done: any) => {
    console.log(`___Processor___ processQueue: ${this.queueName}`, job.data);
    auditLogService.createAuditLog(job.data)
      .then(() => {
        done()
      })
  }

}

