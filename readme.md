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
export const meta = {
    prop: 'value',
};

# Title

Content.
```

And our script, `example.js`, looks as follows:

```js
import extractMdxMetadata from 'extract-mdx-metadata';

(async () => {
    const meta = await extractMdxMetadata('example.mdx');

    console.log('meta', meta);
})();
```

Now, running `node example` yields:

```
meta {
    prop: 'value'
};
```

You can try this yourself by downloading or cloning the project, installing dependencies, and running `npm run example`.

## API

### extractMdxMeta(path, [options])`

Pass a file path to an MDX file and it returns the metadata object.

#### options (optional)

Type: `Object`

##### defaultReturnValue

Type: `*`\
Default: `{}` (empty `Object`)

The value returned if the content does not contain any metadata.

Example:

```js
import extractMdxMetadata from 'extract-mdx-metadata';

(async () => {
    const meta = await extractMdxMetadata('mdx-with-no-metadata.mdx', {
        defaultReturnValue: undefined,
    });

    console.log('meta', meta);
    //=> undefined
})();
```

## FAQ

### Why am I getting a `Must use import to load ES Module` error?

This package is written as a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

If you are trying to this package in a CommonJS (aka. CJS) project, you'll need to use a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) instead.

```js
(async () => {
    const {default: extractMdxMetadata} = await import('extract-mdx-metadata');
    const meta = await extractMdxMetadata('example.mdx');

    console.log('meta', meta);
})();
```

## License

MIT © [Michael Novotny](https://manovotny.com)
