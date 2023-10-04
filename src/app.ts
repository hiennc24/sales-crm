import express from 'express';
import helmet from 'helmet';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import config from './config/config';
import morgan from './config/morgan';
import { authLimiter } from './middlewares/rateLimiter';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import { IUserModel } from './models';
import { Server } from "socket.io";
import logger from './config/logger';

export { };
declare global {
  let __basedir: string
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userInfo: IUserDoc,

      userId: string,
      companyId: string,
      projectId: string,
      isAdminProject: boolean,
    }
  }
}

const app = express();
import http from 'http';
import { IUserDoc } from './types';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  },
});
app.set('socketio', io);


io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('CTA_CONNECTED', (data) => {
    //console.log('CLIENT_CONNECTED: ' + JSON.stringify(data));
    socket.emit("ATC_CONNECTED", {
      message: "ok, xác nhận kết nối!"
    })
  });

  socket.on('CTA_JOINROOM', (data: {
    roomName: string
  }) => {
    //console.log('CTA_JOINROOM: ' + JSON.stringify(data));
    if (!!data && !!data.roomName && typeof (data.roomName) == 'string') {
      socket.join(data.roomName)
      socket.emit("APPTOCLIENT_JOINED", data)
    }
  });
  socket.on('CTA_LEAVEROOM', (data: {
    roomName: string
  }) => {
    //console.log('CTA_LEAVEROOM: ' + JSON.stringify(data));

    if (!!data && !!data.roomName && typeof (data.roomName) == 'string') {
      socket.leave(data.roomName)
      socket.emit("APPTOCLIENT_LEAVED", data)
    }
  });

  socket.on('disconnect', function () {
    console.debug("socketIo disconnect")
  });

  socket.onAny((eventName, data) => {
    console.debug("socket_onAny", {
      eventName, data
    })
  })
});

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// if (config.env == 'production') {
//   console.log = () => {

//   }
// }

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
// app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default server;
