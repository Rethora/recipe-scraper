const assert = require('chai').assert;
const { ScrapeUrls, ScrapeRecipes } = require('./index');

describe('allrecipes.com', () => {
    context('ScrapeUrls()', () => {
        it('should scrape urls from homepage', async () => {
            const url = 'https://www.allrecipes.com/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });

        it('should scrape urls from slideshow pages', async () => {
            const url = 'https://www.allrecipes.com/gallery/vintage-potato-recipes/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });

        it("should scrpae urls from editor's picks pages", async () => {
            const url = 'https://www.allrecipes.com/recipes/85/holidays-and-events/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });

        it('should not scrape urls from pages with no links to recipes', async () => {
            const url = 'https://www.allrecipes.com/food-news-trends/cooks-to-follow/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isEmpty(res);
        });
    });

    context('ScrapeRecipes()', () => {
        it('should scrape recipes from pages with recipes', async () => {
            const url = 'https://www.allrecipes.com/recipe/266826/air-fryer-potato-wedges/';
            const res = await ScrapeRecipes(url);
            assert.isObject(res);
            assert.property(res, 'skipped');
            assert.property(res, 'success');
            assert.isArray(res.skipped);
            assert.isArray(res.success);
            assert.isEmpty(res.skipped);
            assert.isNotEmpty(res.success);
        });

        it('should accept an array argument', async () => {
            const urls = [
                'https://www.allrecipes.com/recipe/265536/air-fried-ratatouille-italian-style/',
                'https://www.allrecipes.com/recipe/273790/summer-fresh-shrimp-kebabs/',
                'https://www.allrecipes.com/recipe/221147/grad-cupcakes/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isObject(res);
            assert.property(res, 'skipped');
            assert.property(res, 'success');
            assert.isArray(res.skipped);
            assert.isArray(res.success);
            assert.isEmpty(res.skipped);
            assert.lengthOf(res.success, 3);
        });

        it('should skip pages with no recipes', async () => {
            const urls = [
                'https://www.allrecipes.com/recipe/265536/air-fried-ratatouille-italian-style/',
                'https://www.allrecipes.com/food-news-trends/cooks-to-follow/',
                'https://www.allrecipes.com/recipe/221147/grad-cupcakes/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isObject(res);
            assert.includeMembers(res.skipped, [urls[1]]);
        });
    });
});

describe('cookinglight.com', () => {
    context('ScrapeUrls()', () => {
        it('should not scrape urls from pages with no recipes', async () => {
            const url = 'https://www.cookinglight.com/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isEmpty(res);
        });

        it('should scrape recipes from pages with links to recipes', async () => {
            const url = 'https://www.cookinglight.com/food/everyday-menus/family-dinner-recipes';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });

        it('should scrape recipes from pages with links to recipes', async () => {
            const url = 'https://www.cookinglight.com/entertaining/menus-for-entertaining/grilled-beef-recipes';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });
    });

    context('ScrapeRecipes()', () => {
        it('should scrape recipes from pages with links to recipes', async () => {
            const url = 'https://www.cookinglight.com/recipes/romesco-sauce-5';
            const res = await ScrapeRecipes(url);
            assert.isObject(res);
            assert.isEmpty(res.skipped);
            assert.isNotEmpty(res.success);
            assert.lengthOf(res.success, 1);
        });

        it('should return recipe for pages with recipes', async () => {
            const urls = [
                'https://www.cookinglight.com/recipes/romesco-sauce-5',
                'https://www.cookinglight.com/recipes/green-goddess-avocado-sauce'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isObject(res);
            assert.isEmpty(res.skipped);
            assert.lengthOf(res.success, 2);
        });

        it('should skip urls that do not have recipes', async () => {
            const urls = [
                'https://www.cookinglight.com/recipes/romesco-sauce-5',
                'https://www.cookinglight.com/recipes/green-goddess-avocado-sauce',
                'https://www.cookinglight.com/food/everyday-menus/family-friendly-dressings-sauces?'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.lengthOf(res.skipped, 1);
            assert.includeMembers(res.skipped, [urls[2]]);
        });
    });
});

describe('eatingwell.com', () => {
    context('ScrapeUrls()', () => {
        it('should not scrape urls from pages with no recipes', async () => {
            const url = 'https://www.eatingwell.com/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isEmpty(res);
        });

        it('should not scrape urls from pages with links to recipes', async () => {
            const url = 'https://www.eatingwell.com/category/4277/pregnancy-diet-center/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isEmpty(res);
        });

        it('should scrape urls from pages with links to recipes', async () => {
            const url = 'https://www.eatingwell.com/recipes/17947/mealtimes/dinner/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isNotEmpty(res);
        });
    });

    context('ScrapeRecipes()', () => {
        it('should not scrape pages with no links to recipes', async () => {
            const url = 'https://www.eatingwell.com/article/7805580/elimination-diet-meal-plan/';
            const res = await ScrapeRecipes(url);
            assert.isEmpty(res.success);
            assert.isNotEmpty(res.skipped);
        });

        it('should accept arrays of urls', async () => {
            const urls = [
                'https://www.eatingwell.com/recipe/7893595/creamy-watermelon-smoothie/',
                'https://www.eatingwell.com/recipe/269496/one-pot-garlicky-shrimp-spinach/',
                'https://www.eatingwell.com/recipe/252108/japanese-cucumber-salad/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 3);
            assert.isEmpty(res.skipped);
        });

        it('should skip urls with no recipes', async () => {
            const urls = [
                'https://www.eatingwell.com/recipe/263346/american-goulash/',
                'https://www.eatingwell.com/recipe/7908233/key-west-inspired-chicken/',
                'https://www.eatingwell.com/recipes/17898/dietary-restrictions/dairy-free-lactose-free/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.includeMembers(res.skipped, [urls[2]]);
        });
    });
});

describe('myrecipes.com', () => {
    context('ScrapeUrls()', () => {
        it('should not scrape urls from pages with no links to recipes', async () => {
            const url = 'https://www.myrecipes.com/';
            const res = await ScrapeUrls(url);
            assert.isArray(res);
            assert.isEmpty(res);
        });

        it('should return array of urls of page that contains links to recipes', async () => {
            const urls = [
                'https://www.myrecipes.com/bread-recipes',
                'https://www.myrecipes.com/desserts/cream-pie-recipes',
                'https://www.myrecipes.com/recipe-finder/easy-dinner-recipes-for-busy-weeknights'
            ];

            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isNotEmpty(r);
            });
        });
    });

    context('ScrapeRecipes()', () => {
        it('should not scrape recipes from pages with no recipes', async () => {
            const urls = [
                'https://www.myrecipes.com/how-to/7-ways-with',
                'https://www.myrecipes.com/ingredients/toasted-bread-crumbs-are-better-than-croutons'
            ];

            const res = await ScrapeRecipes(urls);
            assert.isNotEmpty(res.skipped);
            assert.isEmpty(res.success);
        });

        it('should scrape recipes from page with recipes', async () => {
            const url = 'https://www.myrecipes.com/recipe/white-bean-chili-corn';
            const res = await ScrapeRecipes(url);
            assert.isEmpty(res.skipped);
            assert.isNotEmpty(res.success);
        });

        it('should accept array arguments', async () => {
            const urls = [
                'https://www.myrecipes.com/recipe/cucumber-gazpacho-toasted-croutons',
                'https://www.myrecipes.com/recipe/speedy-cincy-chili',
                'https://www.myrecipes.com/recipe/grilled-gazpacho'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isNotEmpty(res.success);
            assert.isEmpty(res.skipped);
        });

        it('should skip urls that do not have reciepes', async () => {
            const urls = [
                'https://www.myrecipes.com/recipe/cucumber-gazpacho-toasted-croutons',
                'https://www.myrecipes.com/recipe/speedy-cincy-chili',
                'https://www.myrecipes.com/soup-recipes'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.lengthOf(res.skipped, 1);
            assert.includeMembers(res.skipped, [urls[2]]);
        });
    });
});

describe('skinnytaste.com', () => {
    context('ScrapeUrls()', () => {
        it('should return array of urls from url with links to recipes', async () => {
            const urls = [
                'https://www.skinnytaste.com/',
                'https://www.skinnytaste.com/recipes/dessert/',
                'https://www.skinnytaste.com/recipes/',
                'https://www.skinnytaste.com/recipes/whole-30/'
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isNotEmpty(r);
            });
        });

        it('should return empty array for urls with no links to recipes', async () => {
            const urls = [
                'https://www.skinnytaste.com/skinnytaste-meal-plan-july-19-july-25/',
                'https://www.skinnytaste.com/meal-plans/',
                'https://www.skinnytaste.com/travel/'
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isEmpty(r);
            });
        });
    });

    context('ScrapeRecipes()', () => {
        it('accept string arguments and return recipe for valid page', async () => {
            const url = 'https://www.skinnytaste.com/coconut-red-curry-shrimp-skewers/';
            const res = await ScrapeRecipes(url);
            assert.isNotEmpty(res.success);
            assert.isEmpty(res.skipped);
        });

        it('should accept array arguments and return recipes for valid pages', async () => {
            const urls = [
                'https://www.skinnytaste.com/coconut-red-curry-shrimp-skewers/',
                'https://www.skinnytaste.com/roast-chicken-with-rosemary-and-lemon/',
                'https://www.skinnytaste.com/slow-cooker-butternut-pear-soup/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isEmpty(res.skipped)
            assert.lengthOf(res.success, 3);
            assert.isString(res.success[0].img);
        });

        it('should skip page urls with no recipe', async () => {
            const urls = [
                'https://www.skinnytaste.com/chickpea-sweet-potato-stew/',
                'https://www.skinnytaste.com/lasagna-soup/',
                'https://www.skinnytaste.com/recipes/slow-cooker/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.lengthOf(res.skipped, 1);
            assert.includeMembers(res.skipped, [urls[2]]);
        });
    });
});

describe('joyfulhealthyeats.com', () => {
    context('ScrapeUrls()', () => {
        it('should return empty array for url with no links to recipes', async () => {
            const urls = [
                'https://www.joyfulhealthyeats.com/wellness/',
                'https://www.joyfulhealthyeats.com/gift-guides/',
                'https://www.joyfulhealthyeats.com/skirt-steak-with-chimichurri-sauce/',
                'https://www.joyfulhealthyeats.com/photography-tools/'
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isEmpty(r);
            });
        });

        it('should return array of urls for page with links to recipes', async () => {
            const urls = [
                'https://www.joyfulhealthyeats.com/recipes/',
                'https://www.joyfulhealthyeats.com/',
                'https://www.joyfulhealthyeats.com/recipes/side-dishes/'
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isNotEmpty(r);
            });
        });
    });

    context('ScrapeRecipes()', () => {
        it('should not return recipes for links that do not contain recipes', async () => {
            const urls = [
                'https://www.joyfulhealthyeats.com/photography-tools/',
                'https://www.joyfulhealthyeats.com/recipes/healthy-breakfasts/',
                'https://www.joyfulhealthyeats.com/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.skipped, 3);
            assert.isEmpty(res.success);
        });

        it('should skip urls with no recipe', async () => {
            const urls = [
                'https://www.joyfulhealthyeats.com/ground-beef-enchilada-zucchini-boats/',
                'https://www.joyfulhealthyeats.com/15-minute-cauliflower-chicken-fried-rice/',
                'https://www.joyfulhealthyeats.com/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.lengthOf(res.skipped, 1);
            assert.includeMembers(res.skipped, [urls[2]]);
        });

        it('should return recipes for links to recipes', async () => {
            const urls = [
                'https://www.joyfulhealthyeats.com/strawberry-spinach-salad/',
                'https://www.joyfulhealthyeats.com/super-simple-strawberry-vodka-cocktail/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.isEmpty(res.skipped);
            assert.isString(res.success[0].img);
        })
    });
});

describe('healthyfitnessmeal.com', () => {
    context('ScrapeUrls()', () => {
        it('should return empty array for urls with no links to recipes', async () => {
            const urls = [
                'https://healthyfitnessmeals.com/tuscan-stuffed-chicken-breast/',
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isEmpty(r);
            });
        });

        it('should return list of urls to recipes for valid pages', async () => {
            const urls = [
                'https://healthyfitnessmeals.com/blog/',
                'https://healthyfitnessmeals.com/recipe-index/',
            ];
            const res = await Promise.all(urls.map(url => ScrapeUrls(url))).then(data => data);
            res.forEach(r => {
                assert.isArray(r);
                assert.isNotEmpty(r);
            });
        });
    });

    context('ScrapeRecipes()', () => {
        it('should accept single string', async () => {
            const url = 'https://healthyfitnessmeals.com/tuscan-stuffed-chicken-breast/';
            const res = await ScrapeRecipes(url);
            assert.isEmpty(res.skipped);
            assert.isNotEmpty(res.success);
        });

        it('should accept array of urls', async () => {
            const urls = [
                'https://healthyfitnessmeals.com/flourless-peanut-butter-banana-muffins/',
                'https://healthyfitnessmeals.com/pan-seared-salmon-recipe/',
                'https://healthyfitnessmeals.com/tuscan-stuffed-chicken-breast/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.isEmpty(res.skipped);
            assert.lengthOf(res.success, 3);
            assert.isString(res.success[0].img);
        });

        it('should skip urls that are not recipes', async () => {
            const urls = [
                'https://healthyfitnessmeals.com/grilled-avocado-chicken-salad/',
                'https://healthyfitnessmeals.com/easy-chicken-souvlaki/',
                'https://healthyfitnessmeals.com/category/low-carb/'
            ];
            const res = await ScrapeRecipes(urls);
            assert.lengthOf(res.success, 2);
            assert.lengthOf(res.skipped, 1);
            assert.includeMembers(res.skipped, [urls[2]]);
        });
    });
});