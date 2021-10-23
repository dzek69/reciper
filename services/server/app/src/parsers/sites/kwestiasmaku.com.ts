import type { CheerioAPI } from "cheerio";
import type { Recipe } from "../types";
import type { ExtendedURL } from "../../utils/ExtendedURL";

const kwestiaSmaku = ($: CheerioAPI, url: ExtendedURL): Recipe => {
    return {
        title: $("h1").eq(0).text(),
        websiteName: "Kwestia Smaku",
        servings: $(".field-name-field-ilosc-porcji").text().trim(),
        description: $(".field-name-field-uwagi-wstepne").text(),
        image: $(".view-zdjecia img").attr("src") || $("meta[property='og:image']").attr("content") || "",
        ingredients: $(".field-name-field-skladniki li").map((_, el) => {
            return $(el).text().trim();
        }).toArray(),
        steps: $(".field-name-field-przygotowanie li").map((_, el) => {
            return $(el).text().trim();
        }).toArray(), // @TODO add wskazówki
    };
};

export {
    kwestiaSmaku,
};
