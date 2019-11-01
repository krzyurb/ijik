import bebop, { Response, HTTPMethods } from "../../src/index";
import HelloController from "./helloController";

const config = {
  appName: "Example app",
  port: 3001,
  showErrorStack: true,
};

const endpoint1 = new HelloController();

const endpoint2 = {
  config: {
    path: "/health",
    method: HTTPMethods.GET,
  },
  perform: () => Response.success("ok"),
};

export default bebop(config, [endpoint1, endpoint2]);
