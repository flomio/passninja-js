import localVarRequest from 'request';

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

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Image =
/** @class */
function () {
  function Image() {}

  Image.getAttributeTypeMap = function () {
    return Image.attributeTypeMap;
  };

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
  return Image;
}();

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
 * An array of user specified images to upload and use in the pass.
 */


var ImageUrls =
/** @class */
function (_super) {
  __extends(ImageUrls, _super);

  function ImageUrls() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ImageUrls.discriminator = undefined;
  return ImageUrls;
}(Array);

var Pass =
/** @class */
function (_super) {
  __extends(Pass, _super);

  function Pass() {}

  Pass.getAttributeTypeMap = function () {
    return Pass.attributeTypeMap;
  };

  Pass.discriminator = undefined;
  Pass.attributeTypeMap = [];
  return Pass;
}(null);
/**
 * A JSONPatch Pass as defined by RFC 6902
 */

var PatchPassRequest =
/** @class */
function () {
  function PatchPassRequest() {}

  PatchPassRequest.getAttributeTypeMap = function () {
    return PatchPassRequest.attributeTypeMap;
  };

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
  return PatchPassRequest;
}();

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

var ApiKeyAuth =
/** @class */
function () {
  function ApiKeyAuth(location, paramName) {
    this.location = location;
    this.paramName = paramName;
    this.apiKey = '';
  }

  ApiKeyAuth.prototype.applyToRequest = function (requestOptions) {
    if (this.location == 'query') {
      requestOptions.qs[this.paramName] = this.apiKey;
    } else if (this.location == 'header' && requestOptions && requestOptions.headers) {
      requestOptions.headers[this.paramName] = this.apiKey;
    }
  };

  return ApiKeyAuth;
}();

var VoidAuth =
/** @class */
function () {
  function VoidAuth() {
    this.username = '';
    this.password = '';
  }

  VoidAuth.prototype.applyToRequest = function () {// Do nothing
  };

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
      throw new Error("Required parameter " + argumentName + " was null or undefined when calling " + callingFunction + ".");
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

//  /// <reference types="passninja-js" />
var PASSNINJA_BASE_PATH = 'https://api.passninja.com/create-response';

var PassNinjaClient =
/** @class */
function () {
  function PassNinjaClient(accountId, apiKey) {
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

  PassNinjaClient.prototype.setDefaultAuthentication = function (auth) {
    this.authentications["default"] = auth;
  };

  PassNinjaClient.prototype.setAuthentication = function (accountId, apiKey) {
    this.setApiKey(PassNinjaApiKeys.api_key, apiKey);
    this.setApiKey(PassNinjaApiKeys.account_id, accountId);
  };

  PassNinjaClient.prototype.setApiKey = function (key, value) {
    this.authentications[PassNinjaApiKeys[key]].apiKey = value;
  };

  PassNinjaClient.prototype.setRequestAuthentication = function (requestOptions) {
    this.authentications.account_id.applyToRequest(requestOptions);
    this.authentications.api_key.applyToRequest(requestOptions);
    this.authentications["default"].applyToRequest(requestOptions);
  };

  PassNinjaClient.prototype.resolveHeaders = function (options) {
    if (options === void 0) {
      options = {};
    }

    var headers = Object.assign({}, this.defaultHeaders);
    Object.assign(headers, options.headers);
    return headers;
  };
  /**
   *
   * @summary Create a new PassNinja pass
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.createPass = function (body, options) {
    if (options === void 0) {
      options = {};
    }

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
  };
  /**
   *
   * @summary Delete (archive) an existing PassNinja pass
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.deletePass = function (passType, serialNumber, options) {
    if (options === void 0) {
      options = {};
    }

    validateRequestArguments({
      passType: passType,
      serialNumber: serialNumber
    }, 'deletePass');
    var localVarPath = this.basePath + ("/passes/" + encodeURIComponent(passType) + "/" + encodeURIComponent(serialNumber));
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
  };
  /**
   *
   * @summary Retrieve an existing PassNinja pass
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.getPass = function (passType, serialNumber, options) {
    if (options === void 0) {
      options = {};
    }

    validateRequestArguments({
      passType: passType,
      serialNumber: serialNumber
    }, 'getPass');
    var localVarPath = this.basePath + ("/passes/" + encodeURIComponent(passType) + "/" + encodeURIComponent(serialNumber));
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
  };
  /**
   *
   * @summary Retrieve an existing PassNinja pass apple/google JSON file contents.
   * @param passType PassNinja pass type you are querying.
   * @param serialNumber Pass serial number you want to query.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.getPassVerbose = function (passType, serialNumber, options) {
    if (options === void 0) {
      options = {};
    }

    validateRequestArguments({
      passType: passType,
      serialNumber: serialNumber
    }, 'getPassVerbose');
    var localVarPath = this.basePath + ("/passes/" + encodeURIComponent(String(passType)) + "/" + encodeURIComponent(String(serialNumber)) + "/verbose");
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
  };
  /**
   *
   * @summary Update an existing PassNinja pass using RFC 6902
   * @param passType PassNinja pass type you want to create.
   * @param serialNumber Pass serial number you want to query.
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.patchPass = function (passType, serialNumber, body, options) {
    if (options === void 0) {
      options = {};
    }

    validateRequestArguments({
      passType: passType,
      serialNumber: serialNumber,
      body: body
    }, 'patchPass');
    var localVarPath = this.basePath + ("/passes/" + encodeURIComponent(String(passType)) + "/" + encodeURIComponent(String(serialNumber)));
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
  };
  /**
   *
   * @summary Update an existing PassNinja pass
   * @param body The pass type, expiration time and any template variables you want to set in the created pass.
   * @param passType PassNinja pass type you want to modify.
   * @param serialNumber Pass serial number you want to modify.
   * @param {*} [options] Override http request options.
   */


  PassNinjaClient.prototype.putPass = function (body, passType, serialNumber, options) {
    if (options === void 0) {
      options = {};
    }

    validateRequestArguments({
      passType: passType,
      serialNumber: serialNumber,
      body: body
    }, 'patchPass');
    var localVarPath = this.basePath + ("/passes/" + encodeURIComponent(String(passType)) + "/" + encodeURIComponent(String(serialNumber)));
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
  };

  return PassNinjaClient;
}();

export default PassNinjaClient;
