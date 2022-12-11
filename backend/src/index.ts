import 'dotenv/config';
import bodyparser from 'body-parser';
import express from 'express';

import healthCheck from './middlewares/healthCheck';
import createNode from './middlewares/createNode';
import readinessCheck from './middlewares/readinessCheck';
import getAllNodes from './middlewares/getAllNodes';
import getAllEdges from './middlewares/getAllEdges';
import cors from 'cors';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = express();
  app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );

  const allowedOrigins = ['http://localhost:3000'];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  app
    .use(healthCheck())
    .use(readinessCheck())
    .use(createNode())
    .use(getAllNodes())
    .use(getAllEdges());

  app.listen(PORT);

  process.on('uncaughtException', (error) => {
    console.log('Unhandled NODE exception', error);
  });

  console.log(`Running a backend server at http://localhost:${PORT}`, {});
}

bootstrap();
