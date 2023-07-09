const Category = require('../models/category');
const Record = require('../models/record');

async function getAllRecords(req, res) {
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
}

async function getRecordsByCategory(req, res) {
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
}

async function getNewPage(req, res) {
  try {
    const categories = await Category.find().lean();
    res.render('new', { categories });
  } catch (err) {
    console.log(err);
  }
}

// todo add error handling
async function addNewRecord(req, res) {
  const userId = req.user._id;
  return Record.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
}

async function getEditPage(req, res) {
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
}

async function editRecord(req, res) {
  const userId = req.user._id;
  const _id = req.params.record_id;
  return await Record.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error));
}

async function deleteRecord(req, res) {
  const userId = req.user._id;
  const _id = req.params.record_id;
  return await Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
}

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

module.exports = {
  getAllRecords,
  getRecordsByCategory,
  getNewPage,
  addNewRecord,
  getEditPage,
  editRecord,
  deleteRecord,
};
