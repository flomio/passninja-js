import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {ClientPassData, SimplePassObject} from './types/general';
import {PassNinjaInvalidArgumentsException} from './types/exceptions';
import {isString} from './types/typeUtils';

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/v1';

export class PassNinjaClient {
  #basePath = PASSNINJA_BASE_PATH;
  #axiosClient: AxiosInstance;
  pass: Record<string, any> = {};

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
    this.#initializeInterceptors();
    this.#initBindings();
  }

  #initializeInterceptors = (): void => {
    this.#axiosClient.interceptors.response.use(
      this.#handleResponse,
      this.#handleError
    );
  };

  #initBindings = (): void => {
    this.pass.create = this.#createPass.bind(this);
    this.pass.get = this.#getPass.bind(this);
    this.pass.put = this.#putPass.bind(this);
    this.pass.delete = this.#deletePass.bind(this);
  };

  #handleResponse = ({data}: AxiosResponse): AxiosResponse<any> => data;

  #handleError = (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error);

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

  #createPass = (
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
    return this.#axiosClient
      .post('/passes', {
        passType,
        pass: clientPassData,
      })
      .then(
        (data: any): SimplePassObject => ({
          url: data.urls.landing,
          serialNumber: data.serialNumber,
          passType: data.passType,
        })
      );
  };

  #getPass = (passType: string, serialNumber: string): Promise<any> => {
    if (!isString(passType) || !isString(serialNumber)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both passType and serialNumber to PassNinjaClient.getPass method. PassNinjaClient.getPass(passType: string, serialNumber: string)'
      );
    }
    return this.#axiosClient.get(
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`
    );
  };

  #putPass = (
    passType: string,
    serialNumber: string,
    clientPassData: ClientPassData
  ): Promise<AxiosResponse<any>> => {
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
    return this.#axiosClient.put(
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`,
      {
        passType,
        pass: clientPassData,
      }
    );
  };

  #deletePass = (
    passType: string,
    serialNumber: string
  ): Promise<AxiosResponse<any>> => {
    if (!isString(passType) || !isString(serialNumber)) {
      throw new PassNinjaInvalidArgumentsException(
        'Must provide both passType and serialNumber to PassNinjaClient.deletePass method. PassNinjaClient.deletePass(passType: string, serialNumber: string)'
      );
    }
    return this.#axiosClient
      .delete(
        `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
          serialNumber
        )}`
      )
      .then((): any => serialNumber);
  };
}
