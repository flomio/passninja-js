import axios from 'axios';

class PassNinjaException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, PassNinjaException.prototype);
    }
}
class PassNinjaInvalidArgumentsException extends PassNinjaException {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, PassNinjaInvalidArgumentsException.prototype);
    }
}

const isString = (value) => typeof value === 'string';

const PASSNINJA_BASE_PATH = 'https://api.passninja.com/v1';
class PassNinjaClient {
    constructor(accountId, apiKey) {
        this.#basePath = PASSNINJA_BASE_PATH;
        this.pass = {};
        this.#initializeInterceptors = () => {
            this.#axiosClient.interceptors.response.use(this.#handleResponse, this.#handleError);
        };
        this.#initBindings = () => {
            this.pass.create = this.#createPass.bind(this);
            this.pass.get = this.#getPass.bind(this);
            this.pass.put = this.#putPass.bind(this);
            this.pass.delete = this.#deletePass.bind(this);
        };
        this.#handleResponse = ({ data }) => data;
        this.#handleError = (error) => Promise.reject(error);
        this.#extractInvalidKeys = (clientPassData) => Object.keys(clientPassData).reduce((accum, key) => {
            if (!isString(clientPassData[key])) {
                accum[key] = clientPassData[key];
            }
            return accum;
        }, {});
        this.#createPass = (passType, clientPassData) => {
            if (!isString(passType)) {
                throw new PassNinjaInvalidArgumentsException('Must provide passType to PassNinjaClient.createPass method. PassNinjaClient.createPass(passType: string, clientPassData: ClientPassData)');
            }
            const invalidKeys = this.#extractInvalidKeys(clientPassData);
            if (Object.keys(invalidKeys).length !== 0) {
                throw new PassNinjaInvalidArgumentsException(`Invalid templateStrings provided in clientPassData object. Invalid keys: ${JSON.stringify(invalidKeys)}`);
            }
            return this.#axiosClient
                .post('/passes', {
                passType,
                pass: clientPassData,
            })
                .then((data) => ({
                url: data.urls.landing,
                serialNumber: data.serialNumber,
                passType: data.passType,
            }));
        };
        this.#getPass = (passType, serialNumber) => {
            if (!isString(passType) || !isString(serialNumber)) {
                throw new PassNinjaInvalidArgumentsException('Must provide both passType and serialNumber to PassNinjaClient.getPass method. PassNinjaClient.getPass(passType: string, serialNumber: string)');
            }
            return this.#axiosClient.get(`/passes/${encodeURIComponent(passType)}/${encodeURIComponent(serialNumber)}`);
        };
        this.#putPass = (passType, serialNumber, clientPassData) => {
            if (!isString(passType) || !isString(serialNumber)) {
                throw new PassNinjaInvalidArgumentsException('Must provide both passType and serialNumber to PassNinjaClient.putPass method. PassNinjaClient.putPass(passType: string, serialNumber: string, clientPassData: ClientPassData)');
            }
            const invalidKeys = this.#extractInvalidKeys(clientPassData);
            if (Object.keys(invalidKeys).length !== 0) {
                throw new PassNinjaInvalidArgumentsException(`Invalid templateStrings provided in clientPassData object. Invalid keys: ${JSON.stringify(invalidKeys)}`);
            }
            return this.#axiosClient.put(`/passes/${encodeURIComponent(passType)}/${encodeURIComponent(serialNumber)}`, {
                passType,
                pass: clientPassData,
            });
        };
        this.#deletePass = (passType, serialNumber) => {
            if (!isString(passType) || !isString(serialNumber)) {
                throw new PassNinjaInvalidArgumentsException('Must provide both passType and serialNumber to PassNinjaClient.deletePass method. PassNinjaClient.deletePass(passType: string, serialNumber: string)');
            }
            return this.#axiosClient
                .delete(`/passes/${encodeURIComponent(passType)}/${encodeURIComponent(serialNumber)}`)
                .then(() => serialNumber);
        };
        if (!isString(accountId) || !isString(apiKey)) {
            throw new PassNinjaInvalidArgumentsException('Must provide both accountId and apiKey to PassNinjaClient constructor. PassNinjaClient(accountId: string, apiKey: string)');
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
    #basePath;
    #axiosClient;
    #initializeInterceptors;
    #initBindings;
    #handleResponse;
    #handleError;
    #extractInvalidKeys;
    #createPass;
    #getPass;
    #putPass;
    #deletePass;
}

export { PassNinjaClient };
