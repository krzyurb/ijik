import { Socket } from "net";
import ILogger from "../iLogger";

/**
 * If a client connection emits an 'error' event, it will be forwarded here.
 * Listener of this event is responsible for closing/destroying the underlying socket.
 * For example, one may wish to more gracefully close the socket with a custom HTTP response
 * instead of abruptly severing the connection.
 * Default behavior is to try close the socket with a HTTP '400 Bad Request',
 * or a HTTP '431 Request Header Fields Too Large' in the case of a HPE_HEADER_OVERFLOW error.
 * If the socket is not writable it is immediately destroyed.
 */
export default (logger: ILogger) => (error: Error, socket: Socket) => {
  // TODO: Need to be implemented
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
};
