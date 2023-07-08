const express = require('express');
const router = express.Router();
const Category = require('../../models/category');
const Record = require('../../models/record');

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render('new', { categories });
  } catch (err) {
    console.log(err);
  }
});

router.post('/new', async (req, res) => {
  const userId = req.user._id;
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

router.get('/:record_id/edit', async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.record_id;
  const categories = await Category.find().lean();
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      const categoriesWithSelected = categories.map((category) => {
        if (category._id.toString() === record.categoryId.toString()) {
          return {
            ...category,
            selected: true,
          };
        } else {
          return {
            ...category,
            selected: false,
          };
        }
      });
      res.render('edit', {
        record: {
          ...record,
          date: record.date.toISOString().slice(0, 10),
        },
        categories: categoriesWithSelected,
      });
    })
    .catch((error) => console.log(error));
});

router.delete('/:record_id', async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.record_id;
  return Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

module.exports = router;
