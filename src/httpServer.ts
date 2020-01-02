import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import { buildRequest } from "./request";
import { buildServerResponse } from "./response";
import { IEndpoint } from "./endpoint";
import { HTTPMethods } from "./httpMethods";

const DEFAULT_SERVER_PORT = 3131;

export interface IAppOptions {
  appName?: string;
  port?: number;
}

export interface IApp {
  server: Server;
  addEndpoint: (endpoint: IEndpoint) => any;
  listen: () => void;
}

export function buildHttpServer(options: IAppOptions = {}): IApp {
  const endpoints: IEndpoint[] = [];
  const server = createServer(requestHandler(endpoints));

  return {
    server,
    listen: () => server.listen(options.port || DEFAULT_SERVER_PORT),
    addEndpoint(this: IApp, endpoint: IEndpoint): IApp {
      if (!endpoint.handler) {
        throw new Error("Endpoint need to have defined at least one middleware method");
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
    const { handler } = endpoint;
    const middlewaresChain = Array.isArray(handler) ? handler : [handler];

    const reducedChain = middlewaresChain.reduce((acc, func) => {
      return async (req) => {
        const res = await acc(req);
        if (!res) {
          return func(req);
        }
        return res;
      };
    });

    const chainResults = await reducedChain(request);
    const result = buildServerResponse(chainResults);
    response.writeHead(result.status, result.headers);
    response.end(result.body);
  };
}

function dispatch(endpoints: IEndpoint[], incomingMessage: IncomingMessage): IEndpoint | undefined {
  const result = endpoints.find((endpoint) => {
    return checkPath(endpoint, incomingMessage) && checkMethod(endpoint, incomingMessage);
  });

  return result;
}

// TODO: Should omit query params, e.g. "main?foo=bar" when checking path
function checkPath(endpoint: IEndpoint, incomingMessage: IncomingMessage): boolean {
  const parsedPatch = `^${endpoint.path.replace(/:\w+|\d+|_+/g, "(\\w+|\\d+)")}/\*$`;
  const matches = new RegExp(parsedPatch).exec(incomingMessage.url || "/");
  return !!matches;
}

function checkMethod(endpoint: IEndpoint, incomingMessage: IncomingMessage): boolean {
  return (
    incomingMessage.method === (endpoint.method ? endpoint.method.toUpperCase() : HTTPMethods.GET)
  );
}
