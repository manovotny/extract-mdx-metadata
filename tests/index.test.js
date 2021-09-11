import {join} from 'path';

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
});

test('should extract static meta', async () => {
    const path = getFixture('static');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({
        prop: 'value',
    });
});

test('should extract dynamic meta', async () => {
    const path = getFixture('dynamic');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({
        authors: [
            {
                name: 'Jane Doe',
                twitter: '@janedoe',
                website: 'janedoe.com',
            },
            {
                name: 'John Doe',
                twitter: '@johndoe',
                website: 'johndoe.com',
            },
        ],
        date: '2020-01-01',
    });
});

test('should noop for any other export not named "meta"', async () => {
    const path = getFixture('other');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({});
});

test('should return build-in return value when no meta exists', async () => {
    const path = getFixture('none');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({});
});

test('should return custom return value when no meta exists', async () => {
    const options = {
        defaultReturnValue: undefined,
    };
    const path = getFixture('none');

    const meta = await extractMdxMeta(path, options);

    expect(meta).toBe(undefined);
});
