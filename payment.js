const africastalking = require('./africastalking');

async function initiatePayment(phoneNumber, amount) {
  const payments = africastalking.PAYMENTS;

  const options = {
    productName: "MyProduct", // 🔁 Replace with your dashboard product
    phoneNumber: phoneNumber,
    currencyCode: "KES",
    amount: amount,
    metadata: {
      reason: "Lottery Ticket"
    }
  };

  try {
    const result = await payments.mobileCheckout(options);
    console.log("✅ Payment Initiated:", result);
    return { success: true, transactionId: result.transactionId };
  } catch (err) {
    console.error("❌ Payment Failed:", err);
    return { success: false, error: err.message };
  }
}

module.exports = { initiatePayment };
