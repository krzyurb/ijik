import { Server, createServer } from "http";

import onRequest from "./onRequest";
import onError from "./onError";

import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";
import IAppConfig from "../iAppConfig";

function attachContextToEndpoints(endpoints: IEndpoint[], context?: object): IEndpoint[] {
  if (context) {
    endpoints.forEach((endpoint) => {
      endpoint.context = context;
    });
  }

  return endpoints;
}

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
