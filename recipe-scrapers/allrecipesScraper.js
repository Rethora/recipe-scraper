"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    let parse = new ParseRecipe();
    const $ = html;

    parse.url(url);
    parse.name($('h1.headline.heading-content').text());
    parse.description($('div.recipe-summary > p').text());

    const ing = [];
    $('span.ingredients-item-name').each((i, el) => {
        ing.push($(el).text());
    });
    parse.ingredients(ing);

    const dir = [];
    $('li.instructions-section-item > div > div > p').each((i, el) => {
        dir.push($(el).text());
    });
    parse.directions(dir);

    $('div.recipe-meta-item').each((i, el) => {
        const key = $(el).children('div.recipe-meta-item-header').text().replace(':', '').toLowerCase();
        const value = $(el).children('div.recipe-meta-item-body').text();
        if (key === 'prep') parse.prepMin(value);
        if (key === 'cook') parse.cookMin(value);
        if (key === 'additional') parse.additionalMin(value);
        if (key === 'total') parse.totalMin(value);
        if (key === 'servings') parse.servings(value);
    });

    const infoSection = $('section.nutrition-section.container > div > div.section-body').text();
    if (infoSection) {
        const nutritionInfo = infoSection.replace(/(^\s)|\. full nutrition/gi, '').toLowerCase();
        nutritionInfo.split('; ').forEach((itm, idx) => {
            if (itm.includes('calories')) parse.calories(itm.split(' ')[0]);
            if (itm.includes('protein')) parse.protein(itm.split(' ')[1]);
            if (itm.includes('carbohydrates')) parse.carbs(itm.split(' ')[1]);
            if (itm.includes('cholesterol')) parse.cholesterol(itm.split(' ')[1]);
            if (itm.includes('sodium')) parse.sodium(itm.split(' ')[1]);
            if (itm.includes('fat')) parse.fat(itm.split(' ')[1]);
        });
    };

    const imgSrc = $('div.image-container').find('div.lazy-image').attr('data-src');
    if (imgSrc) parse.image(imgSrc);

    return parse.recipe();
};