const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');

function formatDate(date) {
  return (formattedDate = new Intl.DateTimeFormat('zh-Hans').format(date));
}

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean().sort({ date: 'desc' });
    const categories = await Category.find().lean();
    const totalExpense = records.reduce(
      (total, record) => record.amount + total,
      0
    );
    const formattedRecords = records.map((record) => {
      return {
        ...record,
        date: formatDate(record.date),
        category: categories.find(
          (el) => String(el._id) === String(record.categoryId)
        ),
      };
    });
    if (formattedRecords) {
      res.render('index', { records: formattedRecords, totalExpense });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
