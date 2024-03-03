if (process.env.NODE_ENV !== 'production') {
   require('dotenv/config');
};

import Express from 'express';
import Cors from 'cors';
import Compression from 'compression';
import logger from '../infra/logger';
import responses from './responses';
import PublicRouter from './routes/public.router';
import validators from './validators';
import amqp from '../infra/amqp';
import { ttsQueue } from './constants';

init(); 

const port: Number = Number(process.env.PORT) || 3000;
const app: Express.Express = Express();

app.disable('x-powered-by');
app.use(Express.json());
app.use(Compression());
app.use(Cors({ origin: (process.env.NODE_ENV !== 'production' || !process.env.ALLOWED_ORIGINS) ? '*' : process.env.ALLOWED_ORIGINS }));

app.use('/', PublicRouter);

app.use((error: Error, _request: Express.Request, response: Express.Response, _next: Express.NextFunction): void => {
   logger.error(error.stack);

   if (error instanceof SyntaxError && 'body' in error) {
      return responses.UnprocessableEntityError(response);
   }

   return responses.InternalServerError(response);
});

app.listen(port, () => logger.log(`Running at ${port}.`));

async function init(){
   await validators.env.validateAsync({
      PORT: process.env.PORT,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
      NODE_ENV: process.env.NODE_ENV,
      REST_API_KEY: process.env.REST_API_KEY,
      AMQP_URL: process.env.AMQP_URL
   });

   await amqp.initialize();
   amqp.getChannel().assertQueue(ttsQueue, { durable: true })
}