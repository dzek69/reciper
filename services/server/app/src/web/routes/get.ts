import type { FastifySchema, RouteHandler, RequestGenericInterface } from "fastify";
import type { OptionsWithHandler } from "../types";

import { ExtendedURL } from "../../utils/ExtendedURL.js";
import { parse, UnsupportedWebsiteError } from "../../parsers/index.js";

const schema: FastifySchema = {
    response: {
        200: {
            type: "object",
            properties: {
                error: {
                    type: "boolean",
                },
            },
        },
    },
};

interface Req extends RequestGenericInterface {}

const handler: RouteHandler<Req> = async function getStarHandler(req, res) {
    let url: ExtendedURL;
    try {
        url = new ExtendedURL(req.url.substr(1));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (e: unknown) {
        throw new this.$errors.BadRequest("No URL");
    }

    let parsed: string;
    try {
        parsed = await parse(url);
    }
    catch (e: unknown) {
        if (e instanceof UnsupportedWebsiteError) {
            throw new this.$errors.BadRequest(e);
        }
        throw new this.$errors.InternalServerError("Parsing error");
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    res.header("Content-Type", "text/html; charset=utf-8");
    await res.send(parsed);
};

export const getStar: OptionsWithHandler<Req> = [{ schema }, handler];

export type {
    Req as getStarReq,
};
