import 'reflect-metadata';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Container } from 'inversify';
import { makeLoggerMiddleware } from 'inversify-logger-middleware';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import TYPES from './constant/types';
import TAGS from './constant/tags';
import { MediaController } from './controller/media';
import { MongoDBClient } from './utils/mongodb/client';
import { LoginController } from './controller/login';
import Awss3Service from './services/awss3service';


// load everything needed to the Container
let container = new Container();

if (process.env.NODE_ENV === 'development') {
    let logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
}

container.bind<interfaces.Controller>(TYPE.Controller).to(MediaController).whenTargetNamed(TAGS.MediaController);
container.bind<interfaces.Controller>(TYPE.Controller).to(LoginController).whenTargetNamed(TAGS.LoginController);
container.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);
container.bind<Awss3Service>(TYPES.Awss3Service).to(Awss3Service);


// start the server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(helmet());
});

let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

exports = module.exports = app;
