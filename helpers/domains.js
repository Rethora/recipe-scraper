"use strict"

module.exports = {
    "allrecipes": {
        url: require('../url-scrapers/allrecipesScraper'),
        recipe: require('../recipe-scrapers/allrecipesScraper')
    },
    "eatingwell": {
        url: require('../url-scrapers/eatingwellScraper'),
        recipe: require('../recipe-scrapers/eatingwellScraper')
    },
    "cookinglight": {
        url: require('../url-scrapers/cookinglightScraper'),
        recipe: require('../recipe-scrapers/cookinglightScraper')
    },
    "myrecipes": {
        url: require('../url-scrapers/myrecipesScraper'),
        recipe: require('../recipe-scrapers/myrecipesScraper')
    },
    "skinnytaste": {
        url: require('../url-scrapers/skinnytasteScraper'),
        recipe: require('../recipe-scrapers/skinnytasteScraper')
    },
    "joyfulhealthyeats": {
        url: require('../url-scrapers/joyfulhealthyeatsScraper'),
        recipe: require('../recipe-scrapers/joyfulhealthyeatsScraper')
    },
    "healthyfitnessmeals": {
        url: require('../url-scrapers/healthyfitnessmealsScraper'),
        recipe: require('../recipe-scrapers/healthyfitnessmealsScraper')
    }
};