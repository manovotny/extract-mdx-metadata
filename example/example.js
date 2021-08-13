import xdm from 'xdm/esbuild.js';
import esbuild from 'esbuild';
import requireFromString from 'require-from-string';

(async () => {
    const path = 'example/example.mdx';

    // const content = fs.readFileSync(path, {encoding: 'utf8'});
    // console.log('content', content);

    // const transform = esbuild.transformSync(content);
    // console.log('transform', transform);

    const build = await esbuild.build({
        entryPoints: [path],
        bundle: true,
        write: false,
        format: 'cjs',
        external: ['react/jsx-runtime'],
        plugins: [xdm()],
    });

    console.log('meta', requireFromString(build.outputFiles[0].text).meta);
})();
