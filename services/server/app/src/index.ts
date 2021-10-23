import { rethrow } from "bottom-line-utils";

import { createWebServer } from "./web/index.js";
import { APP_IP, APP_PORT } from "./env.js";

(async () => {
    await createWebServer({
        ip: APP_IP,
        port: APP_PORT,
    });
    console.info("Ready");
})().catch(rethrow);
