import { IncomingMessage } from "http";
import { IEndpoint } from "../endpoint";
import { HTTPMethods } from "../enums/httpMethods";

// TODO: Should omit query params, e.g. "main?foo=bar" when checking path
function checkPath(endpoint: IEndpoint, incomingMessage: Pick<IncomingMessage, "url">): boolean {
  const parsedPatch = `^${endpoint.path.replace(/:\w+|\d+|_+/g, "(\\w+|\\d+)")}/\*$`;
  const matches = new RegExp(parsedPatch).exec(incomingMessage.url || "/");
  return !!matches;
}

function checkMethod(endpoint: IEndpoint, incomingMessage: Pick<IncomingMessage, "method">): boolean {
  return (
    incomingMessage.method === (endpoint.method ? endpoint.method.toUpperCase() : HTTPMethods.GET)
  );
}

export function dispatch(
  endpoints: IEndpoint [],
  incomingMessage: Pick<IncomingMessage, "url" | "method">,
): IEndpoint | undefined {
  const result = endpoints.find((endpoint) => {
    return checkPath(endpoint, incomingMessage) && checkMethod(endpoint, incomingMessage);
  });

  return result;
}
