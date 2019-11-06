export default class Request {
  constructor(
    public url: string,
    private rawBody: string,
    public method: string,
    public params: any,
  ) {}

  get body() {
    return JSON.parse(this.rawBody);
  }
}
