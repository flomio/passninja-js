import {AxiosRequestConfig} from 'axios';

interface attributeType {
  name: string;
  baseName: string;
  type: string;
}
type attributeTypes = Array<attributeType>;

export class CreatePassRequest {
  'pass'?: Pass;
  'imageUrls'?: ImageUrls;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return CreatePassRequest.attributeTypeMap;
  }
}

export class Image {
  /**
   * The type of image you are adding
   */
  'type'?: Image.TypeEnum;
  /**
   * The URL where you have hosted the image.
   */
  'url'?: string;
  'resolutions'?: Array<Resolution>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return Image.attributeTypeMap;
  }
}

export namespace Image {
  export enum TypeEnum {
    Icon = <any>'icon',
    Background = <any>'background',
    Strip = <any>'strip',
    Logo = <any>'logo',
    Thumbnail = <any>'thumbnail',
    Footer = <any>'footer',
  }
}

/**
 * An array of user specified images to upload and use in the pass.
 */
export class ImageUrls extends Array<Image> {
  static discriminator: string | undefined = undefined;
}

export class Pass extends null<string, string> {
  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [];

  static getAttributeTypeMap(): any {
    return Pass.attributeTypeMap;
  }
}

export class PassResponse {
  'passType': string;
  'serialNumber': string;
  'pass': Pass;
  'urls': PassResponseUrls;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return PassResponse.attributeTypeMap;
  }
}

export class PassResponseUrls {
  /**
   * A PassNinja hosted pass desktop and mobile-friendly installation page for installation.
   */
  'landing'?: string;
  /**
   * The URL to directly access the created Apple pass file.
   */
  'apple'?: string;
  /**
   * The URL to directly access the created Google pass file.
   */
  'google'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return PassResponseUrls.attributeTypeMap;
  }
}

export class PassResponseVerbose {
  /**
   * The JSON representation of the Apple Pass
   */
  'apple': Record<string, unknown>;
  /**
   * The JSON representation of the Google Pass
   */
  'google': Record<string, unknown>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return PassResponseVerbose.attributeTypeMap;
  }
}

/**
 * A JSONPatch Pass as defined by RFC 6902
 */
export class PatchPassRequest {
  /**
   * The operation to be performed
   */
  'op': PatchPassRequest.OpEnum;
  /**
   * A JSON-Pointer
   */
  'path': string;
  /**
   * The value to be used within the operation.
   */
  'value'?: any;
  /**
   * A string containing a JSON Pointer value.
   */
  'from'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return PatchPassRequest.attributeTypeMap;
  }
}

export namespace PatchPassRequest {
  export enum OpEnum {
    Add = <any>'add',
    Remove = <any>'remove',
    Replace = <any>'replace',
    Move = <any>'move',
    Copy = <any>'copy',
    Test = <any>'test',
  }
}

export class PutPassRequest {
  'pass'?: Pass;
  'imageUrls'?: ImageUrls;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [
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

  static getAttributeTypeMap(): attributeTypes {
    return PutPassRequest.attributeTypeMap;
  }
}

export class Resolution {
  static discriminator: string | undefined = undefined;

  static attributeTypeMap: attributeTypes = [];

  static getAttributeTypeMap(): attributeTypes {
    return Resolution.attributeTypeMap;
  }
}

export const enumsMap: {[index: string]: any} = {
  'Image.TypeEnum': Image.TypeEnum,
  'PatchPassRequest.OpEnum': PatchPassRequest.OpEnum,
};

export const typeMap: {[index: string]: any} = {
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

export interface Authentication {
  /**
   * Apply authentication settings to header and query params.
   */
  applyToRequest(requestOptions: AxiosRequestConfig): void;
}

export class HttpBasicAuth implements Authentication {
  public username = '';
  public password = '';

  applyToRequest(requestOptions: AxiosRequestConfig): void {
    requestOptions.auth = {
      username: this.username,
      password: this.password,
    };
  }
}

export class ApiKeyAuth implements Authentication {
  public apiKey = '';

  constructor(private location: string, private paramName: string) {}

  applyToRequest(requestOptions: AxiosRequestConfig): void {
    if (this.location == 'header' && requestOptions && requestOptions.headers) {
      requestOptions.headers[this.paramName] = this.apiKey;
    }
  }
}

export class OAuth implements Authentication {
  public accessToken = '';

  applyToRequest(requestOptions: AxiosRequestConfig): void {
    if (requestOptions && requestOptions.headers) {
      requestOptions.headers['Authorization'] = 'Bearer ' + this.accessToken;
    }
  }
}

export class VoidAuth implements Authentication {
  public username = '';
  public password = '';

  applyToRequest(): void {
    // Do nothing
  }
}

export enum PassNinjaApiKeys {
  account_id,
  api_key,
}
