const express = require('express');
const bodyParser = require('body-parser');
const { processUSSDRequest } = require('./lotteryEngine')
const paymentCallback = require('./paymentCallback');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', paymentCallback);


app.post('/ussd', (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;
  console.log('111111111111--------', req.body)
  
  const response = processUSSDRequest(sessionId, phoneNumber, text);
  console.log('222222222222--------', response)
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ USSD demo server running on http://localhost:${PORT}/ussd`));