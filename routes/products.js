import { Router } from 'express';

const router = Router();

router.get('/api/products', (req, res) => {
	if (req.cookies.hello && req.cookies.hello === 'world')
		return res.send([{ id: 123, name: 'chicken breast', price: 12.99 }]);

	return res
		.status(403)
		.send({ msg: 'Sorry. You need the correct cookie' });
});

export default router;
