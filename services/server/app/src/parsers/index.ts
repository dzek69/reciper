import { createError } from "better-custom-error";
import cheerio from "cheerio";
import { ApiClient, RequestType } from "api-reach";

import type { ExtendedURL } from "../utils/ExtendedURL.js";
import { Link } from "../utils/Link.js";
import { buildHtml } from "./buildHtml.js";

import { kwestiaSmaku } from "./sites/kwestiasmaku.com.js";
import { domoweWypieki } from "./sites/domowe-wypieki.pl.js";

const UnsupportedWebsiteError = createError("UnsupportedWebsiteError");

const parsers = {
    "kwestiasmaku.com": kwestiaSmaku,
    "domowe-wypieki.pl": domoweWypieki,
};

const api = new ApiClient({
    type: RequestType.text,
});

const parse = async (url: ExtendedURL) => {
    const [,parser] = Object.entries(parsers).find(([domain]) => {
        return url.isWithinDomain(domain);
    }) || [];
    if (!parser) {
        throw new UnsupportedWebsiteError(`${url.hostname} is not supported yet`);
    }

    const link = new Link(url.href);
    const headers = await link.headers();

    const type = headers.get("content-type");
    const isHtml = type && (type === "text/html" || type.startsWith("text/html;"));

    if (!isHtml) {
        throw new UnsupportedWebsiteError(`${url.pathname} is not supported, is the link valid?`);
    }

    const { body: html } = await api.get(url.href) as { body: string };
    const $ = cheerio.load(html);

    const recipe = parser($, url);
    return buildHtml(recipe, url);
};

export {
    parse,
    UnsupportedWebsiteError,
};
