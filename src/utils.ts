import * as http from 'http';
import localVarRequest from 'request';

export const primitives = [
  'string',
  'boolean',
  'double',
  'integer',
  'long',
  'float',
  'number',
  'any',
];

export const validateRequestArguments = <T>(
  requestArgs: {
    [key: string]: T;
  },
  callingFunction: string
): void => {
  Object.keys(requestArgs).forEach((argumentName: string) => {
    if (
      requestArgs[argumentName] === null ||
      requestArgs[argumentName] === undefined
    ) {
      throw new Error(
        `Required parameter ${argumentName} was null or undefined when calling ${callingFunction}.`
      );
    }
  });
};

export const responseResolver = (
  requestOptions: localVarRequest.Options
): Promise<{response: http.IncomingMessage; body: any}> => {
  return new Promise((resolve, reject) => {
    localVarRequest(requestOptions, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        if (
          response.statusCode &&
          response.statusCode >= 200 &&
          response.statusCode <= 299
        ) {
          resolve({response: response, body: body});
        } else {
          reject({response: response, body: body});
        }
      }
    });
  });
};
