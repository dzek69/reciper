import type { RequestGenericInterface, RouteHandler, RouteShorthandOptions } from "fastify";

type OptionsWithHandler<Req = RequestGenericInterface> = [RouteShorthandOptions, RouteHandler<Req>];

export type {
    OptionsWithHandler,
};
