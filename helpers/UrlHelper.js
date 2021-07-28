"use strict";

class UrlHelper {
    constructor(url) {
        this.url = url;
    }

    getBase() {
        const re = {
            b: /^(https?:\/\/)?(www\.)?/gi,
            e: /(\.com|\.org|\.net).*/gi
        };
        return this.url.replace(re.b, '').replace(re.e, '');
    }
};

module.exports = UrlHelper;