"use strict";

const UrlHelper = require('./helpers/UrlHelper');
const Scraper = require('./helpers/Scraper');
const getPageHtml = require('./helpers/getPageHtml');

const ScrapeUrls = async url => {
    try {
        const type = 'url';
        const urlhelper = new UrlHelper(url);
        const base = urlhelper.getBase();
        const scraper = new Scraper(base, type).getScraper();
        if (!scraper) throw new Error(`No supported scrapper for ${url}. Check out "https://www.npmjs.com/package/rethora-recipe-scraper" for supported pages.`);
        const pageHtml = await getPageHtml(url);
        const urls = scraper(pageHtml);
        return urls;
    } catch (error) {
        // console.error(error);
        throw error;
    }
};

const ScrapeRecipes = async urls => {
    const type = 'recipe';
    if (!Array.isArray(urls)) urls = [urls];

    const getRecipe = async url => {
        try {
            const urlhelper = new UrlHelper(url);
            const base = urlhelper.getBase();
            const scraper = new Scraper(base, type).getScraper();
            if (!scraper) return url;
            const pageHtml = await getPageHtml(url);
            if (!pageHtml) return url;
            const recipe = scraper(pageHtml, url);
            return recipe;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    };

    return Promise.all(urls.map(url => getRecipe(url)))
        .then(recipes => {
            const res = {
                skipped: [],
                success: []
            };
            recipes.forEach(r => {
                // all instances to not return recipe
                if (typeof r === 'string') {
                    res.skipped.push(r);
                } else if (
                    r.ing.length === 0 ||
                    !r.name
                ) {
                    res.skipped.push(r.url)
                } else res.success.push(r);
            });
            return res;
        })
        .catch(error => {
            // console.error(error);
            throw error;
        });
};

module.exports = { ScrapeUrls, ScrapeRecipes };