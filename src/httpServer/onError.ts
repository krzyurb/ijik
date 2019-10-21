import ILogger from "../iLogger";
import { ServerResponse } from "http";

/**
 * If server throws some unhandled error
 */
export default (logger: ILogger) => (error: Error, response: ServerResponse) => {
  logger.info("Internal server error: ", error);
  response.writeHead(500, { "Content-Type": "text/plain" });
  response.end(error.stack);
};
