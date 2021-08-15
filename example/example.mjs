import extractMdxMetadata from '../index.mjs';

(async () => {
    const meta = await extractMdxMetadata('example/example.mdx');

    // eslint-disable-next-line no-console
    console.log('meta', meta);
})();
