const fs = require('fs');

const extractMdxMeta = require('../index');

(async () => {
    const path = 'example/example.mdx';
    const content = fs.readFileSync(path);
    const meta = await extractMdxMeta(content);

    // eslint-disable-next-line no-console
    console.log('meta', meta);
})();
