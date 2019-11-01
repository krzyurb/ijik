import { Server, createServer } from "http";

import onRequest from "./onRequest";
import onError from "./onError";

import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";

export default (logger: ILogger, endpoints: IEndpoint[]): Server => {
  const server = createServer()
    .on("request", onRequest(logger, endpoints))
    .on("error", onError(logger));

  return server;
};
