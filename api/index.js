import express from 'express';
import * as Utils from '../app/libs/utils';

const router = express.Router();
let wordList = [];

router.get('/words/:listID', (req, res) => {
    // res.send(req.params);

    wordList = Utils.getList(req.params.listID)

	res.send({ 'wordList': wordList });
});

export default router;
