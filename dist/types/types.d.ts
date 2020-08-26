import { AxiosRequestConfig } from 'axios';
interface attributeType {
    name: string;
    baseName: string;
    type: string;
}
declare type attributeTypes = Array<attributeType>;
export declare class CreatePassRequest {
    'pass'?: Pass;
    'imageUrls'?: ImageUrls;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare class Image {
    'type'?: Image.TypeEnum;
    'url'?: string;
    'resolutions'?: Array<Resolution>;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare namespace Image {
    enum TypeEnum {
        Icon,
        Background,
        Strip,
        Logo,
        Thumbnail,
        Footer
    }
}
export declare class ImageUrls extends Array<Image> {
    static discriminator: string | undefined;
}
export declare class Pass extends null<string, string> {
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): any;
}
export declare class PassResponse {
    'passType': string;
    'serialNumber': string;
    'pass': Pass;
    'urls': PassResponseUrls;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare class PassResponseUrls {
    'landing'?: string;
    'apple'?: string;
    'google'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare class PassResponseVerbose {
    'apple': Record<string, unknown>;
    'google': Record<string, unknown>;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare class PatchPassRequest {
    'op': PatchPassRequest.OpEnum;
    'path': string;
    'value'?: any;
    'from'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare namespace PatchPassRequest {
    enum OpEnum {
        Add,
        Remove,
        Replace,
        Move,
        Copy,
        Test
    }
}
export declare class PutPassRequest {
    'pass'?: Pass;
    'imageUrls'?: ImageUrls;
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare class Resolution {
    static discriminator: string | undefined;
    static attributeTypeMap: attributeTypes;
    static getAttributeTypeMap(): attributeTypes;
}
export declare const enumsMap: {
    [index: string]: any;
};
export declare const typeMap: {
    [index: string]: any;
};
export interface Authentication {
    applyToRequest(requestOptions: AxiosRequestConfig): void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: AxiosRequestConfig): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: AxiosRequestConfig): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: AxiosRequestConfig): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(): void;
}
export declare enum PassNinjaApiKeys {
    account_id = 0,
    api_key = 1
}
export {};
