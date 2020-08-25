import localVarRequest from 'request';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Image = /*#__PURE__*/function () {
  function Image() {
    _classCallCheck(this, Image);
  }

  _createClass(Image, null, [{
    key: "getAttributeTypeMap",
    value: function getAttributeTypeMap() {
      return Image.attributeTypeMap;
    }
  }]);

  return Image;
}();
Image.discriminator = undefined;
Image.attributeTypeMap = [{
  name: 'type',
  baseName: 'type',
  type: 'Image.TypeEnum'
}, {
  name: 'url',
  baseName: 'url',
  type: 'string'
}, {
  name: 'resolutions',
  baseName: 'resolutions',
  type: 'Array<Resolution>'
}];

(function (Image) {
  var TypeEnum;

  (function (TypeEnum) {
    TypeEnum[TypeEnum["Icon"] = 'icon'] = "Icon";
    TypeEnum[TypeEnum["Background"] = 'background'] = "Background";
    TypeEnum[TypeEnum["Strip"] = 'strip'] = "Strip";
    TypeEnum[TypeEnum["Logo"] = 'logo'] = "Logo";
    TypeEnum[TypeEnum["Thumbnail"] = 'thumbnail'] = "Thumbnail";
    TypeEnum[TypeEnum["Footer"] = 'footer'] = "Footer";
  })(TypeEnum = Image.TypeEnum || (Image.TypeEnum = {}));
})(Image || (Image = {}));
/**
 * A JSONPatch Pass as defined by RFC 6902
 */

var PatchPassRequest = /*#__PURE__*/function () {
  function PatchPassRequest() {
    _classCallCheck(this, PatchPassRequest);
  }

  _createClass(PatchPassRequest, null, [{
    key: "getAttributeTypeMap",
    value: function getAttributeTypeMap() {
      return PatchPassRequest.attributeTypeMap;
    }
  }]);

  return PatchPassRequest;
}();
PatchPassRequest.discriminator = undefined;
PatchPassRequest.attributeTypeMap = [{
  name: 'op',
  baseName: 'op',
  type: 'PatchPassRequest.OpEnum'
}, {
  name: 'path',
  baseName: 'path',
  type: 'string'
}, {
  name: 'value',
  baseName: 'value',
  type: 'any'
}, {
  name: 'from',
  baseName: 'from',
  type: 'string'
}];

(function (PatchPassRequest) {
  var OpEnum;

  (function (OpEnum) {
    OpEnum[OpEnum["Add"] = 'add'] = "Add";
    OpEnum[OpEnum["Remove"] = 'remove'] = "Remove";
    OpEnum[OpEnum["Replace"] = 'replace'] = "Replace";
    OpEnum[OpEnum["Move"] = 'move'] = "Move";
    OpEnum[OpEnum["Copy"] = 'copy'] = "Copy";
    OpEnum[OpEnum["Test"] = 'test'] = "Test";
  })(OpEnum = PatchPassRequest.OpEnum || (PatchPassRequest.OpEnum = {}));
})(PatchPassRequest || (PatchPassRequest = {}));
var enumsMap = {
  'Image.TypeEnum': Image.TypeEnum,
  'PatchPassRequest.OpEnum': PatchPassRequest.OpEnum
};
var ApiKeyAuth = /*#__PURE__*/function () {
  function ApiKeyAuth(location, paramName) {
    _classCallCheck(this, ApiKeyAuth);

    this.location = location;
    this.paramName = paramName;
    this.apiKey = '';
  }

  _createClass(ApiKeyAuth, [{
    key: "applyToRequest",
    value: function applyToRequest(requestOptions) {
      if (this.location == 'query') {
        requestOptions.qs[this.paramName] = this.apiKey;
      } else if (this.location == 'header' && requestOptions && requestOptions.headers) {
        requestOptions.headers[this.paramName] = this.apiKey;
      }
    }
  }]);

  return ApiKeyAuth;
}();
var VoidAuth = /*#__PURE__*/function () {
  function VoidAuth() {
    _classCallCheck(this, VoidAuth);

    this.username = '';
    this.password = '';
  }

  _createClass(VoidAuth, [{
    key: "applyToRequest",
    value: function applyToRequest() {// Do nothing
    }
  }]);

  return VoidAuth;
}();
var PassNinjaApiKeys;

(function (PassNinjaApiKeys) {
  PassNinjaApiKeys[PassNinjaApiKeys["account_id"] = 0] = "account_id";
  PassNinjaApiKeys[PassNinjaApiKeys["api_key"] = 1] = "api_key";
})(PassNinjaApiKeys || (PassNinjaApiKeys = {}));

