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

function bodyLimitExceeded(body: string, sizeLimit?: number): boolean {
  return !!sizeLimit && body.length > sizeLimit;
}

function parseJSON(body: any): JSON {
  return body.length !== 0 ? JSON.parse(body) : {};
}

function parseBody(body: string, bodyType?: BodyTypes) {
  switch (bodyType) {
    case BodyTypes.JSON:
      return parseJSON(body);
    default:
      return parseJSON(body);
  }
}
