import { IRequest } from "./request";

export interface IEndpoint {
  handler: (request: IRequest, ...args: any[]) => any;
  path: string;
  method?: string;
}
