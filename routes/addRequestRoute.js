const express = require('express');
const router = express.Router();
const AddRequestController = require('../controllers/addRequestController');

// GET route สำหรับแสดงหน้าฟอร์มเพิ่มคำขอซ่อม
router.get('/add_request', AddRequestController.showAddRequestForm);

// POST route สำหรับส่งข้อมูลฟอร์มเพิ่มคำขอซ่อม
router.post('/add_request', AddRequestController.submitAddRequest);

module.exports = router;