const express = require('express');
const router = express.Router();
const {
  getAllRecords,
  getRecordsByCategory,
} = require('../../controllers/record-controller');

router.get('/', getAllRecords);
router.get('/category/:category_id', getRecordsByCategory);

module.exports = router;
