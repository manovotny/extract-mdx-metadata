import {join} from 'path';

import Chance from 'chance';

import extractMdxMeta from '../index.js';

const chance = new Chance();
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
    });
});

test('should handle react in js files', async () => {
    const path = getFixture('react-js');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({
        prop: 'value',
    });
});

test('should handle react in jsx files', async () => {
    const path = getFixture('react-jsx');

    const meta = await extractMdxMeta(path);

    expect(meta).toMatchObject({
        prop: 'value',
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
    const defaultReturnValue = chance.string();
    const path = getFixture('none');

    const meta = await extractMdxMeta(path, {
        defaultReturnValue,
    });

    expect(meta).toBe(defaultReturnValue);
});
