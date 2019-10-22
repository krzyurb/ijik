import { ServerResponse, IncomingMessage } from "http";
import Request from "../request";
import ILogger from "../iLogger";
import IEndpoint from "../iEndpoint";
import Response from "../response";

/**
 * Emitted each time there is a request.
 */
export default (logger: ILogger, endpoints: IEndpoint[]) => async function a(
  this: any,
  httpRequest: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const endpoint = dispatch(httpRequest, endpoints);
  if (!endpoint) {
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Not found");
    return;
  }

  try {
    await performEndpoint(endpoint, httpRequest, response);
  } catch (error) {
    this.emit("error", error, response);
  }
};

async function performEndpoint(
  endpoint: IEndpoint,
  httpRequest: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const request = await buildRequest(httpRequest, endpoint);
  const resp = await endpoint.perform(request);
  if (resp) {
    response.writeHead(resp.status || 200, resp.headers || {});
    response.end(resp.body);
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end();
  }
}

function dispatch(
  httpRequest: IncomingMessage,
  endpoints: IEndpoint[],
): IEndpoint | null {
  for (const endpoint of endpoints) {
    const pathParams = endpoint.path.match(/:(\w+|\d+|_+)/g);
    const endpointUrl = endpoint.path.replace(/:\w+|\d+|_+/g, "([^\\/]+)");
    const matches = new RegExp(`^${endpointUrl}$`, "g").exec(httpRequest.url || "");
    if (matches) {
      return endpoint;
    }
  }

  return null;
}

async function buildRequest(httpRequest: IncomingMessage, endpoint: IEndpoint): Promise<Request> {
  let params = {};
  const pathParams = endpoint.path.match(/:(\w+|\d+|_+)/g);
  const endpointUrl = endpoint.path.replace(/:\w+|\d+|_+/g, "([^\\/]+)");
  const matches = new RegExp(`^${endpointUrl}$`, "g").exec(httpRequest.url || "");
  if (matches && pathParams) {
    const values = matches.slice(1, pathParams.length + 1);
    params = values.reduce((result: any, field, index) => {
      result[pathParams[index].replace(":", "")] = field;
      return result;
    }, {});
  }

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
