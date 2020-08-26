import axios from 'axios';
import { VoidAuth, ApiKeyAuth, PassNinjaApiKeys, } from './types';
const PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';
export class PassNinjaClient {
    constructor(accountId, apiKey) {
        this.pass = {};
        this.#basePath = PASSNINJA_BASE_PATH;
        this.#defaultHeaders = {};
        this.#authentications = {
            default: new VoidAuth(),
            account_id: new ApiKeyAuth('header', 'x-account-id'),
            api_key: new ApiKeyAuth('header', 'x-api-key'),
        };
        this.#initializeInterceptors = () => {
            this.#api.interceptors.response.use(this.#handleResponse, this.#handleError);
            this.#api.interceptors.request.use(this.#handleRequest);
        };
        this.#initBindings = () => {
            this.pass.patch = this.patchPass.bind(this);
            this.pass.create = this.createPass.bind(this);
            this.pass.delete = this.deletePass.bind(this);
            this.pass.put = this.putPass.bind(this);
            this.pass.get = this.getPass.bind(this);
            this.pass.getVerbose = this.getPassVerbose.bind(this);
        };
        this.#handleRequest = (config) => {
            this.#authentications.account_id.applyToRequest(config);
            this.#authentications.api_key.applyToRequest(config);
            this.#authentications.default.applyToRequest(config);
            return config;
        };
        this.#request = (config) => {
            return this.#api.request(config);
        };
        this.#validateRequestArguments = (requestArgs, callingFunction) => {
            Object.keys(requestArgs).forEach((argumentName) => {
                if (requestArgs[argumentName] === null ||
                    requestArgs[argumentName] === undefined) {
                    throw new Error(`Required parameter ${argumentName} was null or undefined when calling ${callingFunction}.`);
                }
            });
        };
        this.#handleResponse = ({ data }) => data;
        this.#handleError = (error) => Promise.reject(error);
        this.#resolveHeaders = (options = {}) => {
            const headers = Object.assign({}, this.#defaultHeaders);
            Object.assign(headers, options.headers);
            return headers;
        };
        if (apiKey && accountId) {
            this.setAuthentication(accountId, apiKey);
        }
        this.#api = axios.create({ baseURL: this.#basePath });
        this.#initializeInterceptors();
        this.#initBindings();
    }
    #api;
    #basePath;
    #defaultHeaders;
    #authentications;
    #initializeInterceptors;
    #initBindings;
    #handleRequest;
    #request;
    #validateRequestArguments;
    #handleResponse;
    #handleError;
    setDefaultAuthentication(auth) {
        this.#authentications.default = auth;
    }
    setAuthentication(accountId, apiKey) {
        this.setApiKey(PassNinjaApiKeys.api_key, apiKey);
        this.setApiKey(PassNinjaApiKeys.account_id, accountId);
    }
    setApiKey(key, value) {
        this.#authentications[PassNinjaApiKeys[key]].apiKey = value;
    }
    #resolveHeaders;
    createPass(data, options = {}) {
        this.#validateRequestArguments({ data }, 'createPass');
        const url = this.#basePath + '/passes';
        const headers = this.#resolveHeaders(options);
        const config = { method: 'POST', headers, url, data };
        return this.#request(config);
    }
    deletePass(passType, serialNumber, options = {}) {
        this.#validateRequestArguments({ passType, serialNumber }, 'deletePass');
        const url = this.#basePath +
            `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(serialNumber)}`;
        const headers = this.#resolveHeaders(options);
        const config = { method: 'DELETE', headers, url };
        return this.#request(config);
    }
    getPass(passType, serialNumber, options = {}) {
        this.#validateRequestArguments({ passType, serialNumber }, 'getPass');
        const url = this.#basePath +
            `/passes/${encodeURIComponent(passType)}/${encodeURIComponent(serialNumber)}`;
        const headers = this.#resolveHeaders(options);
        const config = { method: 'GET', url, headers };
        return this.#request(config);
    }
    getPassVerbose(passType, serialNumber, options = {}) {
        this.#validateRequestArguments({ passType, serialNumber }, 'getPassVerbose');
        const url = this.#basePath +
            `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(String(serialNumber))}/verbose`;
        const headers = this.#resolveHeaders(options);
        const config = { method: 'GET', url, headers };
        return this.#request(config);
    }
    patchPass(passType, serialNumber, data, options = {}) {
        this.#validateRequestArguments({ passType, serialNumber, body: data }, 'patchPass');
        const url = this.#basePath +
            `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(String(serialNumber))}`;
        const headers = this.#resolveHeaders(options);
        const config = {
            method: 'PATCH',
            headers,
            url,
            data,
        };
        return this.#request(config);
    }
    putPass(data, passType, serialNumber, options = {}) {
        this.#validateRequestArguments({ passType, serialNumber, data }, 'patchPass');
        const url = this.#basePath +
            `/passes/${encodeURIComponent(String(passType))}/${encodeURIComponent(String(serialNumber))}`;
        const headers = this.#resolveHeaders(options);
        const config = {
            method: 'PUT',
            headers,
            url,
            data,
        };
        return this.#request(config);
    }
}
//# sourceMappingURL=index.js.map