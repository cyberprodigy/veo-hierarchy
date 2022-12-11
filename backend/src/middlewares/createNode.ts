import express, { Request, Response } from 'express';

import { dbMock } from '../db/dbMock';

const router = express.Router();

router.post('/createNode', async (req: Request, res: Response) => {
  const newNode = await dbMock.createNode({name: "CEO"}, 1)
  res.send(newNode);
});



export default function () {
  return router;
}
