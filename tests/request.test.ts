import Request from "../src/request";

describe("Request", () => {
  describe("body", () => {
    test("parse body to json as default", () => {
      const request = new Request("/", `{"foo":"bar"}`, "get", undefined);
      expect(request.body).toEqual({ foo: "bar" });
    });
  });
});
