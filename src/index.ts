import App from "./app";
import Controller from "./controller";
import Request from "./request";
import Response from "./response";
import IAppConfig from "./iAppConfig";
import IEndpoint from "./iEndpoint";
import { HTTPMethods } from "./constraints";

export { App, Controller, Request, Response, HTTPMethods };

export default function(config: IAppConfig, endpoints: IEndpoint[], context?: object): App {
  return new App(config, endpoints, context);
}
