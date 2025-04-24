import express from 'express';
import {
    getMonkeys,
    getMonkey,
    createMonkey,
    updateMonkey,
    deleteMonkey,
} from './controllers/monkeyController';

const router = express.Router();

router.route('/')
    .get(getMonkeys)
    .post(createMonkey);

router.route('/:id')
    .get(getMonkey)
    .put(updateMonkey)
    .delete(deleteMonkey);

export default router;