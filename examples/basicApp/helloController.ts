import { Request, Response, Controller, HTTPMethods } from "../../src";

export default class HelloController extends Controller {
  constructor() {
    super("/hello/:name", HTTPMethods.GET);
  }

  public perform(request: Request) {
    const { params } = request;
    return Response.success(`Hello ${params.name}!`);
  }
}
