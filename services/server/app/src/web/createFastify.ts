import fastify from "fastify";
import {
    consoleLogger,
    errorHandler,
    validationCompiler,
} from "fastify-toolset";

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const BODY_LIMIT = 100 * 1000;

const createFastify = () => {
    const app = fastify({
        ignoreTrailingSlash: true,
        bodyLimit: BODY_LIMIT,
    });

    consoleLogger(app);
    errorHandler(app);
    validationCompiler(app);

    return app;
};

export {
    createFastify,
};
