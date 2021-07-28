"use strict";

module.exports = html => {

    const $ = html;
    const urls = [];
    $('div.card__detailsContainer-left > a.card__titleLink').each((idx, el) => urls.push(el.attribs.href));

    if (urls.length === 0) {
        $('a.glide-slide-cta-button').each((idx, el) => urls.push(el.attribs.href));
    }
    return [...new Set(urls)];

};