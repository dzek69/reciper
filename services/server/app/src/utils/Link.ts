import { ApiClient, RequestType } from "api-reach";
import type { Options as ReachOptions } from "api-reach";
import type { ApiResponse } from "api-reach/dist/response/response";

import { ExtendedURL } from "./ExtendedURL.js";

const api = new ApiClient({
    type: RequestType.text,
});

interface Options {
    referer?: "auto" | "none";
}

const defaultOptions: Required<Options> = {
    referer: "auto",
};

class Link {
    private readonly _url: ExtendedURL;

    private _headers: ApiResponse["headers"] | null;

    private readonly _options: Options;

    public constructor(url: string, options?: Options) {
        this._url = new ExtendedURL(url);
        this._headers = null;
        this._options = {
            ...defaultOptions,
            ...options,
        };
    }

    public async headers() {
        if (this._headers) {
            return this._headers;
        }

        const opts: ReachOptions = {};

        if (this._options.referer === "auto") {
            opts.fetchOptions = {
                headers: {
                    Referer: this._url.href,
                },
            };
        }

        const data = await api.head(this._url.href, null, null, opts);
        this._headers = data.headers;
        return this._headers;
    }

    public get url() {
        return this._url;
    }

    public clone(options?: Options) {
        return new Link(this.url.href, options);
    }
}

export {
    Link,
};
