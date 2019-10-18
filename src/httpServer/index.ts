import { Server, createServer } from "http";

import onRequest from "./onRequest";
import onClientError from "./onClientError";

import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";

export default (logger: ILogger, endpoints: IEndpoint[]): Server => {
  const server = createServer()
    .on("clientError", onClientError(logger))
    .on("request", onRequest(logger, endpoints));

  return server;
};
