export type ClientPassData = Record<string, string>;
export type PassNinjaResponse = Record<string, any>;
export interface SimplePassObject {
    url: string;
    serialNumber: string;
    passType: string;
}
export interface PassTemplateObject {
    id: string;
    name: string;
    passTypeId: string;
    platform: string;
    style: string;
    issued_pass_count: number;
    installed_pass_count: number;
}
