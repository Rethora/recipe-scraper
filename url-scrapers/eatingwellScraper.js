"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];
    $('a.card__titleLink').each((i, el) => urls.push(el.attribs.href));

    $('div.paragraph > p > a').each((idx, el) => urls.push(el.attribs.href));

    $('div.glide-slide-cta > a').each((i, el) => urls.push($(el).attr('href')));

    return [...new Set(urls)];
};