const express = require('express');
const { createOrder, capturePayment, geAllOrdersByUser, getOrderDetails } = require('../../controllers/shop/order-controller')
const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId', geAllOrdersByUser);
router.get('/details/:id', getOrderDetails);

module.exports = router;