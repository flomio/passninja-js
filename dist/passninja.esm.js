import axios from 'axios';

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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
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
      if (this.location == 'header' && requestOptions && requestOptions.headers) {
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
    value: function applyToRequest() {}
  }]);

  return VoidAuth;
}();
var PassNinjaApiKeys;

(function (PassNinjaApiKeys) {
  PassNinjaApiKeys[PassNinjaApiKeys["account_id"] = 0] = "account_id";
  PassNinjaApiKeys[PassNinjaApiKeys["api_key"] = 1] = "api_key";
})(PassNinjaApiKeys || (PassNinjaApiKeys = {}));

var _api, _basePath, _defaultHeaders, _authentications, _initializeInterceptors, _initBindings, _handleRequest, _request, _validateRequestArguments, _handleResponse, _handleError, _resolveHeaders;
var PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';
var PassNinjaClient = /*#__PURE__*/function () {
  function PassNinjaClient(accountId, apiKey) {
    var _this = this;

    _classCallCheck(this, PassNinjaClient);

    this.pass = {};

    _api.set(this, void 0);

    _basePath.set(this, PASSNINJA_BASE_PATH);

    _defaultHeaders.set(this, {});

    _authentications.set(this, {
      "default": new VoidAuth(),
      account_id: new ApiKeyAuth('header', 'x-account-id'),
      api_key: new ApiKeyAuth('header', 'x-api-key')
    });

    _initializeInterceptors.set(this, function () {
      __classPrivateFieldGet(_this, _api).interceptors.response.use(__classPrivateFieldGet(_this, _handleResponse), __classPrivateFieldGet(_this, _handleError));

      __classPrivateFieldGet(_this, _api).interceptors.request.use(__classPrivateFieldGet(_this, _handleRequest));
    });

    _initBindings.set(this, function () {
      _this.pass.patch = _this.patchPass.bind(_this);
      _this.pass.create = _this.createPass.bind(_this);
      _this.pass["delete"] = _this.deletePass.bind(_this);
      _this.pass.put = _this.putPass.bind(_this);
      _this.pass.get = _this.getPass.bind(_this);
      _this.pass.getVerbose = _this.getPassVerbose.bind(_this);
    });

    _handleRequest.set(this, function (config) {
      __classPrivateFieldGet(_this, _authentications).account_id.applyToRequest(config);

      __classPrivateFieldGet(_this, _authentications).api_key.applyToRequest(config);

      __classPrivateFieldGet(_this, _authentications)["default"].applyToRequest(config);

      return config;
    });

    _request.set(this, function (config) {
      return __classPrivateFieldGet(_this, _api).request(config);
    });

    _validateRequestArguments.set(this, function (requestArgs, callingFunction) {
      Object.keys(requestArgs).forEach(function (argumentName) {
        if (requestArgs[argumentName] === null || requestArgs[argumentName] === undefined) {
          throw new Error("Required parameter ".concat(argumentName, " was null or undefined when calling ").concat(callingFunction, "."));
        }
      });
    });

    _handleResponse.set(this, function (_ref) {
      var data = _ref.data;
      return data;
    });

    _handleError.set(this, function (error) {
      return Promise.reject(error);
    });

    _resolveHeaders.set(this, function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = Object.assign({}, __classPrivateFieldGet(_this, _defaultHeaders));
      Object.assign(headers, options.headers);
      return headers;
    });

    if (apiKey && accountId) {
      this.setAuthentication(accountId, apiKey);
    }

    __classPrivateFieldSet(this, _api, axios.create({
      baseURL: __classPrivateFieldGet(this, _basePath)
    }));

    __classPrivateFieldGet(this, _initializeInterceptors).call(this);

    __classPrivateFieldGet(this, _initBindings).call(this);
  }

  _createClass(PassNinjaClient, [{
    key: "setDefaultAuthentication",
    value: function setDefaultAuthentication(auth) {
      __classPrivateFieldGet(this, _authentications)["default"] = auth;
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
      __classPrivateFieldGet(this, _authentications)[PassNinjaApiKeys[key]].apiKey = value;
    }
  }, {
    key: "createPass",
    value: function createPass(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        data: data
      }, 'createPass');

      var url = __classPrivateFieldGet(this, _basePath) + '/passes';

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'POST',
        headers: headers,
        url: url,
        data: data
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }, {
    key: "deletePass",
    value: function deletePass(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        passType: passType,
        serialNumber: serialNumber
      }, 'deletePass');

      var url = __classPrivateFieldGet(this, _basePath) + "/passes/".concat(encodeURIComponent(passType), "/").concat(encodeURIComponent(serialNumber));

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'DELETE',
        headers: headers,
        url: url
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }, {
    key: "getPass",
    value: function getPass(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        passType: passType,
        serialNumber: serialNumber
      }, 'getPass');

      var url = __classPrivateFieldGet(this, _basePath) + "/passes/".concat(encodeURIComponent(passType), "/").concat(encodeURIComponent(serialNumber));

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'GET',
        url: url,
        headers: headers
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }, {
    key: "getPassVerbose",
    value: function getPassVerbose(passType, serialNumber) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        passType: passType,
        serialNumber: serialNumber
      }, 'getPassVerbose');

      var url = __classPrivateFieldGet(this, _basePath) + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)), "/verbose");

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'GET',
        url: url,
        headers: headers
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }, {
    key: "patchPass",
    value: function patchPass(passType, serialNumber, data) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        passType: passType,
        serialNumber: serialNumber,
        body: data
      }, 'patchPass');

      var url = __classPrivateFieldGet(this, _basePath) + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)));

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'PATCH',
        headers: headers,
        url: url,
        data: data
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }, {
    key: "putPass",
    value: function putPass(data, passType, serialNumber) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      __classPrivateFieldGet(this, _validateRequestArguments).call(this, {
        passType: passType,
        serialNumber: serialNumber,
        data: data
      }, 'patchPass');

      var url = __classPrivateFieldGet(this, _basePath) + "/passes/".concat(encodeURIComponent(String(passType)), "/").concat(encodeURIComponent(String(serialNumber)));

      var headers = __classPrivateFieldGet(this, _resolveHeaders).call(this, options);

      var config = {
        method: 'PUT',
        headers: headers,
        url: url,
        data: data
      };
      return __classPrivateFieldGet(this, _request).call(this, config);
    }
  }]);

  return PassNinjaClient;
}();
_api = new WeakMap(), _basePath = new WeakMap(), _defaultHeaders = new WeakMap(), _authentications = new WeakMap(), _initializeInterceptors = new WeakMap(), _initBindings = new WeakMap(), _handleRequest = new WeakMap(), _request = new WeakMap(), _validateRequestArguments = new WeakMap(), _handleResponse = new WeakMap(), _handleError = new WeakMap(), _resolveHeaders = new WeakMap();

export { PassNinjaClient };
