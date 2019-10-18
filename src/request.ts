export default class Request {
  constructor(
    public url: string = "",
    private rawBody: string,
    public method: string = "get",
    public params: any,
  ) {}

  get body() {
    return this.rawBody ? JSON.parse(this.rawBody) : {};
  }
}
