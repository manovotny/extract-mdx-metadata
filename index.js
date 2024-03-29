const {parse} = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const mdx = require('@mdx-js/mdx');
const visit = require('unist-util-visit');

let meta;

// eslint-disable-next-line unicorn/consistent-function-scoping
const extractMdxMetadata = () => (tree) => {
    visit(tree, 'export', (node) => {
        const ast = parse(node.value, {
            plugins: ['jsx'],
            sourceType: 'module',
        });

        traverse(ast, {
            VariableDeclarator: (path) => {
                if (path.node.id.name === 'meta') {
                    // eslint-disable-next-line no-eval, security/detect-eval-with-expression
                    meta = eval(`module.exports = ${generate(path.node.init).code}`);

                    return;
                }
            },
        });
    });
};

module.exports = async (content, options) => {
    const defaultOptions = {
        defaultReturnValue: {},
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };

    meta = mergedOptions.defaultReturnValue;

    await mdx(content, {
        remarkPlugins: [extractMdxMetadata],
    });

    return meta;
};
