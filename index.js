"use strict";

const UrlHelper = require('./helpers/UrlHelper');
const Scraper = require('./helpers/Scraper');
const getPageHtml = require('./helpers/getPageHtml');
const PromisePool = require('@supercharge/promise-pool/dist');

const ScrapeUrls = async url => {
    try {
        const type = 'url';
        const urlhelper = new UrlHelper(url);
        const base = urlhelper.getBase();
        const scraper = new Scraper(base, type).getScraper();
        if (!scraper) return [];
        const pageHtml = await getPageHtml(url);
        if (!pageHtml) return [];
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

    const res = {
        skipped: [],
        success: []
    };

    await PromisePool
        .withConcurrency(3)
        .for(urls)
        .process(async url => {
            const recipe = await getRecipe(url);
            if (typeof recipe === 'string') res.skipped.push(url);
            else if (
                recipe.ing.length === 0 ||
                !recipe.name
            ) res.skipped.push(url);
            else res.success.push(recipe);
        });
    return res;

    // return Promise.all(urls.map(url => getRecipe(url)))
    //     .then(recipes => {
    //         const res = {
    //             skipped: [],
    //             success: []
    //         };
    //         recipes.forEach(r => {
    //             // all instances to not return recipe
    //             if (typeof r === 'string') {
    //                 res.skipped.push(r);
    //             } else if (
    //                 r.ing.length === 0 ||
    //                 !r.name
    //             ) {
    //                 res.skipped.push(r.url)
    //             } else res.success.push(r);
    //         });
    //         return res;
    //     })
    //     .catch(error => {
    //         // console.error(error);
    //         throw error;
    //     });
};

module.exports = { ScrapeUrls, ScrapeRecipes };
