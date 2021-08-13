import extractMdxMetadata from '../index.js';

(async () => {
    const meta = await extractMdxMetadata('example/example.mdx');

    console.log('meta', meta);
})();
