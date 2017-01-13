import express from 'express';
import * as Utils from '../app/libs/utils';

const router = express.Router();
let wordList = [];
let fileList = [];
let category = null;
let categoryList = null;

router.get('/words/:listID', (req, res) => {
    // res.send(req.params);

    wordList = Utils.getList(req.params.listID)

    res.send({ 'wordList': wordList });
});

// NOTE: Get JSON data from files
router.get('/files/:source/:category?', (req, res) => {
    // console.info(req.params);

    fileList = Utils.getList(req.params.source)
    // console.info(fileList);

    if (req.params.category !== undefined) {
        // console.info(req.params.category)
        categoryList = 'fileList.' + `${req.params.category}`
        // console.info(categoryList);
        // console.info(eval(categoryList));
        res.send({ 'category': fileList[`${req.params.category}`] });
    } else {
        // console.info(fileList)
        res.send({ 'all': fileList });
    }
});

export default router;
