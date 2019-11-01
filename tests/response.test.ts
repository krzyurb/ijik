import Response from "../src/response";
import { HTTPStatuses } from "../src/constraints";

describe("Response", () => {
  test("default response", () => {
    const response = new Response();
    expect(response.body).toEqual(undefined);
    expect(response.status).toEqual(HTTPStatuses.OK);
    expect(response.headers).toEqual(undefined);
  });
});
