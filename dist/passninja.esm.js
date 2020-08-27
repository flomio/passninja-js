import axios from 'axios';

class Image {
    static getAttributeTypeMap() {
        return Image.attributeTypeMap;
    }
}
Image.discriminator = undefined;
Image.attributeTypeMap = [
    {
        name: 'type',
        baseName: 'type',
        type: 'Image.TypeEnum',
    },
    {
        name: 'url',
        baseName: 'url',
        type: 'string',
    },
    {
        name: 'resolutions',
        baseName: 'resolutions',
        type: 'Array<Resolution>',
    },
];
(function (Image) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["Icon"] = 'icon'] = "Icon";
        TypeEnum[TypeEnum["Background"] = 'background'] = "Background";
        TypeEnum[TypeEnum["Strip"] = 'strip'] = "Strip";
        TypeEnum[TypeEnum["Logo"] = 'logo'] = "Logo";
        TypeEnum[TypeEnum["Thumbnail"] = 'thumbnail'] = "Thumbnail";
        TypeEnum[TypeEnum["Footer"] = 'footer'] = "Footer";
    })(TypeEnum = Image.TypeEnum || (Image.TypeEnum = {}));
})(Image || (Image = {}));
class PatchPassRequest {
    static getAttributeTypeMap() {
        return PatchPassRequest.attributeTypeMap;
    }
}
PatchPassRequest.discriminator = undefined;
PatchPassRequest.attributeTypeMap = [
    {
        name: 'op',
        baseName: 'op',
        type: 'PatchPassRequest.OpEnum',
    },
    {
        name: 'path',
        baseName: 'path',
        type: 'string',
    },
    {
        name: 'value',
        baseName: 'value',
        type: 'any',
    },
    {
        name: 'from',
        baseName: 'from',
        type: 'string',
    },
];
(function (PatchPassRequest) {
    let OpEnum;
    (function (OpEnum) {
        OpEnum[OpEnum["Add"] = 'add'] = "Add";
        OpEnum[OpEnum["Remove"] = 'remove'] = "Remove";
        OpEnum[OpEnum["Replace"] = 'replace'] = "Replace";
        OpEnum[OpEnum["Move"] = 'move'] = "Move";
        OpEnum[OpEnum["Copy"] = 'copy'] = "Copy";
        OpEnum[OpEnum["Test"] = 'test'] = "Test";
    })(OpEnum = PatchPassRequest.OpEnum || (PatchPassRequest.OpEnum = {}));
})(PatchPassRequest || (PatchPassRequest = {}));
const enumsMap = {
    'Image.TypeEnum': Image.TypeEnum,
    'PatchPassRequest.OpEnum': PatchPassRequest.OpEnum,
};
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
    }
    applyToRequest(requestOptions) {
        if (this.location == 'header' && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest() {
    }
}
var PassNinjaApiKeys;
(function (PassNinjaApiKeys) {
    PassNinjaApiKeys[PassNinjaApiKeys["account_id"] = 0] = "account_id";
    PassNinjaApiKeys[PassNinjaApiKeys["api_key"] = 1] = "api_key";
})(PassNinjaApiKeys || (PassNinjaApiKeys = {}));

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';
class PassNinjaClient {
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

export { PassNinjaClient };
