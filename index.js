import {parse, resolve} from 'path';

import esbuild from 'esbuild';
import requireFromString from 'require-from-string';
import xdm from 'xdm/esbuild.js';

export default async (path, options) => {
    const {defaultReturnValue} = {
        defaultReturnValue: {},
        ...options,
    };
    const previousWorkingDirectory = process.cwd();
    const resolveFromPath = `${parse(resolve(path)).dir}`;

    process.chdir(resolveFromPath);

    const build = await esbuild.build({
        bundle: true,
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        entryPoints: [path],
        format: 'cjs',
        loader: {
            '.js': 'jsx',
        },
        outdir: 'out',
        plugins: [xdm()],
        write: false,
    });
    const bundle = build.outputFiles.find((file) => file.path.endsWith('.js'));
    const required = requireFromString(bundle.text);

    process.chdir(previousWorkingDirectory);

    return required.meta || defaultReturnValue;
};
