import ILogger from "./iLogger";

export default interface IAppConfig {
  appName: string;
  port: number;
  logger?: ILogger;
}
