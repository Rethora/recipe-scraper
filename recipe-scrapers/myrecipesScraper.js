"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    const parse = new ParseRecipe();
    const $ = html;

    parse.url(url);
    parse.name($('h1.headline.heading-content').text());
    parse.description($('div.recipe-summary > p').text());

    $('div.recipe-meta-item').each((i, el) => {
        const key = $(el).find('div.recipe-meta-item-header').text().replace(':', '').toLowerCase();
        const value = $(el).find('div.recipe-meta-item-body').text().toLowerCase();

        const serveMatch = value.toLowerCase().match(/\d+.*?servings/);

        if (key === 'hands-on') parse.cookMin(value);
        if (key === 'cook') parse.cookMin(value);
        if (key === 'prep') parse.prepMin(value);
        if (key === 'active') parse.prepMin(value);
        if (key === 'additional') parse.additionalMin(value);
        if (key === 'total') parse.totalMin(value);
        if (key === 'yield') {
            let serve = false;
            if (value.toLowerCase().includes('serves')) {
                serve = value.toLowerCase().match(/serves \d+/)[0].split(' ')[1];
            } else if (serveMatch) {
                serve = serveMatch[0].match(/\d+/)[0];
            }
            if (serve) parse.servings(serve);
        }
    });

    const ing = [];
    $('span.ingredients-item-name').each((i, el) =>
        ing.push($(el).text().replace(/^\s*/, '').replace(/\s*$/, '')));
    parse.ingredients(ing);

    const dir = [];
    $('li.instructions-section-item').each((i, el) => {
        const p = $(el).find('p').text();
        dir.push(p);
    });
    parse.directions(dir);

    const imgSrc = $('div.lazy-image.lazy-image-udf').attr('data-src');
    if (imgSrc) parse.image(imgSrc);

    const infoSection = $('div.recipe-nutrition-section > div.section-body').text().toLowerCase().replace(/^\s*/, '').replace(/\.\s*$/, '');
    if (infoSection) {
        infoSection.split('; ').forEach(itm => {
            const key = itm.split(/\s(?!.*\s)/)[0];
            const value = itm.split(/\s(?!.*\s)/)[1];

            if (value === 'calories') parse.calories(key);
            if (key === 'fat') parse.fat(value);
            if (key === 'saturated fat') parse.satFat(value);
            if (key === 'protein') parse.protein(value);
            if (key === 'carbohydrates') parse.carbs(value);
            if (key === 'fiber') parse.fiber(value);
            if (key === 'cholesterol') parse.cholesterol(value);
            if (key === 'sodium') parse.sodium(value);
            if (key === 'sugar') parse.sugar(value);
        })
    }

    return parse.recipe();
}