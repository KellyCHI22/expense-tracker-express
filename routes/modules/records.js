const express = require('express');
const router = express.Router();
const Category = require('../../models/category');

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render('new', { categories });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:record_id/edit', (req, res) => {
  res.render('edit');
});

module.exports = router;
