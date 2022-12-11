import express, { Request, Response } from 'express';

import { dbMock } from '../db/dbMock';

const router = express.Router();

router.get('/getAllEdges', async (req: Request, res: Response) => {
  const edges = await dbMock.getAllEdges();
  res.send(JSON.stringify(edges));
});

export default function () {
  return router;
}
