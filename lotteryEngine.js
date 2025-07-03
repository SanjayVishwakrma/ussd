const { initiatePayment } = require('./payment');


const sessions = {};

async function processUSSDRequest(sessionId, phoneNumber, text) {
  let response = '';
  const input = text.trim() === '' ? [] : text.split('*');
  console.log("input---------",input);
  
  const step = input.length;
  console.log("step---------", step);

  console.log("xxxxx", sessionId, phoneNumber, text);
  

  switch (step) {
    case 0:
      response = `CON Welcome to LuckyDraw!
      1. Buy Ticket
      2. View Result
      3. Help`;
      break;

    case 1:
      if (input[0] === '1') {
        const ticket = Math.floor(100000 + Math.random() * 900000); // 6-digit ticket
        sessions[sessionId] = { phoneNumber, ticket };

        const payment = await initiatePayment(phoneNumber, 10); // 10 KES

        if (payment.success) {
          response = `END 🎟️ Ticket #${ticket} booked!
          Payment request sent. Approve it on your phone.
          Draw at 9 PM. Good luck!`;
        } else {
          response = `END ❌ Payment failed: ${payment.error}`;
        }

        response = `END 🎟️ Ticket #${ticket} booked!
                    Draw at 9 PM.
                    Good luck!`;
      } 
      else if (input[0] === '2') {
        const ticketInfo = sessions[sessionId];
        if (ticketInfo) {
          const won = ticketInfo.ticket % 2 === 0;
          response = `END 📄 Ticket #${ticketInfo.ticket}
                      Result: ${won ? '🎉 You WON!' : '🙁 Not a winner'}
                      Thanks for playing!`;
        } else {
          response = `END No ticket found for this session.
                      Please buy one first.`;
        }
      } 
      else {
        response = `END ☎️ Call 1800-123-HELP for assistance.`;
      }
      break;

    default:
      response = `END ❌ Invalid input. Please start again.`;
  }

  return response;
}

module.exports = { processUSSDRequest };
