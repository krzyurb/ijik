import { buildHttpServer } from "../../src/index";
import { IRequest } from "../../src/request";
import { bodyParser } from "../../src/bodyParser";

const app = buildHttpServer({
  port: 3131,
  appName: "example-bebop-app",
});

app.addEndpoint({
  path: "/health",
  handler: [
    bodyParser(),
    async (req: IRequest) => {
      return {
        status: 201,
        body: req.body,
      };
    },
  ],
});

app.listen();
