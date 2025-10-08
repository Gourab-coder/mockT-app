const express = require('express');
const { postEnquiry, putEnquiryScore, getEnquiry, deleteEnquiry, getUserData } = require('../controllers/enquiry_f');
const ensureAuthenticated = require('../middleware/auth');

const router = express.Router();

router.post('/test-creation', ensureAuthenticated, postEnquiry);
router.put('/test-score', putEnquiryScore);
router.get('/test/:testId', getEnquiry); // This route is for fetching a specific test
router.get('/user-data', ensureAuthenticated, getUserData);
router.delete('/delete-test/:testId', ensureAuthenticated, deleteEnquiry);



module.exports = router;