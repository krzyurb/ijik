import { Server, createServer } from "http";

import onRequest from "./onRequest";
import onError from "./onError";

import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";
import IAppConfig from "../iAppConfig";
import attachContextToEndpoints from "./attachContextToEndpoints";

export default (
  logger: ILogger,
  endpoints: IEndpoint[],
  config: IAppConfig,
  context?: object,
): Server => {
  const preparedEndpoints = attachContextToEndpoints(endpoints, context);
  const server = createServer()
    .on("request", onRequest(logger, preparedEndpoints))
    .on("error", onError(logger, config));

  return server;
};
