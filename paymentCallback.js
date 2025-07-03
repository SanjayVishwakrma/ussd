const express = require('express');
const router = express.Router();

router.post('/payment-callback', (req, res) => {
  const {
    transactionId,
    status,
    phoneNumber,
    amount,
    provider,
    providerRefId,
    description
  } = req.body;

  console.log("📩 Payment Callback Received:", req.body);
  console.log({ transactionId, status, phoneNumber, amount, provider });

  // Here you could save to DB or mark ticket "paid"
  res.sendStatus(200);
});

module.exports = router;
