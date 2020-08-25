const Client = require('../dist/passninja.js');

// Check https://passninja.com/auth/profile for your credentials
// The below are demo user credentials
const accountId = '3a6bc54c-78be-4d63-b804-3164597cae4c';
const apiKey = 'lw9BrOkj4O9owCzuwZXzC3kGdAXg8SN01yYmxIGf';

passNinjaClient = new Client(accountId, apiKey);

passNinjaClient.pass
  .create({
    passType: 'demo.coupon',
    pass: {
      discount: '100%',
      memberName: 'Auston',
    },
    expires: new Date(2020, 09, 12),
  })
  .then(({body}) => {
    console.log(JSON.stringify(body, 0, 2));
  })
  .catch((err) => console.log(JSON.stringify(err.body.message, 0, 2)));
