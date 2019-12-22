import { OutgoingHttpHeaders } from "http";

export interface IResponse {
  status: number; // TODO: Should be HTTP status enum
  headers?: OutgoingHttpHeaders; // TODO: Should be HTTP status enum
  body?: any;
}

export function buildServerResponse(handlerResponse: any): IResponse {
  const response = handlerResponse || {};

  return {
    status: response.status || 200,
    headers: { "Content-Type": "application/json", ...response.headers },
    body: JSON.stringify(response.body || handlerResponse),
  };
}
