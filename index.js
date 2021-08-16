import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import dotProp from 'dot-prop';
import xdm from 'xdm/esbuild.js';

export default async (path, options) => {
    const defaultOptions = {
        defaultReturnValue: {},
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

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
