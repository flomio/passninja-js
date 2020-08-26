//  /// <reference types="passninja-js" />

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import {
  Authentication,
  VoidAuth,
  ApiKeyAuth,
  PassNinjaApiKeys,
  CreatePassRequest,
  PassResponse,
  PassResponseVerbose,
  PatchPassRequest,
  PutPassRequest,
} from './types';

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';

export class PassNinjaClient {
  pass: any = {};
  #api: AxiosInstance;
  #basePath = PASSNINJA_BASE_PATH;
  #defaultHeaders: any = {};
  #authentications = {
    default: <Authentication>new VoidAuth(),
    account_id: new ApiKeyAuth('header', 'x-account-id'),
    api_key: new ApiKeyAuth('header', 'x-api-key'),
  };

  constructor(accountId?: string, apiKey?: string) {
    if (apiKey && accountId) {
      this.setAuthentication(accountId, apiKey);
    }
    this.#api = axios.create({baseURL: this.#basePath});
    this.#initializeInterceptors();
    this.#initBindings();
  }

  #initializeInterceptors = (): void => {
    this.#api.interceptors.response.use(
      this.#handleResponse,
      this.#handleError
    );
    this.#api.interceptors.request.use(this.#handleRequest);
  };

  #initBindings = (): void => {
    this.pass.patch = this.patchPass.bind(this);
    this.pass.create = this.createPass.bind(this);
    this.pass.delete = this.deletePass.bind(this);
    this.pass.put = this.putPass.bind(this);
    this.pass.get = this.getPass.bind(this);
    this.pass.getVerbose = this.getPassVerbose.bind(this);
  };

  #handleRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    this.#authentications.account_id.applyToRequest(config);
    this.#authentications.api_key.applyToRequest(config);
    this.#authentications.default.applyToRequest(config);
    return config;
  };

  #request = (config: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    return this.#api.request(config);
  };

  #validateRequestArguments = <T>(
    requestArgs: {
      [key: string]: T;
    },
    callingFunction: string
  ): void => {
    Object.keys(requestArgs).forEach((argumentName: string) => {
      if (
        requestArgs[argumentName] === null ||
        requestArgs[argumentName] === undefined
      ) {
        throw new Error(
          `Required parameter ${argumentName} was null or undefined when calling ${callingFunction}.`
        );
      }
    });
  };

  #handleResponse = ({data}: AxiosResponse): AxiosResponse<any> => data;

  #handleError = (error: AxiosError): Promise<AxiosError> =>
    Promise.reject(error);

  setDefaultAuthentication(auth: Authentication): void {
    this.#authentications.default = auth;
  }

  setAuthentication(accountId: string, apiKey: string): void {
    this.setApiKey(PassNinjaApiKeys.api_key, apiKey);
    this.setApiKey(PassNinjaApiKeys.account_id, accountId);
  }

  setApiKey(key: PassNinjaApiKeys, value: string): void {
    (this.#authentications as any)[PassNinjaApiKeys[key]].apiKey = value;
  }

  #resolveHeaders = (options: any = {}): any => {
    const headers: any = (<any>Object).assign({}, this.#defaultHeaders);
    (<any>Object).assign(headers, options.headers);
    return headers;
  };

  /**
   *
   * @summary Create a new PassNinja pass
   * @param data The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */
  public createPass(
    data: CreatePassRequest,
    options: any = {}
  ): Promise<AxiosResponse<PassResponse>> {
    this.#validateRequestArguments({data}, 'createPass');
    const url = this.#basePath + '/passes';
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {method: 'POST', headers, url, data};

    return this.#request(config);
  }

  /**
   *
   * @summary Delete (archive) an existing PassNinja pass
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */
  public deletePass(
    passType: string,
    serialNumber: string,
    options: any = {}
  ): Promise<AxiosResponse<PassResponse>> {
    this.#validateRequestArguments({passType, serialNumber}, 'deletePass');
    const url =
      this.#basePath +
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`;
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {method: 'DELETE', headers, url};

    return this.#request(config);
  }

  /**
   *
   * @summary Retrieve an existing PassNinja pass
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */
  public getPass(
    passType: string,
    serialNumber: string,
    options: any = {}
  ): Promise<AxiosResponse<PassResponse>> {
    this.#validateRequestArguments({passType, serialNumber}, 'getPass');
    const url =
      this.#basePath +
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`;
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {method: 'GET', url, headers};

    return this.#request(config);
  }

  /**
   *
   * @summary Retrieve an existing PassNinja pass apple/google JSON file contents.
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */
  public getPassVerbose(
    passType: string,
    serialNumber: string,
    options: any = {}
  ): Promise<AxiosResponse<PassResponseVerbose>> {
    this.#validateRequestArguments({passType, serialNumber}, 'getPassVerbose');
    const url =
      this.#basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}/verbose`;
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {method: 'GET', url, headers};

    return this.#request(config);
  }

  /**
   *
   * @summary Update an existing PassNinja pass using RFC 6902
   * @param passType PassNinja pass type you want to create.
   * @param serialNumber Pass serial number you want to query.
   * @param data The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */
  public patchPass(
    passType: string,
    serialNumber: string,
    data: PatchPassRequest,
    options: any = {}
  ): Promise<AxiosResponse<any>> {
    this.#validateRequestArguments(
      {passType, serialNumber, body: data},
      'patchPass'
    );
    const url =
      this.#basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}`;
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      headers,
      url,
      data,
    };

    return this.#request(config);
  }

  /**
   *
   * @summary Update an existing PassNinja pass
   * @param data The pass type, expiration time and any template variables you want to set in the created pass.
   * @param passType PassNinja pass type you want to modify.
   * @param serialNumber Pass serial number you want to modify.
   * @param {*} [options] Override http request options.
   */
  public putPass(
    data: PutPassRequest,
    passType: string,
    serialNumber: string,
    options: any = {}
  ): Promise<AxiosResponse<any>> {
    this.#validateRequestArguments({passType, serialNumber, data}, 'patchPass');
    const url =
      this.#basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}`;
    const headers = this.#resolveHeaders(options);
    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data,
    };

    return this.#request(config);
  }
}
