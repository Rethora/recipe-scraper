"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];
    $('a.card__titleLink').each((i, el) => urls.push(el.attribs.href));

    if (urls.length === 0)
        $('div.paragraph > p > a').each((idx, el) => urls.push(el.attribs.href));

    return [...new Set(urls)];
};