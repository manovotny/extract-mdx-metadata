import xdm from 'xdm/esbuild.js';
import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import dotProp from 'dot-prop';

export default async (path, options) => {
    const defaultOptions = {
        defaultReturnValue: {},
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

    const build = await esbuild.build({
        entryPoints: [path],
        bundle: true,
        write: false,
        format: 'cjs',
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        loader: {
            '.jpeg': 'dataurl',
            '.jpg': 'dataurl',
            '.png': 'dataurl',
            '.svg': 'dataurl',
        },
        plugins: [xdm()],
    });

    const bundle = dotProp.get(build, 'outputFiles.0.text', {});
    const required = requireFromString(bundle);
    const meta = required.meta;

    console.log('meta', meta);
    return meta;
};
