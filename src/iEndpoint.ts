import Request from "./request";
import Response from "./response";
import { HTTPMethods } from "./constraints";

export default interface IEndpoint {
  path: string;
  method: HTTPMethods;
  perform(request: Request): Promise<Response> | Response;
}
