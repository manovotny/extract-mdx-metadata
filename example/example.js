const fs = require('fs');

const {parse} = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const mdxAstToMdxHast = require('@mdx-js/mdx/mdx-ast-to-mdx-hast');
const mdx = require('@mdx-js/mdx');
const visit = require('unist-util-visit');

(() => {
    const path = 'example/example.mdx';
    const contents = fs.readFileSync(path);
    let meta;

    const asdf = mdx.sync(contents, {
        hastPlugins: [
            mdxAstToMdxHast,
            () => (tree) => {
                for (let i = 0; i < tree.children.length; i++) {
                    const {type, value} = tree.children[i];

                    if (type === 'export') {
                        const ast = parse(value, {sourceType: 'module'});

                        traverse(ast, {
                            VariableDeclarator: (path) => {
                                if (path.node.id.name === 'meta') {
                                    meta = eval(`module.exports = ${generate(path.node.init).code}`);
                                    return;
                                }
                            }
                        });
                    }

                    if (meta) {
                        break;
                    }
                }
            }
        ]
    });

    console.log('asdf', asdf);
    console.log('meta', meta);
})();
