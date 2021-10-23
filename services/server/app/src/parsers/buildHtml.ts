import { makeArray } from "bottom-line-utils";
import hehe from "he";

import type { Recipe } from "./types";
import type { ExtendedURL } from "../utils/ExtendedURL";
import { minutesToISO8601Duration } from "../utils/minutesToISO8601Duration.js";

const he = hehe.encode;

const tpl = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>%title%</title>
</head>
<body>
%body%
</body>
</html>
`;

const buildCookTime = (recipe: Recipe) => {
    let time: string;
    try {
        time = minutesToISO8601Duration(recipe.cookTime!);
    }
    catch {
        return "";
    }
    return `<span>Czas gotowania: <meta itemprop="cookTime" content="${time}" />${recipe.cookTime!} minut</span>`;
};

const buildPrepTime = (recipe: Recipe) => {
    let time: string;
    try {
        time = minutesToISO8601Duration(recipe.prepTime!);
    }
    catch {
        return "";
    }
    return `<span>Czas przygotowania: <meta itemprop="prepTime" content="${time}" />${recipe.prepTime!} minut</span>`;
};

// eslint-disable-next-line max-statements
const buildHtml = (recipe: Recipe, url: ExtendedURL) => {
    const instructions = makeArray(recipe.steps)
        .map(step => `<p itemprop="recipeInstructions">${he(step)}</p>`).join("");
    const ingredients = `<ul>`
        + recipe.ingredients.map(i => `<li itemprop="recipeIngredient">${i}</li>`).join("")
        + `</ul>`;

    let time = buildPrepTime(recipe) + buildCookTime(recipe);
    if (time) {
        time = `<p>${time}</p>`;
    }

    let servings = "";
    if (recipe.servings) {
        servings = `<div itemprop="recipeYield">${recipe.servings}</div>`;
    }

    let body = `<div itemscope itemtype="https://schema.org/Recipe">`;
    body += `<h1 itemprop="name">${he(recipe.title)}</h1>`;
    body += time;
    body += servings;
    body += `<p>Przepis z: <a href="${he(url.href)}">${he(recipe.websiteName)}</a></p>`;
    body += `<img itemprop="image" src="${he(recipe.image)}" alt="${he(recipe.title)}" />`;
    body += `<p itemprop="description">${he(recipe.description ?? "")}</p>`;
    body += `<h2>Składniki</h2> ${ingredients}`;
    body += `<h2>Przygotowanie</h2> ${instructions}`;
    body += `</div>`;

    return tpl
        .replace("%title%", recipe.title)
        .replace("%body%", body);
};

export {
    buildHtml,
};
