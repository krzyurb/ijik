import IEndpoint from "../iEndpoint";

export default (endpoints: IEndpoint[], context?: object): IEndpoint[] => {
  if (context) {
    endpoints.forEach((endpoint) => {
      endpoint.context = context;
    });
  }

  return endpoints;
};
