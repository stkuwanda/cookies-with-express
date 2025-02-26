import { Router } from 'express';
import productsRouter from './products.js';

const router = Router();

// routes
router.use(productsRouter);

router.get('/api', (req, res) => {
  res.cookie('hello', 'world', { maxAge: 60000 * 60 });
  res.status(201).send({msg: 'OK'});
})

export default router;