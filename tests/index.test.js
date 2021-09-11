import {join} from 'path';

import validDataUrl from 'valid-data-url';

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
    });
});

test('should extract jpeg as dataurl', async () => {
    const path = getFixture('jpeg');

    const {image} = await extractMdxMeta(path);

    expect(image).toStartWith('data:image/jpeg');
    expect(validDataUrl(image)).toBeTrue();
});

test('should extract jpg as dataurl', async () => {
    const path = getFixture('jpg');

    const {image} = await extractMdxMeta(path);

    expect(image).toStartWith('data:image/jpeg');
    expect(validDataUrl(image)).toBeTrue();
});

test('should extract png as dataurl', async () => {
    const path = getFixture('png');

    const {image} = await extractMdxMeta(path);

    expect(image).toStartWith('data:image/png');
    expect(validDataUrl(image)).toBeTrue();
});

test('should extract svg as dataurl', async () => {
    const path = getFixture('svg');

    const {image} = await extractMdxMeta(path);

    expect(image).toStartWith('data:image/svg');
    expect(validDataUrl(image)).toBeTrue();
});

test('should extract webp as dataurl', async () => {
    const path = getFixture('webp');

    const {image} = await extractMdxMeta(path);

    expect(image).toStartWith('data:image/webp');
    expect(validDataUrl(image)).toBeTrue();
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
