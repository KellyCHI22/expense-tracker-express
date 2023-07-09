const express = require('express');
const router = express.Router();
const {
  getNewPage,
  addNewRecord,
  getEditPage,
  editRecord,
  deleteRecord,
} = require('../../controllers/record-controller');

router.get('/new', getNewPage);
router.post('/new', addNewRecord);
router.get('/:record_id/edit', getEditPage);
router.put('/:record_id/edit', editRecord);
router.delete('/:record_id', deleteRecord);

module.exports = router;
