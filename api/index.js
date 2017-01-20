import express from 'express'
import fs from 'fs'
import path from 'path'

import quizList from '../app/data/quizzes'
// import * as Utils from '../app/libs/utils'

const router = express.Router();
const data_dir = path.join(__dirname, '..', 'app', 'data')

let category = null;
let categoryList = null;

router.get(['/quiz/:quizID', '/quizzes/:quizID'], (req, res) => {
    // res.send(req.params);
    let quizDataPath = path.join(data_dir, req.params.quizID) + '.json'
    // console.info('Path => ' + quizDataPath)

    fs.readFile(quizDataPath, 'utf8', (err, data) => {
        // let quizData =
        if (err) {
            return console.error(err)
        }
        // console.info(data)

        res.send(JSON.parse(data))
    })

});

// NOTE: Get JSON data from files
router.get('/quizzes/:category?', (req, res) => {
    if ( req.params.category !== undefined ) {
        let filtered = quizList.quizzes.filter( (quiz) => {
            return quiz.category == req.params.category;
        } )

        res.send({'quizzes': filtered});
    } else {
        res.send(quizList);
    }
});

export default router;
