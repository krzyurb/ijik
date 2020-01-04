import { validateEndpoint } from "../src/endpoint";

describe("Endpoint", () => {

  describe("validateEndpoint", () => {
    // @ts-ignore
    const unsafeValidate = (fakeEndpoint: any) => () => validateEndpoint(fakeEndpoint);

    test("it should throw proper error if type control is off and path/handler are not defined", () => {
      expect(unsafeValidate({ path: "/" }))
        .toThrowError("Endpoint need to have defined at least one middleware method");

      expect(unsafeValidate({ handler: () => 1 }))
      .toThrowError("Endpoint need to have defined path");
    });

    test("it responds with endpoint if it's valid", () => {
      const validEndpoint = {
        path: "/",
        handler: () => "foo",
      };

      const result = unsafeValidate(validEndpoint)();

      expect(result).toEqual(validEndpoint);
    });
  });
});
