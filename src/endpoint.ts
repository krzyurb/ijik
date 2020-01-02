import { HTTPMethods } from "./httpMethods";
import { IRequest } from "./request";

export type MiddlewareFunction = (request: IRequest) => MiddlewareResponse;
export type MiddlewareResponse = any;

export interface IEndpoint {
  path: string;
  method?: HTTPMethods;
  handler: MiddlewareFunction | MiddlewareFunction[];
}
