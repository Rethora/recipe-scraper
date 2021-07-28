"use strict";
const ParseRecipe = require('../helpers/ParseRecipe');

module.exports = (html, url) => {
    const parse = new ParseRecipe();
    const $ = html;

    parse.url(url);
    parse.name($('h1.heading-content').text());
    parse.description($('div.recipe-summary > p.margin-0-auto').next().text());

    $('div.recipe-meta-item').each((i, el) => {
        const key = $(el).find('div.recipe-meta-item-header').text().toLowerCase();
        const value = $(el).find('div.recipe-meta-item-body').text().toLowerCase();

        if (key === 'total time') parse.totalMin(value);
        if (key === 'active time') parse.prepMin(value);
        if (key === 'yield') {
            let serve = false;
            if (value.toLowerCase().includes('serves')) {
                serve = value.toLowerCase().match(/serves \d+/)[0].split(' ')[1];
            } else if (value.toLowerCase().includes('servings')) {
                serve = value.toLowerCase().match(/\d+ servings/)[0].split(' ')[0];
            }
            if (serve) parse.servings(serve);
        }
    });

    let ing = [];
    $('div.ingredients > ul > li').each((i, el) => ing.push($(el).text()));
    parse.ingredients(ing);

    let dir = [];
    $('div.recipe-instructions > div.step div.paragraph > p').each((i, el) => dir.push($(el).text()));
    parse.directions(dir);

    $('div.partial.recipe-nutrition > ul > li').each((i, el) => {
        const key = $(el).text().toLowerCase().split(/\s(?!.*\s)/)[0];
        const value = $(el).text().toLowerCase().split(/\s(?!.*\s)/)[1];

        if (key === 'calories') parse.calories(value);
        if (key === 'fat') parse.fat(value);
        if (key === 'satfat') parse.satFat(value);
        if (key === 'protein') parse.protein(value);
        if (key === 'carbohydrate') parse.carbs(value);
        if (key === 'fiber') parse.fiber(value);
        if (key == 'cholesterol') parse.cholesterol(value);
        if (key === 'sodium') parse.sodium(value);
        if (key === 'sugars') parse.sugar(value);
    });

    let imgSrc = $('div.image-container > div.lazy-image').attr('data-src');
    if (!imgSrc) imgSrc = $('div.jumpstart-video').find('video').attr('poster');
    if (imgSrc) parse.image(imgSrc);

    if (ing.length === 0 && dir.length === 0) {
        parse.description($('p.dek').text());

        $('div.paragraph > ul > li').each((i, el) => ing.push($(el).text()));
        parse.ingredients(ing);

        $('div.paragraph > p').each((i, el) => {
            let liItm = $(el).text();
            const stepRe = /^\d+\. ?/;
            if (liItm.match(stepRe)) dir.push(liItm.replace(stepRe, ''));
            else if (liItm.match(/^yield/i)) {
                liItm.toLowerCase().split(/; ?/g).forEach(itm => {
                    const key = itm.match(/\D+/g)[0];
                    const value = itm.match(/\d+/)[0];
                    const cals = itm.match(/calories \d+/);

                    if (cals) parse.calories(cals[0].replace(/\D+/));
                    if (key.match(/yield/i)) parse.servings(value);
                    if (key.match(/fat/)) {
                        parse.fat(value)
                        const satFat = itm.match(/sat \d+/)[0].match(/\d+/)[0];
                        if (satFat) parse.satFat(satFat);
                    };
                    if (key.match(/protein/)) parse.protein(value);
                    if (key.match(/carb/)) parse.carbs(value);
                    if (key.match(/fiber/)) parse.fiber(value);
                    if (key.match(/chol/)) parse.cholesterol(value);
                    if (key.match(/sodium/)) parse.sodium(value);
                    if (key.match(/sugar/)) parse.sugar(value);
                });
            }
        });
        parse.directions(dir);
    };

    return parse.recipe();
};