var validateRequestArguments = function validateRequestArguments(requestArgs, callingFunction) {
  Object.keys(requestArgs).forEach(function (argumentName) {
    if (requestArgs[argumentName] === null || requestArgs[argumentName] === undefined) {
      throw new Error("Required parameter ".concat(argumentName, " was null or undefined when calling ").concat(callingFunction, "."));
    }
  });
};
var responseResolver = function responseResolver(requestOptions) {
  return new Promise(function (resolve, reject) {
    localVarRequest(requestOptions, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
          resolve({
            response: response,
            body: body
          });
        } else {
          reject({
            response: response,
            body: body
          });
        }
      }
    });
  });
};

var PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';

var Client = /*#__PURE__*/function () {
  function Client(accountId, apiKey) {
    _classCallCheck(this, Client);

    this.defaultHeaders = {};
    this.basePath = PASSNINJA_BASE_PATH;
    this.useQuerystring = false;
    this.pass = {};
    this.authentications = {
      "default": new VoidAuth(),
      account_id: new ApiKeyAuth('header', 'x-account-id'),
      api_key: new ApiKeyAuth('header', 'x-api-key')
    };

    if (apiKey && accountId) {
      this.setAuthentication(accountId, apiKey);
    }

    this.pass.patch = this.patchPass.bind(this);
    this.pass.create = this.createPass.bind(this);
    this.pass["delete"] = this.deletePass.bind(this);
    this.pass.put = this.putPass.bind(this);
    this.pass.get = this.getPass.bind(this);
    this.pass.getVerbose = this.getPassVerbose.bind(this);
  }

  _createClass(Client, [{
    key: "setDefaultAuthentication",
    value: function setDefaultAuthentication(auth) {
      this.authentications["default"] = auth;
    }
  }, {
    key: "setAuthentication",
    value: function setAuthentication(accountId, apiKey) {
      this.setApiKey(PassNinjaApiKeys.api_key, apiKey);
      this.setApiKey(PassNinjaApiKeys.account_id, accountId);
    }
  }, {
    key: "setApiKey",
    value: function setApiKey(key, value) {
      this.authentications[PassNinjaApiKeys[key]].apiKey = value;
    }
  }, {
    key: "setRequestAuthentication",
    value: function setRequestAuthentication(requestOptions) {
      this.authentications.account_id.applyToRequest(requestOptions);
      this.authentications.api_key.applyToRequest(requestOptions);
      this.authentications["default"].applyToRequest(requestOptions);
    }
  }, {
    key: "resolveHeaders",
    value: function resolveHeaders() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = Object.assign({}, this.defaultHeaders);
      Object.assign(headers, options.headers);
      return headers;
    }
    /**
     *
     * @summary Create a new PassNinja pass
     * @param body The pass type, expiration time and any template variables you want to set in the created pass.
     * @param {*} [options] Override http request options.
     */

  }, {
    key: "createPass",
    value: function createPass(body) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      validateRequestArguments({
        body: body
      }, 'createPass');
      var localVarPath = this.basePath + '/passes';
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'POST',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true,
        body: body
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

  }, {
    key: "deletePass",
    value: function deletePass(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      validateRequestArguments({
        passType: passType,
        serialNumber: serialNumber
      }, 'deletePass');
      var localVarPath = this.basePath + "/passes/".concat(encodeURIComponent(passType), "/").concat(encodeURIComponent(serialNumber));
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'DELETE',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true
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

  }, {
    key: "getPass",
    value: function getPass(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      validateRequestArguments({
        passType: passType,
        serialNumber: serialNumber
      }, 'getPass');
      var localVarPath = this.basePath + "/passes/".concat(encodeURIComponent(passType), "/").concat(encodeURIComponent(serialNumber));
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'GET',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true
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

  }, {
    key: "getPassVerbose",
    value: function getPassVerbose(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      validateRequestArguments({
        passType: passType,
        serialNumber: serialNumber
      }, 'getPassVerbose');
      var localVarPath = this.basePath + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)), "/verbose");
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'GET',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true
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

  }, {
    key: "patchPass",
    value: function patchPass(passType, serialNumber, body) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      validateRequestArguments({
        passType: passType,
        serialNumber: serialNumber,
        body: body
      }, 'patchPass');
      var localVarPath = this.basePath + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)));
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'PATCH',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true,
        body: body
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

  }, {
    key: "putPass",
    value: function putPass(body, passType, serialNumber) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      validateRequestArguments({
        passType: passType,
        serialNumber: serialNumber,
        body: body
      }, 'patchPass');
      var localVarPath = this.basePath + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)));
      var localVarHeaderParams = this.resolveHeaders(options);
      var localVarRequestOptions = {
        method: 'PUT',
        headers: localVarHeaderParams,
        uri: localVarPath,
        useQuerystring: this.useQuerystring,
        json: true,
        body: body
      };
      this.setRequestAuthentication(localVarRequestOptions);
      return responseResolver(localVarRequestOptions);
    }
  }]);

  return Client;
}();

export default Client;
