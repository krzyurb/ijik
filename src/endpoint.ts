import { IRequest } from "./request";
import { IResponse } from "./response";

export type MiddlewareFunction = (request: IRequest) => MiddlewareResponse;
export type MiddlewareResponse = any;

export interface IEndpoint {
  path: string;
  method?: string;
  handler: MiddlewareFunction | MiddlewareFunction[];
}
