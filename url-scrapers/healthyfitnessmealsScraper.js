"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];

    const recipe = $('main.site-main > article.type-post.entry').find('header.entry-header').text();

    if (!recipe) {
        $('button.post-summary__button > a').each((i, el) => urls.push($(el).attr('href')));

        $('article.type-post.entry > a').each((i, el) => urls.push($(el).attr('href')));
    };

    return [...new Set(urls)];
};