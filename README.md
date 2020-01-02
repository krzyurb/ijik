# Bebop

Another web framework for Node.js.

## Install

```bash
# install with npm:
npm install krzyurb/bebop

# or with yarn:
yarn add https://github.com/krzyurb/bebop
```

## Usage Example

```js
const { buildBebop } = require('bebop');

// basic server config
const config = { appName: 'myBebopApp', port: 3131 };

// create application
const app = buildBebop(config);

// define endpoint
app.addEndpoint({
  path: "/hello/:name",
  handler: (req: IRequest) => {
    const { params: { name } } = req;
    return `Hello, ${name}!`;
  },
});

// run server
app.listen();
```
