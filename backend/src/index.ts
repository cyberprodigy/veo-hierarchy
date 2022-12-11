import 'dotenv/config';
import bodyparser from 'body-parser';
import express from 'express';

import healthCheck from './middlewares/healthCheck';
import createNode from './middlewares/createNode';
import readinessCheck from './middlewares/readinessCheck';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = express();
  app.use(
    bodyparser.urlencoded({
      extended: true,
    })
  );
  app
    .use(healthCheck())
    .use(readinessCheck())
    .use(createNode());

  app.listen(PORT);

  process.on('uncaughtException', (error) => {
    console.log('Unhandled NODE exception', error);
  });

  console.log(
    `Running a backend server at http://localhost:${PORT}`,
    {}
  );
}

bootstrap();
