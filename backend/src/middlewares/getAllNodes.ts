import express, { Request, Response } from 'express';

import { dbMock } from '../db/dbMock';

const router = express.Router();

router.get('/getAllNodes', async (req: Request, res: Response) => {
  const nodes = await dbMock.getAllNodes();
  res.send(JSON.stringify(nodes));
});

export default function () {
  return router;
}
