import bodyparser from 'body-parser';
import 'dotenv/config';
import express from 'express';

import createNode from './middlewares/createNode';
import getAllEdges from './middlewares/getAllEdges';
import getAllNodes from './middlewares/getAllNodes';
import healthCheck from './middlewares/healthCheck';
import readinessCheck from './middlewares/readinessCheck';
import configureCors from './middlewares/configureCors';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = express();
  app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );

  app
    .use(configureCors)
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
