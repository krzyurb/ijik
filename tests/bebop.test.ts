import bebop, { App } from "../src";

describe("bebop", () => {
  test("default method builds bebop app", () => {
    const config = {
      appName: "test",
      port: 3003,
    };

    const app = bebop(config, []);
    expect(app).toBeInstanceOf(App);
  });
});
