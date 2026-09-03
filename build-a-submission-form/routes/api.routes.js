import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('API is available!');
});

router.get('/crash', (req, res, next) => {
    const error = new Error('Database connection failed.');
    next(error);
});

router.get('/bad-request', (req, res, next) => {
    const error = new Error('Client-side data is missing.');
    error.status = 400;
    next(error);
});

export default router;