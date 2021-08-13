const rollup = require('rollup');
const mdx = require('rollup-plugin-mdx');
const requireFromString = require('require-from-string');

(async () => {
    const inputOptions = {
        input: 'example/example.mdx',
        plugins: [
            mdx({
                babelOptions: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            }),
        ],
    };
    const outputOptions = {
        format: 'cjs',
    };

    async function build() {
        const bundle = await rollup.rollup(inputOptions);
        const {output} = await bundle.generate(outputOptions);

        await bundle.close();

        return output[0].code;
    }

    const meta = await build();

    console.log('meta', requireFromString(meta).meta);
})();
