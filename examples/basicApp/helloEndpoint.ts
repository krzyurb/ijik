import { Request, Response, Endpoint, HTTPMethods } from "../../src/index";

export default class HelloEndpoint extends Endpoint {
  constructor() {
    super("/hello/:name", HTTPMethods.GET);
  }

  public perform(request: Request) {
    const { params } = request;
    return Response.success(`Hello ${params.name}!`);
  }
}
