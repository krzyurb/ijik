import ijik from "../../src/index";
import { IRequest } from "../../src/request";

const context = ijik({
  appName: "example-ijik-app",
});

const app = ijik({
  port: 3131,
  appName: "example-ijik-app",
});

app.addEndpoint({
  path: "/hello/:name",
  handler: (req: IRequest) => {
    const { params: { name } } = req;
    return `Hello, ${name}!`;
  },
});

app.listen();
