"use strict";

module.exports = html => {
    const $ = html;
    const urls = [];

    $('div.glide-slide-cta > a').each((i, el) => urls.push($(el).attr('href')));

    return [...new Set(urls)];
}