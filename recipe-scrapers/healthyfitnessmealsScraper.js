"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    const parse = new ParseRecipe();
    const $ = html;

    parse.url(url);
    parse.name($('h2.wprm-recipe-name').text());
    parse.description($('div.wprm-recipe-summary > span').text());

    const ing = [];
    $('ul.wprm-recipe-ingredients > li.wprm-recipe-ingredient').each((i, el) => {
        $(el).find('label > span.sr-only.screen-reader-text').remove();
        ing.push($(el).text());
    });
    parse.ingredients(ing);

    const dir = [];
    $('div.wprm-recipe-instruction-text').each((i, el) => dir.push($(el).text()));
    parse.directions(dir);

    $('span.wprm-nutrition-label-text-nutrition-container').each((i, el) => {
        const key = $(el).find('span.wprm-nutrition-label-text-nutrition-label')
            .text()
            .toLowerCase()
            .replace(/:/, '')
            .replace(/\s*$/, '');
        const value = $(el).find('span.wprm-nutrition-label-text-nutrition-value').text();
        if (key === 'calories') parse.calories(value);
        if (key === 'carbohydrates') parse.carbs(value);
        if (key === 'protein') parse.protein(value);
        if (key === 'fat') parse.fat(value);
        if (key === 'saturated fat') parse.satFat(value);
        if (key === 'cholesterol') parse.cholesterol(value);
        if (key === 'sodium') parse.sodium(value);
        if (key === 'fiber') parse.fiber(value);
        if (key === 'sugar') parse.sugar(value);
    });

    $('div.wprm-recipe-time-container').each((i, el) => {
        const key = $(el).find('span.wprm-recipe-details-label')
            .text()
            .toLowerCase()
            .replace(/:/, '')
            .replace(/\s*$/, '');
        const value = $(el).find('span.wprm-recipe-time').text();
        if (key === 'prep time') parse.prepMin(value);
        if (key === 'cook time') parse.cookMin(value);
        if (key === 'total time') parse.totalMin(value);
    });

    const tags = [];
    $('div.wprm-recipe-tag-container').each((i, el) => {
        const value = $(el).find('span.wprm-block-text-normal').text().toLowerCase();
        if (value.includes(',')) value.split(/,\s?/).forEach(v => tags.push(v));
        else tags.push(value);
    });
    parse.tags(tags);

    parse.image($('figure.wp-block-image.size-large > img').attr('data-lazy-src'));

    return parse.recipe();
};