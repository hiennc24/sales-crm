import mongoose from 'mongoose'
import app from './app';
import { QUEUE_NAME } from './config';
import config from './config/config';
import logger from './config/logger';
import AddAuditLogQueue from './queue/addAuditLog';

let server: any;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);

    const addAuditLogQueue = new AddAuditLogQueue(QUEUE_NAME.PROJ_AUDIT_ADD)
    addAuditLogQueue.initQueue()

  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.debug(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();


    // const comId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
    // Company.create({
    //   _id: comId,
    //   tenancyId: "2", //2
    //   tenancyName: "the anh an2", //Biso24,
    //   name: "Công ty thương mại", //Công ty thương mại,
    //   isActive: true,//true,
    // })
    // User.create({
    //   userId: "1111",//1
    //   company: comId, //2

    //   name: "Anh",//admin,
    //   surname: "Anh",//admin,
    //   userName: "anh",//admin,
    //   emailAddress: "admin@aspnetzero.com",
    //   // phoneNumber: string | null,//null,
    //   // profilePictureId: string | null,//null,
    //   isActive: true,//true,
    //   creationTime: "2021-07-24T17:53:09.752915",
    // })

  }
});
