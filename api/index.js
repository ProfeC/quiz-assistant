import express from 'express';
import fileList from '../app/data/file-list';
import * as Utils from '../app/libs/utils';

const router = express.Router();
let wordList = [];
let category = null;
let categoryList = null;

router.get('/words/:listID', (req, res) => {
    // res.send(req.params);

    wordList = Utils.getList(req.params.listID)

    res.send({ 'wordList': wordList });
});

// NOTE: Get JSON data from files
router.get('/files/:category?', (req, res) => {
    if ( req.params.category !== undefined ) {
        let filtered = fileList.files.filter( (file) => {
            return file.category == req.params.category;
        } )

        res.send({'files': filtered});
    } else {
        res.send(fileList);
    }
});

export default router;
