import { buildHttpServer } from "../../src/index";
import { IRequest } from "../../src/request";
import { bodyParser } from "../../src/bodyParser";
const app = buildHttpServer();

app.addEndpoint({
  path: "/health",
  method: "POST",
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

app.server.listen(3131);
