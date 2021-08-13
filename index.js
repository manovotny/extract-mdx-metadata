import xdm from 'xdm/esbuild.js';
import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import dotProp from 'dot-prop';

let meta;

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
        plugins: [xdm()],
    });

    // const text = dotProp(build, 'outputFiles.0.text', mergedOptions.defaultReturnValue);
    // console.log('text', text);
    // console.log('meta', requireFromString(build.outputFiles[0].text).meta);
};
