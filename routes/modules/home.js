const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');

function formatDate(date) {
  return (formattedDate = new Intl.DateTimeFormat('zh-Hans').format(date));
}

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean().sort({ date: 'desc' });
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
    const categoryTotals = {};
    for (const record of formattedRecords) {
      const { amount, category } = record;
      if (categoryTotals[category.name]) {
        categoryTotals[category.name] += amount;
      } else {
        categoryTotals[category.name] = amount;
      }
    }
    // Initialize totals for any categories with no records
    for (const category of categories) {
      if (!categoryTotals[category.name]) {
        categoryTotals[category.name] = 0;
      }
    }
    if (formattedRecords) {
      const stringifiedData = JSON.stringify(categoryTotals);
      res.render('index', {
        records: formattedRecords,
        totalExpense,
        stringifiedData,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
