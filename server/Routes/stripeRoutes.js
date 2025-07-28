
const express = require('express');

const createCheckoutSession = require('../controllers/stripeController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();





router.post("/create-checkout-session",[authenticate],createCheckoutSession);

module.exports=router;