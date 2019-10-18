import { Request, Response, Controller } from "../../src";
import { HTTPMethods } from "../../src/constraints";

export default class HelloController extends Controller {
  constructor() {
    super("/hello/:name", HTTPMethods.GET);
  }

  public perform(request: Request) {
    const { params } = request;
    return Response.success(`Hello ${params.name}!`);
  }
}
