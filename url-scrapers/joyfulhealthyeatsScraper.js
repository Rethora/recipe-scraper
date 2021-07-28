"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];

    $('div.gdlr-core-blog-item-holder.gdlr-core-js-2.clearfix > div > div > div.gdlr-core-blog-grid-content-wrap > h3 > a').each((i, el) => {
        const bodyClass = $('body').attr('class');
        if (bodyClass.match(
            /wellness|gift-guides|beauty|essential-oils|fitness/
        )) return;
        else urls.push($(el).attr('href'));
    });

    return [...new Set(urls)];
};