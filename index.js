import {parse, resolve} from 'path';

import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import xdm from 'xdm/esbuild.js';

export default async (path, options) => {
    const {assetPrefix: publicPath, defaultReturnValue} = {
        assetPrefix: undefined,
        defaultReturnValue: {},
        ...options,
    };
    const assetLoader = publicPath ? 'file' : 'dataurl';
    const previousWorkingDirectory = process.cwd();
    const resolveFromPath = `${parse(resolve(path)).dir}`;

    process.chdir(resolveFromPath);

    const build = await esbuild.build({
        assetNames: '[name]',
        bundle: true,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        entryPoints: [path],
        format: 'cjs',
        loader: {
            '.jpeg': assetLoader,
            '.jpg': assetLoader,
            '.png': assetLoader,
            '.svg': assetLoader,
            '.webp': assetLoader,
        },
        outdir: 'out',
        plugins: [xdm()],
        publicPath,
        write: false,
    });
    const bundle = build.outputFiles.find((file) => file.path.endsWith('.js'));
    const required = requireFromString(bundle.text);

    process.chdir(previousWorkingDirectory);

    return required.meta || defaultReturnValue;
};
