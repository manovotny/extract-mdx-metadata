import {parse, resolve} from 'path';

import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import dotProp from 'dot-prop';
import xdm from 'xdm/esbuild.js';

export default async (path, options) => {
    const {assetPrefix: publicPath, defaultReturnValue} = {
        assetPrefix: undefined,
        defaultReturnValue: {},
        ...options,
    };
    const esbuildOptions = {
        bundle: true,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        entryPoints: [path],
        format: 'cjs',
        plugins: [xdm()],
        write: false,
    };
    const esbuildDataurlOptions = {
        loader: {
            //     '.jpeg': 'dataurl',
            //     '.jpg': 'dataurl',
            //     '.png': 'dataurl',
            //     '.svg': 'dataurl',
        },
    };
    const esbuildAssetPathOptions = {
        // assetNames: '[name]',
        loader: {
            //     '.jpeg': 'file',
            //     '.jpg': 'file',
            //     '.png': 'file',
            //     '.svg': 'file',
        },
        // publicPath,
    };
    const previousWorkingDirectory = process.cwd();
    const resolveFromPath = `${parse(resolve(path)).dir}`;

    process.chdir(resolveFromPath);

    const build = await esbuild.build(esbuildOptions);

    const bundle = dotProp.get(build, 'outputFiles.0.text', {});
    const required = requireFromString(bundle);

    process.chdir(previousWorkingDirectory);

    return required.meta || defaultReturnValue;
};
