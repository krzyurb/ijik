import ILogger from "../iLogger";
import { ServerResponse } from "http";
import IAppConfig from "../iAppConfig";

const ERROR_MESSAGE = "Internal server error";

/**
 * If server throws some unhandled error
 */
export default (logger: ILogger, config: IAppConfig) => (error: Error, response: ServerResponse) => {
  logger.info(`${ERROR_MESSAGE}: `, error);
  response.writeHead(500, { "Content-Type": "text/plain" });
  response.end(config.showErrorStack ? error.stack : ERROR_MESSAGE);
};
