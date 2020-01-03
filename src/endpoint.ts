import { HTTPMethods } from "./enums/httpMethods";
import { IRequest } from "./request";

export type MiddlewareFunction = (request: IRequest) => MiddlewareResponse;
export type MiddlewareResponse = any;

export interface IEndpoint {
  path: string;
  method?: HTTPMethods;
  handler: MiddlewareFunction | MiddlewareFunction[];
}

export function validateEndpoint(endpoint: IEndpoint) {
  if (!endpoint.handler) {
    throw new Error("Endpoint need to have defined at least one middleware method");
  }

  if (!endpoint.path) {
    throw new Error("Endpoint need to have defined path");
  }
}
