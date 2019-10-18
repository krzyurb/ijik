export default interface ILogger {
  info(message: string, ...args: any): null;
  warn(message: string, ...args: any): null;
  error(message: string, ...args: any): null;
  // TODO: And so on...
}
