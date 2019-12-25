import { IRequest } from "./request";

enum BodyTypes {
  JSON = "json",
}

export interface IBodyParserOptions {
  type?: BodyTypes;
  sizeLimit?: number;
}

export function bodyParser(options: IBodyParserOptions = {}) {
  return async (request: IRequest) => {
    let body = "";

    await request.on("data", (data) => {
      body += data;

      if (bodyLimitExceeded(body, options.sizeLimit)) {
        request.connection.destroy();
      }
    });

    request.body = parseBody(body, options.type);
  };
}

// Too much POST data, kill the connection!
// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
function bodyLimitExceeded(body: string, sizeLimit?: number): boolean {
  return (!!sizeLimit && body.length > sizeLimit);
}

function parseBody(body: string, bodyType?: BodyTypes) {
  if (body.length === 0) {
    return {};
  }

  switch (bodyType) {
    case BodyTypes.JSON:
      return JSON.parse(body);
    default:
      return JSON.parse(body);
  }
}
