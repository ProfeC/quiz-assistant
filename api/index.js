import express from 'express'
import fs from 'fs'
import path from 'path'

import fileList from '../app/data/file-list'
import * as Utils from '../app/libs/utils'

const router = express.Router();
const data_dir = path.join(__dirname, '..', 'app', 'data')

let wordList = [];
let category = null;
let categoryList = null;

router.get('/words/:listID', (req, res) => {
    // res.send(req.params);
    let wordDataPath = path.join(data_dir, req.params.listID) + '.json'
    // console.info('Path => ' + wordDataPath)

    fs.readFile(wordDataPath, 'utf8', (err, data) => {
        // let wordData =
        if (err) {
            return console.error(err)
        }
        // console.info(data)

        res.send(JSON.parse(data))
    })

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
