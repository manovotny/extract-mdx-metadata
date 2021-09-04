import {join} from 'path';

import {wrap} from 'jest-snapshot-serializer-raw';

import extractMdxMeta from '../index.js';

const getFixture = (name) => {
    const directory = new URL('.', import.meta.url).pathname;
    const path = join(directory, 'fixtures', `${name}.mdx`);

    return path;
};

test('should extract meta', async () => {
    const path = getFixture('meta');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should use default return value when no meta exists', async () => {
    const path = getFixture('no-meta');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should use custom return value when no meta exists', async () => {
    const options = {
        defaultReturnValue: undefined,
    };
    const path = getFixture('no-meta');

    const meta = await extractMdxMeta(path, options);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should noop for any other export not named "meta"', async () => {
    const path = getFixture('other');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});
