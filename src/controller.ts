import IEndpoint from "./iEndpoint";
import Request from "./request";
import Response from "./response";
import { HTTPMethods } from "./constraints";

export default abstract class Controller implements IEndpoint {
  constructor(public path: string, public method: HTTPMethods) {}

  public abstract perform(request: Request): Promise<Response> | Response;
}
