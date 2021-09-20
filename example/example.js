import extractMdxMetadata from '../index.js';

(async () => {
    const meta = await extractMdxMetadata('example/example.mdx');

    // eslint-disable-next-line no-console
    console.log('meta', meta);
})();
