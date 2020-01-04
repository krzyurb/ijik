import { dispatch } from "../../src/httpServer/dispatch";
import { IEndpoint } from "../../src/endpoint";
import { HTTPMethods } from "../../src/enums/httpMethods";

const fakeHandler = jest.fn();

describe("dispatch", () => {
  test("it finds proper endpoint by path and method", () => {
    const targetEndpoint = { path: "/", handler: fakeHandler };

    const endpoints: IEndpoint[] = [
      { path: "/foo", handler: fakeHandler },
      { path: "/", method: HTTPMethods.POST, handler: fakeHandler },
      targetEndpoint,
    ];

    const incomingMessage = {
      url: "/", method: "GET",
    };

    const result = dispatch(endpoints, incomingMessage);
    expect(result).toBe(targetEndpoint);
    expect(fakeHandler).not.toBeCalled();
  });

  test("it responds with undefined if no endpoint found", () => {
    const endpoints: IEndpoint[] = [
      { path: "/foo", handler: fakeHandler },
      { path: "/foo", method: HTTPMethods.POST, handler: fakeHandler },
    ];

    const incomingMessage = {
      url: "/foo", method: "PUT",
    };

    const result = dispatch(endpoints, incomingMessage);
    expect(result).toBe(undefined);
  });

  test("it works with path params", () => {
    const targetEndpoint = { path: "/foo/:name/bar", handler: fakeHandler };

    const endpoints: IEndpoint[] = [
      { path: "/foo/name/bar", handler: fakeHandler },
      targetEndpoint,
    ];

    const incomingMessage = {
      url: "/foo/aezakmi/bar",
      method: "GET",
    };

    const result = dispatch(endpoints, incomingMessage);
    expect(result).toBe(targetEndpoint);
  });

  test.skip("it works with query params", () => {
    const targetEndpoint = { path: "/hello", handler: fakeHandler };

    const endpoints: IEndpoint[] = [
      { path: "/hello/:name", handler: fakeHandler },
      targetEndpoint,
    ];

    const incomingMessage = {
      url: "/hello?name=micah",
      method: "GET",
    };

    const result = dispatch(endpoints, incomingMessage);
    expect(result).toBe(targetEndpoint);
  });
});
