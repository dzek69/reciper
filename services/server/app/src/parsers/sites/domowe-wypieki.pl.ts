import type { CheerioAPI } from "cheerio";
import type { Recipe } from "../types";
import type { ExtendedURL } from "../../utils/ExtendedURL";

import { dontThrow } from "../../utils/dontThrow.js";
import { parsePolishTime } from "../../utils/parsePolishTime.js";

// eslint-disable-next-line max-lines-per-function
const domoweWypieki = ($: CheerioAPI, url: ExtendedURL): Recipe => {
    let prepTime = 0, cookTime = 0, servings = "";

    const table = $("#position-after-recipe-instructions").nextAll("table").eq(0);
    table.find("tr").each((_, tr) => {
        const [,name, value] = $(tr).children().map((__, td) => $(td).text().trim()).toArray();

        const n = name.toLowerCase();
        if (n.includes("porcji")) {
            servings = value;
            return;
        }
        if (n.includes("przygotowania")) {
            prepTime = parsePolishTime(value);
            return;
        }
        if (n.includes("pieczenia") || n.includes("gotowania")) {
            cookTime = parsePolishTime(value);
        }
    });

    const ret: Recipe = {
        title: $("h2").text(),
        description: $("#position-after-recipe-description").prev().text(),
        websiteName: "Domowe Wypieki",
        image: (
            dontThrow(() => url.createFromRelative($(".articleBody img").attr("data-src")).href)
            || $("meta[property='og:image']").attr("content")
            || ""
        ),
        ingredients: $("#position-recipe-adv-1").nextUntil("#position-after-recipe-ingredients").map((_, el) => {
            if (el.name === "ul") {
                return $(el).children("li").map((__, li) => {
                    return $(li).text().trim();
                }).toArray();
            }
            if (($(el).attr("id") || "").startsWith("position-")) {
                return;
            }

            return "---" + $(el).text().replace(/Składniki:/gi, "") + "---";
        }).toArray().flat().filter(Boolean),
        steps: $("#position-after-recipe-ingredients").nextUntil(".position-after-recipe-instructions").map((_, el) => {
            return $(el).find("li").map((__, li) => {
                return $(li).text().trim();
            }).toArray();
        }).toArray().flat().filter(Boolean),
    };

    if (servings) {
        ret.servings = servings;
    }
    if (cookTime) {
        ret.cookTime = cookTime;
    }
    if (prepTime) {
        ret.prepTime = prepTime;
    }
    return ret;
};

export {
    domoweWypieki,
};
