"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    const parse = new ParseRecipe();
    const $ = html;

    parse.url(url);
    parse.name($('h1.headline.heading-content').text());
    parse.description($('div.recipe-summary > p').text());

    const ing = [];
    $('span.ingredients-item-name').each((idx, el) => {
        ing.push($(el).text());
    });
    parse.ingredients(ing);

    const dir = [];
    $('div.section-body > div.paragraph > p').each((idx, el) => {
        dir.push($(el).text());
    });
    parse.directions(dir);

    $('div.recipe-meta-item').each((idx, el) => {
        const key = $(el).find('div.recipe-meta-item-header').text().replace(/:/, '').toLowerCase();
        const value = $(el).find('div.recipe-meta-item-body').text();
        if (key === 'active') parse.prepMin(value);
        if (key === 'total') parse.totalMin(value);
        if (key === 'servings') parse.servings(value);
    });

    const infoSection = $('section.nutrition-section.container > div > div.section-body').text();
    if (infoSection) {
        const nutritionInfo = infoSection.replace(' ', '').split('; ');
        nutritionInfo.forEach((itm, idx) => {
            const lastSpace = /\s(?!.*\s)/;
            const key = itm.split(lastSpace)[0];
            let value = itm.split(lastSpace)[1];

            if (idx === nutritionInfo.length - 1) value = value.replace(/\.(?!.*\.)/, '');
            if (value === 'calories') parse.calories(key);
            if (key === 'protein') parse.protein(value);
            if (key === 'carbohydrates') parse.carbs(value);
            if (key === 'sugars') parse.sugar(value);
            if (key === 'dietary fiber') parse.fiber(value);
            if (key === 'fat') parse.fat(value);
            if (key === 'saturated fat') parse.satFat(value);
            if (key === 'cholesterol') parse.cholesterol(value);
        });
    };

    const tags = [];
    $('li.nutrition-profile-item > a').each((idx, el) => {
        tags.push($(el).text().toLowerCase());
    });
    parse.tags(tags);

    let imgSrc = $('div.image-container > div.lazy-image').attr('data-src');
    if (!imgSrc) imgSrc = $('div.jumpstart-video').find('video').attr('poster');
    if (imgSrc) parse.image(imgSrc);

    return parse.recipe();
};