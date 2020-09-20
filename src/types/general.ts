export type ClientPassData = Record<string, string>;

export type PassNinjaResponse = Record<string, any>;

export interface SimplePassObject {
  url: string;
  serialNumber: string;
  passType: string;
}
