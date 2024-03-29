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

    const noMeta = await extractMdxMeta(content);

    expect(wrap(noMeta)).toMatchSnapshot();
});

test('should use custom return value when no meta exists', async () => {
    const options = {
        defaultReturnValue: undefined,
    };
    const noMeta = readFixture('no-meta');

    const meta = await extractMdxMeta(noMeta, options);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should noop for any other export not named "meta"', async () => {
    const content = readFixture('other');

    const other = await extractMdxMeta(content);

    expect(wrap(other)).toMatchSnapshot();
});
