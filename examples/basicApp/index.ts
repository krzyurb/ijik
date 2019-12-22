import { buildHttpServer } from "../../src/index";
import { IRequest } from "../../src/request";

const app = buildHttpServer();

app.addEndpoint({
  path: "/health",
  handler: async (req: IRequest) => {
    return {
      body: { foo: "bar" },
      status: 200,
    };
  },
});

app.server.listen(3131);
