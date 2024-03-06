import axios, {AxiosInstance} from 'axios';
import {
  ClientPassData,
  PassNinjaResponse,
  SimplePassObject,
  PassTemplateObject,
} from './types/general';
import {PassNinjaInvalidArgumentsException} from './types/exceptions';
import {isString} from './types/typeUtils';

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/v1';

export class PassNinjaClient {
  #basePath = PASSNINJA_BASE_PATH;
  #axiosClient: AxiosInstance;
  pass: Record<string, any> = {};
  passTemplate: Record<string, any> = {};

  constructor(accountId: string, apiKey: string) {
    if (!isString(accountId) || !isString(apiKey)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both accountId and apiKey to PassNinjaClient constructor. PassNinjaClient(accountId: string, apiKey: string)'
      );
    }
    this.#axiosClient = axios.create({
      baseURL: this.#basePath,
      headers: {
        'content-type': 'application/json',
        'x-account-id': accountId,
        'x-api-key': apiKey,
      },
    });
    this.#initBindings();
  }

  #initBindings = (): void => {
    this.pass.create = this.#createPass.bind(this);
    this.pass.get = this.#getPass.bind(this);
    this.pass.put = this.#putPass.bind(this);
    this.pass.delete = this.#deletePass.bind(this);
    this.pass.find = this.#findPasses.bind(this);
    this.pass.decrypt = this.#decryptPass.bind(this);
    this.passTemplate.find = this.#findPassTemplate.bind(this);
  };

  #extractInvalidKeys = (
    clientPassData: ClientPassData
  ): Record<string, string> =>
    Object.keys(clientPassData).reduce(
      (accum: Record<string, string>, key: string) => {
        if (!isString(clientPassData[key])) {
          accum[key] = clientPassData[key];
        }
        return accum;
      },
      {}
    );

  #fetchRequiredKeysSet = async (passType: string): Promise<Set<string>> => {
    const passTypeKeysResponse = await this.#axiosClient.get<PassNinjaResponse>(
      `/passtypes/keys/${passType}`
    );
    return new Set(passTypeKeysResponse.data.keys);
  };

  #extractMissingRequiredKeys = async (
    passType: string,
    clientPassData: ClientPassData
  ): Promise<string[]> => {
    const requiredKeysSet = await this.#fetchRequiredKeysSet(passType);
    Object.keys(clientPassData).forEach((key) => requiredKeysSet.delete(key));
    return Array.from(requiredKeysSet);
  };

  #findPassTemplate = async (
    passTemplateId: string,
  ): Promise<PassTemplateObject> => {
    if (!isString(passTemplateId)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide passTemplateId to PassNinjaClient.findPassTemplate method. PassNinjaClient.findPassTemplate(passTemplateId: string)'
      );
    }
    const axiosResponseData = await this.#axiosClient
      .get(
        `/pass_templates/${encodeURIComponent(passTemplateId)}`
      )
      .then((axiosResponse) => axiosResponse.data);
    return axiosResponseData;
  };

  #createPass = async (
    passType: string,
    clientPassData: ClientPassData
  ): Promise<SimplePassObject> => {
    if (!isString(passType)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide passType to PassNinjaClient.createPass method. PassNinjaClient.createPass(passType: string, clientPassData: ClientPassData)'
      );
    }
    const invalidKeys = this.#extractInvalidKeys(clientPassData);
    if (Object.keys(invalidKeys).length !== 0) {
      throw new PassNinjaInvalidArgumentsException(
        `Invalid templateStrings provided in clientPassData object. Invalid keys: ${JSON.stringify(
          invalidKeys
        )}`
      );
    }
    const missingRequiredKeys = await this.#extractMissingRequiredKeys(
      passType,
      clientPassData
    );
    if (Object.keys(missingRequiredKeys).length !== 0) {
      throw new PassNinjaInvalidArgumentsException(
        `Some keys that are required for this passType are missing on the provided clientPassData object. Missing keys: ${JSON.stringify(
          missingRequiredKeys
        )}`
      );
    }
    const axiosResponseData = await this.#axiosClient
      .post('/passes', {
        passType,
        pass: clientPassData,
      })
      .then((axiosResponse) => axiosResponse.data);
    return {
      url: axiosResponseData.urls.landing,
      serialNumber: axiosResponseData.serialNumber,
      passType: axiosResponseData.passType,
    };
  };

  #getPass = async (
    passType: string,
    serialNumber: string
  ): Promise<PassNinjaResponse> => {
    if (!isString(passType) || !isString(serialNumber)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both passType and serialNumber to PassNinjaClient.getPass method. PassNinjaClient.getPass(passType: string, serialNumber: string)'
      );
    }
    const axiosResponseData = await this.#axiosClient
      .get(
        `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
          serialNumber
        )}`
      )
      .then((axiosResponse) => axiosResponse.data);
    return axiosResponseData;
  };

  #putPass = async (
    passType: string,
    serialNumber: string,
    clientPassData: ClientPassData
  ): Promise<PassNinjaResponse> => {
    if (!isString(passType) || !isString(serialNumber)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both passType and serialNumber to PassNinjaClient.putPass method. PassNinjaClient.putPass(passType: string, serialNumber: string, clientPassData: ClientPassData)'
      );
    }
    const invalidKeys = this.#extractInvalidKeys(clientPassData);
    if (Object.keys(invalidKeys).length !== 0) {
      throw new PassNinjaInvalidArgumentsException(
        `Invalid templateStrings provided in clientPassData object. Invalid keys: ${JSON.stringify(
          invalidKeys
        )}`
      );
    }
    const axiosResponseData = this.#axiosClient
      .put(
        `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
          serialNumber
        )}`,
        {
          passType,
          pass: clientPassData,
        }
      )
      .then((axiosResponse) => axiosResponse.data);
    return axiosResponseData;
  };

  #deletePass = async (
    passType: string,
    serialNumber: string
  ): Promise<PassNinjaResponse> => {
    if (!isString(passType) || !isString(serialNumber)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both passType and serialNumber to PassNinjaClient.deletePass method. PassNinjaClient.deletePass(passType: string, serialNumber: string)'
      );
    }
    const axiosResponseData = this.#axiosClient
      .delete(
        `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
          serialNumber
        )}`
      )
      .then((): any => serialNumber);
    return axiosResponseData;
  };

  #findPasses = async (passType: string): Promise<PassNinjaResponse[]> => {
    if (!isString(passType)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide passType to PassNinjaClient.find method. PassNinjaClient.find(passType: string)'
      );
    }
    const axiosResponseData = this.#axiosClient
      .get(`/passes/${encodeURIComponent(passType)}`)
      .then((axiosResponse) => axiosResponse.data.passes);
    return axiosResponseData;
  };

  #decryptPass = async (passType: string, payload: string): Promise<PassNinjaResponse> => {
    if (!isString(passType) || !isString(payload)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide passType and payload to PassNinjaClient.decrypt method. PassNinjaClient.decrypt(passType: string, payload: string)'
      );
    }
    const axiosResponseData = this.#axiosClient
      .post(`/passes/${encodeURIComponent(passType)}/decrypt`, {
        payload
      })
     .then((axiosResponse) => axiosResponse.data);
    return axiosResponseData;
  };
}
