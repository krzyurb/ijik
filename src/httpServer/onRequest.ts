import { ServerResponse, IncomingMessage } from "http";
import Request from "../request";
import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";
import Response from "../response";

/**
 * Emitted each time there is a request.
 */
export default (logger: ILogger, endpoints: IEndpoint[]) => async (
  httpRequest: IncomingMessage,
  response: ServerResponse,
): Promise<void> => {
  const resp = await dispatch(httpRequest, endpoints);
  if (resp) {
    response.writeHead(resp.status, resp.headers);
    response.end(resp.body);
  } else {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
};

async function buildRequest(httpRequest: IncomingMessage, params: object): Promise<Request> {
  const rawBody = await readRequestBody(httpRequest);
  return new Request(
    httpRequest.url,
    rawBody,
    httpRequest.method,
    params,
  );
}

async function readRequestBody(httpRequest: any) {
  let rawBody = "";
  await httpRequest.on("data", (chunk: ByteLengthChunk) => (rawBody += chunk.toString()));

  return rawBody;
}

async function dispatch(
  httpRequest: IncomingMessage,
  endpoints: IEndpoint[],
): Promise<Response | undefined> { // TODO: Need huuuge refactor
  for (const endpoint of endpoints) {
    const pathParams = endpoint.path.match(/:(\w+|\d+|_+)/g);
    const endpointUrl = endpoint.path.replace(/:\w+|\d+|_+/g, "([^\\/]+)");
    const matches = new RegExp(`^${endpointUrl}$`, "g").exec(httpRequest.url || "");
    if (matches) {
      let params = {};
      if (pathParams) {
        const values = matches.slice(1, pathParams.length + 1);
        params = values.reduce((result: any, field, index) => {
          result[pathParams[index].replace(":", "")] = field;
          return result;
        }, {});
      }

      const request = await buildRequest(httpRequest, params);
      return endpoint.perform(request);
    }
  }
}
