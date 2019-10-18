import { App } from "../../src/index";
import Response from "../../src/response";
import HelloController from "./helloController";
import { HTTPMethods } from "../../src/constraints";

const config = { appName: "Example app", port: 3001 };

const endpoint1 = new HelloController();

const endpoint2 = {
  path: "/health",
  method: HTTPMethods.GET,
  perform: () => Response.success("ok"),
};

export default new App(config, [endpoint1, endpoint2]);
