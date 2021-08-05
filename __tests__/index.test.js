const {join} = require('path');
const {readFileSync} = require('fs');

const {wrap} = require('jest-snapshot-serializer-raw');

const extractMdxMeta = require('../index');

const readFixture = (name) => {
    const path = join(__dirname, 'fixtures', `${name}.mdx`);

    return readFileSync(path);
};

test('should extract meta', async () => {
    const content = readFixture('meta');

    const meta = await extractMdxMeta(content);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should use default return value when no meta exists', async () => {
    const content = readFixture('no-meta');

    const meta = await extractMdxMeta(content);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should use custom return value when no meta exists', async () => {
    const options = {
        defaultReturnValue: undefined,
    };
    const content = readFixture('no-meta');

    const meta = await extractMdxMeta(content, options);

    expect(wrap(meta)).toMatchSnapshot();
});
