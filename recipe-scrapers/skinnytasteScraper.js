"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    const $ = html;
    const parse = new ParseRecipe();

    parse.url(url);
    parse.name($('h2.wprm-recipe-name').text());

    let des = $('div.wprm-recipe-summary > span').text();
    if (!des) des = $('div.wprm-recipe-summary').text();
    parse.description(des);

    parse.description($('div.wprm-recipe-summary > span').text());

    const ing = [];
    $('ul.wprm-recipe-ingredients > li.wprm-recipe-ingredient').each((i, el) => ing.push($(el).text()));
    parse.ingredients(ing);

    const dir = [];
    $('div.wprm-recipe-instruction-text').each((i, el) => dir.push($(el).text()));
    parse.directions(dir);

    $('div.wprm-recipe-meta-container > div.wprm-recipe-block-container').each((i, el) => {
        const itm = $(el).text().toLowerCase();
        const key = itm.split(': ')[0];
        const value = itm.split(': ')[1];

        if (key === 'prep time') parse.prepMin(value);
        if (key === 'cook time') parse.cookMin(value);
        if (key === 'total time') parse.totalMin(value);
        if (key === 'marinate time') parse.additionalMin(value);
    });

    $('div.wprm-nutrition-label-container > span.wprm-nutrition-label-text-nutrition-container').each((i, el) => {
        const key = $(el).find('span.wprm-nutrition-label-text-nutrition-label').text().toLowerCase().replace(':', '').replace(/\s*$/, '');
        const value = $(el).find('span.wprm-nutrition-label-text-nutrition-value').text().toLowerCase();

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

    const serve = $('span.wprm-recipe-servings').text();
    if (serve) parse.servings(serve);

    const tags = [];

    const course = $('span.wprm-recipe-course').text();
    if (course.includes(',')) course.split(', ').forEach(el => tags.push(el));
    else tags.push(course);

    const cuisine = $('span.wprm-recipe-cuisine').text();
    if (cuisine.includes(',')) cuisine.split(', ').forEach(el => tags.push(el));
    else tags.push(cuisine);

    if (tags.length > 0) parse.tags(tags);

    parse.image($('div.wprm-recipe-image').find('img').attr('data-lazy-src'));

    return parse.recipe();

};