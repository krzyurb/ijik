import { OutgoingHttpHeaders } from "http";
import { HTTPStatuses } from "./constraints";

export default class Response {
  public static success(body?: any, headers?: OutgoingHttpHeaders) {
    return new this(HTTPStatuses.OK, body, headers);
  }

  constructor(
    public status: HTTPStatuses | number = HTTPStatuses.OK,
    public body?: any,
    public headers?: OutgoingHttpHeaders,
  ) {}
}
