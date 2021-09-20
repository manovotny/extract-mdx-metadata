module.exports = (request, options) =>
    options.defaultResolver(request, {
        ...options,
        packageFilter: (pkg) => {
            return {
                ...pkg,
                main: pkg.module || pkg.main || pkg.exports,
            };
        },
    });
