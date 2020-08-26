export class CreatePassRequest {
    static getAttributeTypeMap() {
        return CreatePassRequest.attributeTypeMap;
    }
}
CreatePassRequest.discriminator = undefined;
CreatePassRequest.attributeTypeMap = [
    {
        name: 'pass',
        baseName: 'pass',
        type: 'Pass',
    },
    {
        name: 'imageUrls',
        baseName: 'imageUrls',
        type: 'ImageUrls',
    },
];
export class Image {
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
export class ImageUrls extends Array {
}
ImageUrls.discriminator = undefined;
export class Pass extends null {
    static getAttributeTypeMap() {
        return Pass.attributeTypeMap;
    }
}
Pass.discriminator = undefined;
Pass.attributeTypeMap = [];
export class PassResponse {
    static getAttributeTypeMap() {
        return PassResponse.attributeTypeMap;
    }
}
PassResponse.discriminator = undefined;
PassResponse.attributeTypeMap = [
    {
        name: 'passType',
        baseName: 'passType',
        type: 'string',
    },
    {
        name: 'serialNumber',
        baseName: 'serialNumber',
        type: 'string',
    },
    {
        name: 'pass',
        baseName: 'pass',
        type: 'Pass',
    },
    {
        name: 'urls',
        baseName: 'urls',
        type: 'PassResponseUrls',
    },
];
export class PassResponseUrls {
    static getAttributeTypeMap() {
        return PassResponseUrls.attributeTypeMap;
    }
}
PassResponseUrls.discriminator = undefined;
PassResponseUrls.attributeTypeMap = [
    {
        name: 'landing',
        baseName: 'landing',
        type: 'string',
    },
    {
        name: 'apple',
        baseName: 'apple',
        type: 'string',
    },
    {
        name: 'google',
        baseName: 'google',
        type: 'string',
    },
];
export class PassResponseVerbose {
    static getAttributeTypeMap() {
        return PassResponseVerbose.attributeTypeMap;
    }
}
PassResponseVerbose.discriminator = undefined;
PassResponseVerbose.attributeTypeMap = [
    {
        name: 'apple',
        baseName: 'apple',
        type: 'any',
    },
    {
        name: 'google',
        baseName: 'google',
        type: 'any',
    },
];
export class PatchPassRequest {
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
export class PutPassRequest {
    static getAttributeTypeMap() {
        return PutPassRequest.attributeTypeMap;
    }
}
PutPassRequest.discriminator = undefined;
PutPassRequest.attributeTypeMap = [
    {
        name: 'pass',
        baseName: 'pass',
        type: 'Pass',
    },
    {
        name: 'imageUrls',
        baseName: 'imageUrls',
        type: 'ImageUrls',
    },
];
export class Resolution {
    static getAttributeTypeMap() {
        return Resolution.attributeTypeMap;
    }
}
Resolution.discriminator = undefined;
Resolution.attributeTypeMap = [];
export const enumsMap = {
    'Image.TypeEnum': Image.TypeEnum,
    'PatchPassRequest.OpEnum': PatchPassRequest.OpEnum,
};
export const typeMap = {
    CreatePassRequest: CreatePassRequest,
    Image: Image,
    ImageUrls: ImageUrls,
    Pass: Pass,
    PassResponse: PassResponse,
    PassResponseUrls: PassResponseUrls,
    PassResponseVerbose: PassResponseVerbose,
    PatchPassRequest: PatchPassRequest,
    PutPassRequest: PutPassRequest,
    Resolution: Resolution,
};
export class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username,
            password: this.password,
        };
    }
}
export class ApiKeyAuth {
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
export class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers['Authorization'] = 'Bearer ' + this.accessToken;
        }
    }
}
export class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest() {
    }
}
export var PassNinjaApiKeys;
(function (PassNinjaApiKeys) {
    PassNinjaApiKeys[PassNinjaApiKeys["account_id"] = 0] = "account_id";
    PassNinjaApiKeys[PassNinjaApiKeys["api_key"] = 1] = "api_key";
})(PassNinjaApiKeys || (PassNinjaApiKeys = {}));
//# sourceMappingURL=types.js.map