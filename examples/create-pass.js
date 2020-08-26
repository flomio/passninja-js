// TODO: This should be an NPM package import after publishing.
const {PassNinjaClient} = require('../dist/passninja.js');

// Check https://passninja.com/auth/profile for your credentials
// The below are demo user credentials
const accountId = '3a6bc54c-78be-4d63-b804-3164597cae4c';
const apiKey = 'lw9BrOkj4O9owCzuwZXzC3kGdAXg8SN01yYmxIGf';

const passNinjaClient = new PassNinjaClient(accountId, apiKey);

passNinjaClient.pass
  .create({
    passType: 'demo.coupon',
    pass: {
      discount: '100%',
      memberName: 'Auston',
    },
    expires: new Date(2020, 09, 12),
  })
  .then((data) => {
    console.log(JSON.stringify(data, 0, 2));
  })
  .catch((err) => console.log(JSON.stringify(err, 0, 2)));
