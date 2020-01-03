import { Server, createServer } from "http";
import { IEndpoint, validateEndpoint } from "../endpoint";
import { requestHandler } from "./requestHandler";

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

/**
 * Creates ijik app instance
 * @param options app configuration
 */
export function buildHttpServer(options: IAppOptions = {}): IApp { // TODO: Allow to pass endpoints here
  const endpoints: IEndpoint[] = [];
  const server = createServer(requestHandler(endpoints));

  return {
    server,
    listen: () => server.listen(options.port || DEFAULT_SERVER_PORT),
    addEndpoint(this: IApp, endpoint: IEndpoint): IApp {
      validateEndpoint(endpoint);
      endpoints.push(endpoint);
      return this;
    },
  };
}
