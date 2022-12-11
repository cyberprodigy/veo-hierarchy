import express, { Request, Response } from 'express';

import { dbMock } from '../db/dbMock';

const router = express.Router();

router.post('/createNode', async (req: Request, res: Response) => {
  const {name, parentId} = req.body;
  const newNode = await dbMock.createNode({name}, parentId)
  res.send(newNode);
});



export default function () {
  return router;
}
