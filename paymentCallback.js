const express = require("express");
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


// ✅ /valid route with required response
router.get('/valid', (req, res) => {
  // You can add validation checks here if needed
  res.status(200).json({
    status: "Validated"
  });
});


// module.exports = router;



// 🔐 Authentication credentials
const credentials = {
  apiKey: "Te7zXfg0f",
  username: "sandbox" // Use 'sandbox' for testing
};

// Require the AT package
const AfricasTalking = require("africastalking")(credentials);

const airtime = AfricasTalking.AIRTIME;
// Send Airtime route
router.post("/", (req, res) => {
  const { options = {
            maxNumRetry: 3, // Will retry the transaction every 60seconds for the next 3 hours.
            recipients: [{
                phoneNumber: "+27665773560",
                currencyCode: "KES",
                amount: "5"
            }] 
          }
        } = req.body || res.status(400).json({error: "Both 'maxNumRetry' and 'recipients details' are required"});

  airtime
    .send(options)
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.json(error.toString());
    });
});

// Create callback route
router.post("/status", async( req, res ) => {
  console.log(req.body);

  res.status(200).json({
      status: "success",
      message: "Airtime received successfully"
  })
});

module.exports = router;
