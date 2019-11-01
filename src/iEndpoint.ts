import Request from "./request";
import Response from "./response";
import { HTTPMethods } from "./constraints";

export default interface IEndpoint {
  config: {
    path: string,
    method: HTTPMethods,
  };

  perform(request: Request): Promise<Response | void> | Response | void;
}
