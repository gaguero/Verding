import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'MCP endpoint - to be implemented' });
});

export default router; 
