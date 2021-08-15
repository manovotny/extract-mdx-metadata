const esbuild = require('esbuild');
const requireFromString = require('require-from-string');
const dotProp = require('dot-prop');

module.exports = async (path, options) => {
    const defaultOptions = {
        defaultReturnValue: {},
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

    const {default: xdm} = await import('xdm/esbuild.js');
    const build = await esbuild.build({
        bundle: true,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        entryPoints: [path],
        format: 'cjs',
        loader: {
            '.jpeg': 'dataurl',
            '.jpg': 'dataurl',
            '.png': 'dataurl',
            '.svg': 'dataurl',
        },
        plugins: [xdm()],
        write: false,
    });

    const bundle = dotProp.get(build, 'outputFiles.0.text', {});
    const required = requireFromString(bundle);

    return required.meta || mergedOptions.defaultReturnValue;
};
