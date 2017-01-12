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

// NOTE: Get file categories
router.get('/files/:source/:category?', (req, res) => {
  // console.info(req.params);

  fileList = Utils.getList(req.params.source)
  console.info(fileList);

  if (req.params.category !== undefined) {
    categoryList = 'fileList.' + eval(req.params.category)
    // console.info(categoryList);
    console.info(eval(categoryList));
    res.send({ category: eval(categoryList) });
  } else {
    // console.info(fileList)
    res.send({ 'navigation': fileList });
  }
});

export default router;
