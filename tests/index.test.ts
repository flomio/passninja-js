import moxios from 'moxios';
import {PassNinjaClient} from '../src/index';
import {SimplePassObject} from '../src/types/general';
import {PassNinjaInvalidArgumentsException} from '../src/types/exceptions';
import passTypesKeysFixture from './fixtures/passTypesKeys.json';
import createPassFixture from './fixtures/createPass.json';
import getPassFixture from './fixtures/getPass.json';
import putPassFixture from './fixtures/putPass.json';

describe('PassNinjaClient', () => {
  let testClient: PassNinjaClient;
  const dummyAccountId = 'dummy-account-id';
  const dummyApiKey = 'dummy-api-key';
  let createdPassObject: SimplePassObject;

  test('constructer without accountId and apiKey throws an exception.', () => {
    expect(
      () => new PassNinjaClient(undefined as any, undefined as any)
    ).toThrow(PassNinjaInvalidArgumentsException);
  });

  test('constructer with accountId and apiKey runs without exception.', () => {
    testClient = new PassNinjaClient(dummyAccountId, dummyApiKey);
    expect(testClient).toBeInstanceOf(PassNinjaClient);
  });

  test('createPass without passType throws an exception.', async () => {
    expect.assertions(1);
    return expect(
      testClient.pass.create(undefined as any, undefined as any)
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  test('createPass with passType but with invalid clientPassData keys throws an exception.', () => {
    expect.assertions(1);
    return expect(
      testClient.pass.create('demo.coupon', {firstName: null as any})
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  beforeAll(() => moxios.install());
  afterAll(() => moxios.uninstall());

  test('createPass with passType but with missing clientPassData keys throws an exception.', () => {
    expect.assertions(1);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: passTypesKeysFixture});
    });
    return expect(
      testClient.pass.create('demo.coupon', {
        barcode: '12345',
        description: 'This is a test description.',
      })
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  test('createPass with valid passType and valid clientPassData runs successfully.', async () => {
    const passType = 'demo.coupon';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: passTypesKeysFixture});
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: createPassFixture});
    });
    createdPassObject = await testClient.pass.create(passType, {
      logoText: 'Example Loyalty',
      organizationName: 'My org',
      description: 'This is a loyalty card',
      expiration: '2025-12-01T23:59:59Z',
      memberName: 'Tasio Victoria',
      specialOffer: 'Free Drinks at 4:30PM!',
      loyaltyLevel: 'level one',
      barcode: 'www.google.com',
    });
    expect(createdPassObject.url).toBe(createPassFixture.urls.landing);
    expect(createdPassObject.serialNumber).toBe(createPassFixture.serialNumber);
  });

  test('getPass without passType or serialNumber throws an exception.', () => {
    expect.assertions(1);
    return expect(
      testClient.pass.get(undefined as any, undefined as any)
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  test('getPass with passType and serialNumber runs successfully.', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: getPassFixture});
    });
    const getPassResponse = await testClient.pass.get(
      createdPassObject.passType,
      createdPassObject.serialNumber
    );
    expect(getPassResponse.serialNumber).toBe(createdPassObject.serialNumber);
  });

  test('putPass without passType or serialNumber throws an exception.', () => {
    expect.assertions(1);
    return expect(
      testClient.pass.put(undefined as any, undefined as any, {})
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  test('putPass with serialNumber and clientStatsData runs successfully.', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: putPassFixture});
    });
    const putPassResponse: any = await testClient.pass.put(
      createdPassObject.passType,
      createdPassObject.serialNumber,
      {
        logoText: 'Put Example Loyalty',
        organizationName: 'Put my org',
        description: 'Put this is a loyalty card',
        expiration: '2025-12-01T23:59:59Z',
        memberName: 'Put Victoria',
        specialOffer: 'Put Free Drinks at 4:30PM!',
        loyaltyLevel: 'put level one',
        barcode: 'www.put.com',
      }
    );
    expect(putPassResponse.serialNumber).toBe(createdPassObject.serialNumber);
  });

  test('deletePass without serialNumber or passType throws an exception.', () => {
    expect.assertions(1);
    return expect(
      testClient.pass.delete(undefined as any, undefined as any)
    ).rejects.toBeInstanceOf(PassNinjaInvalidArgumentsException);
  });

  test('deletePass with serialNumber runs successfully.', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: {}});
    });
    await expect(
      testClient.pass.delete(
        createdPassObject.passType,
        createdPassObject.serialNumber
      )
    ).resolves.not.toThrow();
  });
});
