"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];

    $('div.archive-post > a').each((i, el) => {
        const bodyClass = $('body').attr('class');
        if (
            bodyClass.includes('category-travel') ||
            bodyClass.includes('category-meal-plans')
        ) {
            return
        } else urls.push($(el).attr('href'));
    });

    if (urls.length === 0) {
        $('article.post > a').each((i, el) => urls.push($(el).attr('href')));
    };

    return [...new Set(urls)];
};