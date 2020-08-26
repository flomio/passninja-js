import { AxiosResponse } from 'axios';
import { Authentication, PassNinjaApiKeys, CreatePassRequest, PassResponse, PassResponseVerbose, PatchPassRequest, PutPassRequest } from './types';
export declare class PassNinjaClient {
    #private;
    pass: any;
    constructor(accountId?: string, apiKey?: string);
    setDefaultAuthentication(auth: Authentication): void;
    setAuthentication(accountId: string, apiKey: string): void;
    setApiKey(key: PassNinjaApiKeys, value: string): void;
    createPass(data: CreatePassRequest, options?: any): Promise<AxiosResponse<PassResponse>>;
    deletePass(passType: string, serialNumber: string, options?: any): Promise<AxiosResponse<PassResponse>>;
    getPass(passType: string, serialNumber: string, options?: any): Promise<AxiosResponse<PassResponse>>;
    getPassVerbose(passType: string, serialNumber: string, options?: any): Promise<AxiosResponse<PassResponseVerbose>>;
    patchPass(passType: string, serialNumber: string, data: PatchPassRequest, options?: any): Promise<AxiosResponse<any>>;
    putPass(data: PutPassRequest, passType: string, serialNumber: string, options?: any): Promise<AxiosResponse<any>>;
}
