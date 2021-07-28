"use strict"

const domains = require('./domains');

class GetScraper {
    constructor(base, type) {
        this.base = base;
        this.type = type;
    }

    getScraper() {
        const scraper = domains[this.base];
        if (!scraper) return false;
        else return scraper[this.type];
    }

}

module.exports = GetScraper;