const fs = require('fs');

const {parse} = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const mdx = require('@mdx-js/mdx');
const visit = require('unist-util-visit');

(async () => {
    const path = 'example/example.mdx';
    const contents = fs.readFileSync(path);

    let meta;

    await mdx(contents, {
        mdPlugins: [
            () => (tree) => {
                visit(tree, 'export', (node) => {
                    const ast = parse(node.value, {plugins: ['jsx'], sourceType: 'module'});

                    traverse(ast, {
                        VariableDeclarator: (path) => {
                            if (path.node.id.name === 'meta') {
                                meta = eval(`module.exports = ${generate(path.node.init).code}`);
                                return;
                            }
                        }
                    });
                });
            }
        ]
    });

    console.log('meta', meta);
    console.log('typeof meta', typeof meta);
})();
