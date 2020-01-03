import { OutgoingHttpHeaders } from "http";
import { HTTPStatuses } from "./enums/httpStatuses";

export interface IResponse {
  status: HTTPStatuses | number;
  headers?: OutgoingHttpHeaders;
  body?: any;
}

export function buildServerResponse(handlerResponse: any): IResponse {
  const response = handlerResponse || {};

  return {
    status: response.status || 200,
    headers: { "Content-Type": "application/json", ...response.headers }, // TODO: Should be text if string passed
    body: JSON.stringify(response.body || handlerResponse),
  };
}
