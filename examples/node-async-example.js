const {PassNinjaClient} = require('@passninja/passninja-js');

// Check https://passninja.com/auth/profile for your credentials
// The below are demo user credentials
const accountId = '**your-account-id**';
const apiKey = '**your-api-key**';

const passninja = new PassNinjaClient(accountId, apiKey);

(async () => {
  let myPass;
  myPass = await passninja.pass.create('demo.coupon', {
    discount: '50%',
    memberName: 'Auston',
  });
  console.log(JSON.stringify(myPass, 0, 2));

  const passInfo = await passninja.pass.get(
    myPass.passType,
    myPass.serialNumber
  );
  console.log(JSON.stringify(passInfo, 0, 2));

  myPass = await passninja.pass.put(myPass.passType, myPass.serialNumber, {
    discount: '100%',
    memberName: 'Ted',
  });
  console.log(JSON.stringify(myPass, 0, 2));

  deletedPassSerialNumber = await passninja.pass.delete(myPass.passType, myPass.serialNumber);
  console.log(`Pass deleted. serial_number: ${deletedPassSerialNumber}));
})();
