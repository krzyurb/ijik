import { IncomingMessage } from "http";
import { parse } from "url";
import { IEndpoint } from "./endpoint";

export interface IRequestStorage {
  [key: string]: any;
}

export interface IRequest extends IncomingMessage {
  query: object;
  body?: any;
  params: any;
  storage: IRequestStorage;
}

export function buildRequest(incomingMessage: IncomingMessage, endpoint: IEndpoint): IRequest {
  const { url } = incomingMessage;
  const { query } = parse(url ? url : "/", true, true);
  const params = parseParams(incomingMessage.url || "/", endpoint.path);

  // tslint:disable-next-line: prefer-object-spread
  return Object.assign(incomingMessage, {
    query,
    params,
    storage: {},
  });
}

function parseParams(requestUrl: string, endpointPath: string): object {
  const pathParams = endpointPath.match(/:(\w+|\d+|_+)/g);
  const endpointUrl = endpointPath.replace(/:\w+|\d+|_+/g, "(\\w+|\\d+)");
  const matches = new RegExp(`^${endpointUrl}$`, "g").exec(requestUrl || "");
  if (matches && pathParams) {
    const values = matches.slice(1, pathParams.length + 1);
    return values.reduce((result: any, field, index) => {
      result[pathParams[index].replace(":", "")] = field;
      return result;
    }, {});
  }

  return {};
}
