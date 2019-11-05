import App from "./app";
import Endpoint from "./endpoint";
import Request from "./request";
import Response from "./response";
import IAppConfig from "./iAppConfig";
import IEndpoint from "./iEndpoint";
import { HTTPMethods } from "./constraints";

export { App, Endpoint, Request, Response, HTTPMethods };

export default function(config: IAppConfig, endpoints: IEndpoint[], context?: object): App {
  return new App(config, endpoints, context);
}
