import { Server } from "http";

import IAppConfig from "./iAppConfig";
import IEndpoint from "./iEndpoint";
import buildServer from "./httpServer";

export default class App {
  private readonly server: Server;
  private readonly logger: any; // TODO: Define type

  constructor(private config: IAppConfig, endpoints: IEndpoint[]) {
    this.logger = this.config.logger || console; // TODO: Create logger that uses any logging object
    this.server = buildServer(this.logger, endpoints, config);
  }

  public listen(callback?: () => void) {
    const { appName, port } = this.config;
    this.server.listen(port, () => {
      this.logger.info(`${appName} app is up at ${port} port`);
      if (callback) {
        callback();
      }
    });
  }

  public close(callback?: () => void) {
    const { appName } = this.config;

    this.server.close(() => {
      this.logger.info(`${appName} app is off`);
      if (callback) {
        callback();
      }
    });
  }
}
