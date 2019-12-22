import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { buildRequest, IRequest } from "./request";
import { buildServerResponse } from "./response";
import { IEndpoint } from "./endpoint";

export interface IApp {
  server: Server;
  addEndpoint: (endpoint: IEndpoint) => any;
  endpoints: string[];
}

export function buildHttpServer(): IApp {
  const endpoints: IEndpoint[] = [];
  const server = createServer(requestHandler(endpoints));

  return {
    server,
    endpoints: endpoints.map((e) => e.path),
    addEndpoint(this: IApp, endpoint: IEndpoint): IApp {
      if (!endpoint.handler) {
        throw new Error("Endpoint need to have defined .handler() method");
      }

      endpoints.push(endpoint);
      return this;
    },
  };
}

function requestHandler(endpoints: IEndpoint[]) {
  return async (incomingMessage: IncomingMessage, response: ServerResponse) => {
    const endpoint = dispatch(endpoints, incomingMessage);
    if (!endpoint) {
      response.writeHead(404);
      response.end(`"${incomingMessage.method} ${incomingMessage.url}" path not found`);
      return;
    }

    const request = buildRequest(incomingMessage, endpoint);

    const handlerResult = await endpoint.handler(request);
    const result = buildServerResponse(handlerResult);
    response.writeHead(result.status, result.headers);
    response.end(result.body);
  };
}

function dispatch(endpoints: IEndpoint[], incomingMessage: IncomingMessage): IEndpoint | undefined {
  const result = endpoints.find((endpoint) => {
    return checkPath(endpoint, incomingMessage) && checkMethod(endpoint, incomingMessage);
  });

  if (result) {
    return result;
  }

  return undefined;
}

function checkPath(endpoint: IEndpoint, incomingMessage: IncomingMessage): boolean {
  const parsedPatch = `^${endpoint.path.replace(/:\w+|\d+|_+/g, "(\\w+|\\d+)")}/\*$`;
  const matches = new RegExp(parsedPatch).exec(incomingMessage.url || "/");
  return !!matches;
}

function checkMethod(endpoint: IEndpoint, incomingMessage: IncomingMessage): boolean {
  return incomingMessage.method === (endpoint.method ? endpoint.method : "GET");
}
