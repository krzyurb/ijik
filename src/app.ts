import { Server } from "http";

import IAppConfig from "./iAppConfig";
import IEndpoint from "./iEndpoint";
import buildServer from "./httpServer";

export default class App {
  private readonly server: Server;
  private readonly logger: any; // TODO: Define type

  constructor(
    private config: IAppConfig,
    endpoints: IEndpoint[],
    private context?: object,
  ) {
    this.logger = this.config.logger || console; // TODO: Create logger that uses any logging object
    this.server = buildServer(this.logger, endpoints, config, context);
  }

  public listen(callback?: (port?: number, appName?: string) => void) {
    const { appName, port } = this.config;
    return new Promise(() =>
      this.server.listen(port, () => {
        if (callback) {
          callback(port, appName);
        }
      }),
    );
  }

  public close(callback?: (appName?: string) => void) {
    const { appName } = this.config;

    return new Promise(() =>
      this.server.close(() => {
        if (callback) {
          callback(appName);
        }
      }),
    );
  }
}
