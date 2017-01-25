import express from 'express'
import fs from 'fs'
import path from 'path'
import quizList from '../app/data/quizzes'

const router = express.Router()
const data_dir = path.join(__dirname, '..', 'app', 'data')

let category = null
let categoryList = null

// NOTE: Get specific quiz data for the requested quiz.
router.get(['/quiz/:quizID'], (req, res) => {
    // res.send(req.params);
    let quizDataPath = path.join(data_dir, req.params.quizID) + '.json'
    console.info('Path => ' + quizDataPath)

    fs.readFile(quizDataPath, 'utf8', (err, data) => {
        // let quizData =
        if (err) {
            return console.error(err)
        }
        // console.info(data)

        res.send(JSON.parse(data))
    })

});

// NOTE: Get list of quizzes from the JSON data file
router.get('/quizzes/:category?', (req, res) => {
    // console.info(req.params.category)

    if ( req.params.category !== undefined ) {
        let filtered = quizList.quizzes.filter( (quiz) => {
            return quiz.category == req.params.category;
        } )

        res.send({'quizzes': filtered});
    } else {
        res.send(quizList);
    }
});


// NOTE: Testing.....
router.get('/test', (req, res) => {
    const objQuizList = quizList.quizzes.reduce((obj, quiz) => {
        obj[quiz.id] = quiz
        return obj
    }, {})
    console.info('quiz list  object => ' + objQuizList)

    res.send(objQuizList);
});

export default router;
