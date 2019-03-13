const {parse} = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const mdx = require('@mdx-js/mdx');
const visit = require('unist-util-visit');

module.exports = async (content, options) => {
    const defaultOptions = {
        defaultReturnValue: {}
    };
    const mergedOptions = {
        ...defaultOptions,
        options
    };

    let meta = mergedOptions.defaultReturnValue;

    const result = await mdx(content, {
        mdPlugins: [
            () => (tree) => {
                visit(tree, 'export', (node) => {
                    const ast = parse(node.value, {sourceType: 'module'});

                    traverse(ast, {
                        VariableDeclarator: (path) => {
                            if (path.node.id.name === 'meta') {
                                tree.children = [path.node];
                                console.log('tree.children', tree.children);
                            }
                        }
                    });
                });
            }
        ]
    });
    console.log('result', result);
    return meta;
};
