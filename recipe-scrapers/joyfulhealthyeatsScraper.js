"use strict";
const ParseRecipe = require("../helpers/ParseRecipe");

module.exports = (html, url) => {
    const $ = html;
    const parse = new ParseRecipe();

    parse.url(url);
    parse.name($('div.tasty-recipes-header-content > h2 > span').text());
    parse.description($('div.tasty-recipes-description > p').text());

    const ing = [];
    $('div.tasty-recipes-ingredients > ul > li').each((i, el) => ing.push($(el).text()));
    parse.ingredients(ing);

    const dir = [];
    $('div.tasty-recipes-instructions > ol > li').each((i, el) => dir.push($(el).text()));
    parse.directions(dir);

    $('div.tasty-recipes-nutrition > ul > li').each((i, el) => {
        const key = $(el).find('strong.tasty-recipes-label').text().toLowerCase().replace(/: *?/, '');
        const value = $(el).find('span').text().replace(/[a-z]*?$/gi, '');

        if (key === 'calories') parse.calories(value);
        if (key === 'protein') parse.protein(value);
        if (key === 'sugar') parse.sugar(value);
        if (key === 'sodium') parse.sodium(value);
        if (key === 'fat') parse.fat(value);
        if (key === 'carbohydrates') parse.carbs(value);
        if (key === 'fiber') parse.fiber(value);
        if (key === 'cholesterol') parse.cholesterol(value);
    });

    const tags = [];
    $('div.tasty-recipes-details > ul > li').each((i, el) => {
        // remove text from noscript tags
        $(el).find('noscript').remove();
        const key = $(el).find('span.tasty-recipes-label')
            .text()
            .toLowerCase()
            .replace(/:/g, '')
            .replace(/^\s*/, '');
        const value = $(el).find('span.tasty-recipes-label')
            .next()
            .text()
            .toLowerCase();

        if (key === 'prep time') parse.prepMin(value);
        if (key === 'cook time') parse.cookMin(value);
        if (key === 'total time') parse.totalMin(value);
        if (key === 'yield') {
            const serve = value.match(/\d+/)[0];
            if (serve) parse.servings(serve);
            // parse.servings(value.match(/\d/)[0])
        };
        if (key === 'category') tags.push(value);
        if (key === 'method') tags.push(value);
        if (key === 'cuisine') tags.push(value);
    });

    if (tags.length > 0) parse.tags(tags);

    parse.image($('header.tasty-recipes-entry-header > div.tasty-recipes-image > img').attr('data-pin-media'));

    console.log(parse.recipe())

    return parse.recipe();
}