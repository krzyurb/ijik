import { ServerResponse, IncomingMessage } from "http";
import { IEndpoint } from "../endpoint";
import { buildRequest } from "../request";
import { buildServerResponse } from "../response";
import { dispatch } from "./dispatch";

export function requestHandler(endpoints: IEndpoint[]) {
  return async (incomingMessage: IncomingMessage, response: ServerResponse) => {
    const endpoint = dispatch(endpoints, incomingMessage);
    if (!endpoint) {
      response.writeHead(404);
      response.end(`"${incomingMessage.method} ${incomingMessage.url}" path not found`);
      return;
    }

    const request = buildRequest(incomingMessage, endpoint);
    const { handler } = endpoint;
    const middlewaresChain = Array.isArray(handler) ? handler : [handler];

    const reducedChain = middlewaresChain.reduce((acc, func) => {
      return async (req) => {
        const res = await acc(req);
        return res ? res : func(req);
      };
    });

    const chainResults = await reducedChain(request);
    const result = buildServerResponse(chainResults);
    response.writeHead(result.status, result.headers);
    response.end(result.body);
  };
}
