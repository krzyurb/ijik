import IEndpoint from "./iEndpoint";
import Request from "./request";
import Response from "./response";
import { HTTPMethods } from "./constraints";

export default abstract class Controller implements IEndpoint {
  public config: { path: string; method: HTTPMethods; };
  public context?: object;

  constructor(path: string, method: HTTPMethods) {
    this.config = { path, method };
  }

  public abstract perform(request: Request): Promise<Response> | Response;
}
