const express = require('express');
const fs = require('fs');
const path = require('path');
const quizList = require(path.resolve('app', 'data','quizzes'));

const router = express.Router()
const data_dir = path.join(__dirname, '..', '..', 'app', 'data')
console.info('Data Directory =>', data_dir);

let category = null
let categoryList = null

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

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
    console.info(req.params.category)

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
  console.info('Testing => ', req);
    const objQuizList = quizList.quizzes.reduce((obj, quiz) => {
        obj[quiz.id] = quiz
        return obj
    }, {})
    console.info('quiz list  object => ' + objQuizList)

    res.send(objQuizList);
});

module.exports = function () {
  return router;
}
