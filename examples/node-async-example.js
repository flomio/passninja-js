// TODO: This should be an NPM package import after publishing.
const {PassNinjaClient} = require('@flomio/passninja-js');

// Check https://passninja.com/auth/profile for your credentials
// The below are demo user credentials
const accountId = '3a6bc54c-78be-4d63-b804-3164597cae4c';
const apiKey = 'lw9BrOkj4O9owCzuwZXzC3kGdAXg8SN01yYmxIGf';

const passninja = new PassNinjaClient(accountId, apiKey);

(async () => {
  let myPass;
  myPass = await passninja.pass.create({
    passType: 'demo.coupon',
    pass: {
      discount: '100%',
      memberName: 'Auston',
    },
  });
  console.log(JSON.stringify(myPass, 0, 2));

  myPass.pass.discount = '50%';
  myPass = await passninja.pass.put(
    {pass: myPass.pass},
    myPass.passType,
    myPass.serialNumber
  );
  console.log(JSON.stringify(myPass, 0, 2));

  myPass = await passninja.pass.get(myPass.passType, myPass.serialNumber);
  console.log(JSON.stringify(myPass, 0, 2));
})();
