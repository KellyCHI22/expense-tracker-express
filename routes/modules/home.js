const express = require('express');
const router = express.Router();
const Record = require('../../models/record');
const Category = require('../../models/category');
const category = require('../../models/category');

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean().sort({ date: 'desc' });
    const categories = await Category.find().lean();
    const totalExpense = getTotalExpense(records);
    const formattedRecords = formatRecords(records, categories);
    const categoryTotals = getCategoryTotal(formattedRecords, categories);
    if (formattedRecords) {
      const stringifiedData = JSON.stringify(categoryTotals);
      res.render('index', {
        records: formattedRecords,
        categories,
        totalExpense,
        stringifiedData,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/category/:category_id', async (req, res) => {
  try {
    const userId = req.user._id;
    const category_id = req.params.category_id;
    const records = await Record.find({ userId, categoryId: category_id })
      .lean()
      .sort({ date: 'desc' });
    const categories = await Category.find().lean();
    const currentCategory = categories.filter(
      (category) => category._id.toString() === category_id.toString()
    );
    const totalExpense = getTotalExpense(records);
    const formattedRecords = formatRecords(records, categories);
    const categoryTotals = getCategoryTotal(formattedRecords, categories);
    if (formattedRecords) {
      const stringifiedData = JSON.stringify(categoryTotals);
      res.render('index', {
        records: formattedRecords,
        categories,
        totalExpense,
        stringifiedData,
        currentCategory: currentCategory[0].name,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// calculate total expense of each category
function getCategoryTotal(records, categories) {
  const categoryTotals = {};
  for (const record of records) {
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
  return categoryTotals;
}

function getTotalExpense(records) {
  return records.reduce((total, record) => record.amount + total, 0);
}

function formatDate(date) {
  return (formattedDate = new Intl.DateTimeFormat('zh-Hans').format(date));
}

// format date and add category object to category
function formatRecords(records, categories) {
  return records.map((record) => {
    return {
      ...record,
      date: formatDate(record.date),
      category: categories.find(
        (el) => String(el._id) === String(record.categoryId)
      ),
    };
  });
}
