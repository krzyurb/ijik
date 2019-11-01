import { Server, createServer } from "http";

import onRequest from "./onRequest";
import onError from "./onError";

import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";
import IAppConfig from "../iAppConfig";

export default (logger: ILogger, endpoints: IEndpoint[], config: IAppConfig): Server => {
  const server = createServer()
    .on("request", onRequest(logger, endpoints))
    .on("error", onError(logger, config));

  return server;
};
