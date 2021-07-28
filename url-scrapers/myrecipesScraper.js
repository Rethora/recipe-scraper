"use strict";

module.exports = html => {
    const $ = html;
    let urls = [];



    // if (urls.length === 0) {
    //     $('h3.headline.heading-content > a').each((i, el) => {
    //         const href = $(el).attr('href');
    //         if (!href.startsWith('https://')) urls.push('https://www.myrecipes.com' + $(el).attr('href'));
    //         else urls.push($(el).attr('href'));
    //     });
    // };

    $('div.glide-slide-desc > p > a').each((i, el) => urls.push($(el).attr('href')));

    $('a.category-page-item-content__title').each((i, el) => urls.push($(el).attr('href')));

    $('div.glide-slide-cta > a.glide-slide-cta-button').each((i, el) => urls.push($(el).attr('href')));

    return [...new Set(urls)];
};