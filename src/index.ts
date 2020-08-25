//  /// <reference types="passninja-js" />

import localVarRequest from 'request';
import * as http from 'http';
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
import {validateRequestArguments, responseResolver} from './utils';

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';

export default class Client {
  protected defaultHeaders: any = {};
  protected basePath = PASSNINJA_BASE_PATH;
  protected useQuerystring = false;
  public pass: any = {};
  protected authentications = {
    default: <Authentication>new VoidAuth(),
    account_id: new ApiKeyAuth('header', 'x-account-id'),
    api_key: new ApiKeyAuth('header', 'x-api-key'),
  };

  constructor(accountId?: string, apiKey?: string) {
    if (apiKey && accountId) {
      this.setAuthentication(accountId, apiKey);
    }
    this.pass.patch = this.patchPass.bind(this);
    this.pass.create = this.createPass.bind(this);
    this.pass.delete = this.deletePass.bind(this);
    this.pass.put = this.putPass.bind(this);
    this.pass.get = this.getPass.bind(this);
    this.pass.getVerbose = this.getPassVerbose.bind(this);
  }

  public setDefaultAuthentication(auth: Authentication): void {
    this.authentications.default = auth;
  }

  public setAuthentication(accountId: string, apiKey: string): void {
    this.setApiKey(PassNinjaApiKeys.api_key, apiKey);
    this.setApiKey(PassNinjaApiKeys.account_id, accountId);
  }

  public setApiKey(key: PassNinjaApiKeys, value: string): void {
    (this.authentications as any)[PassNinjaApiKeys[key]].apiKey = value;
  }

  private setRequestAuthentication(
    requestOptions: localVarRequest.Options
  ): void {
    this.authentications.account_id.applyToRequest(requestOptions);
    this.authentications.api_key.applyToRequest(requestOptions);
    this.authentications.default.applyToRequest(requestOptions);
  }

  private resolveHeaders(options: any = {}) {
    const headers: any = (<any>Object).assign({}, this.defaultHeaders);
    (<any>Object).assign(headers, options.headers);
    return headers;
  }

  /**
   *
   * @summary Create a new PassNinja pass
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */
  public createPass(
    body: CreatePassRequest,
    options: any = {}
  ): Promise<{response: http.IncomingMessage; body: PassResponse}> {
    validateRequestArguments({body}, 'createPass');
    const localVarPath = this.basePath + '/passes';
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'POST',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
      body,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
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
  ): Promise<{response: http.IncomingMessage; body: PassResponse}> {
    validateRequestArguments({passType, serialNumber}, 'deletePass');
    const localVarPath =
      this.basePath +
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`;
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'DELETE',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
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
  ): Promise<{response: http.IncomingMessage; body: PassResponse}> {
    validateRequestArguments({passType, serialNumber}, 'getPass');
    const localVarPath =
      this.basePath +
      `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(
        serialNumber
      )}`;
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'GET',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
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
  ): Promise<{response: http.IncomingMessage; body: PassResponseVerbose}> {
    validateRequestArguments({passType, serialNumber}, 'getPassVerbose');
    const localVarPath =
      this.basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}/verbose`;
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'GET',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
  }

  /**
   *
   * @summary Update an existing PassNinja pass using RFC 6902
   * @param passType PassNinja pass type you want to create.
   * @param serialNumber Pass serial number you want to query.
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */
  public patchPass(
    passType: string,
    serialNumber: string,
    body: PatchPassRequest,
    options: any = {}
  ): Promise<{response: http.IncomingMessage; body?: any}> {
    validateRequestArguments({passType, serialNumber, body}, 'patchPass');
    const localVarPath =
      this.basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}`;
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'PATCH',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
      body,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
  }

  /**
   *
   * @summary Update an existing PassNinja pass
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param passType PassNinja pass type you want to modify.
   * @param serialNumber Pass serial number you want to modify.
   * @param {*} [options] Override http request options.
   */
  public putPass(
    body: PutPassRequest,
    passType: string,
    serialNumber: string,
    options: any = {}
  ): Promise<{response: http.IncomingMessage; body?: any}> {
    validateRequestArguments({passType, serialNumber, body}, 'patchPass');
    const localVarPath =
      this.basePath +
      `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(
        String(serialNumber)
      )}`;
    const localVarHeaderParams = this.resolveHeaders(options);
    const localVarRequestOptions: localVarRequest.Options = {
      method: 'PUT',
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this.useQuerystring,
      json: true,
      body,
    };

    this.setRequestAuthentication(localVarRequestOptions);
    return responseResolver(localVarRequestOptions);
  }
}
