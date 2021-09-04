export default () => ({
    cacheDirectory: '.jest/cache',
    coverageDirectory: '.jest/coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    resolver: './jest.esm.cjs',
    snapshotResolver: './jest.snapshot.cjs',
    snapshotSerializers: ['jest-snapshot-serializer-raw'],
    transform: {},
});
