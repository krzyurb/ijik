# ijik

Another web framework for Node.js.

## Install

```bash
# install with npm:
npm install krzyurb/ijik

# or with yarn:
yarn add https://github.com/krzyurb/ijik
```

## Usage Example

```js
const { ijik } = require('ijik');

// basic server config
const config = { appName: 'myIjikApp', port: 3131 };

// create application
const app = ijik(config);

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

## Name

> _From Proto-Inuit *irǝ, from Proto-Eskimo *irǝ. Cognate of Greenlandic isi and Inupiaq iri._

<div style="text-align: right">
  source: <a href="https://en.wiktionary.org/wiki/%E1%90%83%E1%94%A8">wiktionary.org</a>
</div>
