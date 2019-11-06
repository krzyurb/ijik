import Endpoint from "../src/endpoint";
import { Response, HTTPMethods } from "../src";

class TestEndpoint extends Endpoint {
  constructor() {
    super("/", HTTPMethods.GET);
  }

  public perform(): Response | Promise<Response> {
    return Response.success("Hello world");
  }
}

describe("Endpoint", () => {
  describe("constructor", () => {
    test("sets proper config data", () => {
      const endpoint = new TestEndpoint();
      expect(endpoint.config.path).toBe("/");
      expect(endpoint.config.method).toBe(HTTPMethods.GET);
    });
  });
});
