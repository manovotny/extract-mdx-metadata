# extract-mdx-metadata

> Extract MDX metadata without using babel or webpack loaders.

## Installation

### NPM

```
$ npm i extract-mdx-metadata
```

### Yarn

```
$ yarn add extract-mdx-metadata
```

## Usage

Say we have the following file, `example.mdx`:

```
import something from 'something';

export const meta = {
    prop: 'value'
};

# Title

Content.
```

And our script, `example.js`, looks as follows:

```js
const fs = require('fs');

const extractMdxMeta = require('extract-mdx-metadata');

(async () => {
    const path = 'example/example.mdx';
    const content = fs.readFileSync(path);
    const meta = await extractMdxMeta(content);

    console.log('meta', meta);
})();
```

Now, running `node example` yields:

```
meta {
    prop: 'value'
};
```

You can try this yourself by downloading or cloning the project, installing dependencies, and running `yarn example`.

## API

### `extractMdxMeta(content, [options])`

Parses content and returns the metadata object.

#### options

Type: `Object`

##### `defaultReturnValue`

Type: `*`

Default: `{}` (empty `Object`)

The value returned if the content does not contain any metadata.

## License

MIT © [Michael Novotny](https://manovotny.com)
