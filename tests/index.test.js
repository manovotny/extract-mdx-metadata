import {join} from 'path';

import {wrap} from 'jest-snapshot-serializer-raw';

import extractMdxMeta from '../index.js';

const getFixture = (name) => {
    const directory = new URL('.', import.meta.url).pathname;
    const path = join(directory, 'fixtures', `${name}.mdx`);

    return path;
};

test('should reset working directory when done', async () => {
    const expectedWorkingDirectory = process.cwd();
    const path = getFixture('static');

    await extractMdxMeta(path);

    expect(process.cwd()).toBe(expectedWorkingDirectory);

    expect().toMatchSnapshot();
});

test('should extract static meta', async () => {
    const path = getFixture('static');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should extract dynamic meta', async () => {
    const path = getFixture('dynamic');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should noop for any other export not named "meta"', async () => {
    const path = getFixture('other');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should return build-in return value when no meta exists', async () => {
    const path = getFixture('none');

    const meta = await extractMdxMeta(path);

    expect(wrap(meta)).toMatchSnapshot();
});

test('should return custom return value when no meta exists', async () => {
    const options = {
        defaultReturnValue: undefined,
    };
    const path = getFixture('none');

    const meta = await extractMdxMeta(path, options);

    expect(wrap(meta)).toMatchSnapshot();
});
