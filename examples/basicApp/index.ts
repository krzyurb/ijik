import bebop from "../../src/index";
import { IRequest } from "../../src/request";

const app = bebop({
  port: 3131,
  appName: "example-bebop-app",
});

app.addEndpoint({
  path: "/hello/:name",
  handler: (req: IRequest) => {
    const { params: { name } } = req;
    return `Hello, ${name}!`;
  },
});

app.listen();
