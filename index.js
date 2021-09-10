import {parse, resolve} from 'path';

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
    const previousWorkingDirectory = process.cwd();
    const resolveFromPath = `${parse(resolve(path)).dir}`;

    process.chdir(resolveFromPath);

    const build = await esbuild.build({
        // assetNames: '[name]',
        bundle: true,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        entryPoints: [path],
        format: 'cjs',
        loader: {
            //     '.jpeg': 'dataurl',
            //     '.jpg': 'dataurl',
            //     '.jpg': 'file',
            //     '.png': 'dataurl',
            //     '.svg': 'dataurl',
        },
        // outdir: 'out',
        plugins: [xdm()],
        // publicPath: 'https://www.example.com/v1',
        write: false,
    });

    const bundle = dotProp.get(build, 'outputFiles.0.text', {});
    const required = requireFromString(bundle);

    process.chdir(previousWorkingDirectory);

    return required.meta || mergedOptions.defaultReturnValue;
};
