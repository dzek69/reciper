import { createFastify } from "./createFastify.js";
import { getStar } from "./routes/get.js";
import type { ConsoleLoggerRequestDecorator, ErrorHandlerInstanceDecorator } from "fastify-toolset";

interface Config {
    port: number;
    ip: string;
}

declare module "fastify" {
    interface FastifyInstance extends ErrorHandlerInstanceDecorator {}
    interface FastifyRequest extends ConsoleLoggerRequestDecorator {}
}

const createWebServer = (config: Config) => {
    const app = createFastify();

    app.get("*", ...getStar);
    return app.listen(config.port, config.ip);
};

export {
    createWebServer,
};
