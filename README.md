# Rethora Recipe Scraper

## Usage

### Installation

Simply use:  
`npm i rethora-recipe-scraper`  
or...  
`npm install rethora-recipe-scraper`  
  

and require like so:  
`const {ScrapeUrls, ScrapeRecipes} = require('rethora-recipe-scraper')`  

### Scraping Urls by Page Url

With supported pages you can use ScrapeUrls with a string parameter (website url) to retrieve an array of urls that link to recipe pages. Returns a promise.  

### Scraping Recipes by Url

With ScrapeRecipes you can pass a string or array of urls. This returns an object with properties "success" and "skipped". The success property will contain an array of objects of recipes that were successfully scraped. Skipped is an array of urls the scraper was passed but could not get a recipe. Returns a promise.  

## Example Code Snippets  

### Requiring The Module
```
const { ScrapeUrls, ScrapeRecipes } = require('rethora-recipe-scraper);  
```

### Fetching Urls From Page by Category  

```
const { ScrapeUrl } = require('rethora-recipe-scraper');  
  
const exampleUrl = 'https://www.allrecipes.com/recipes/23070/everyday-cooking/cookware-and-equipment/air-fryer/';
const fetchUrls = async url => {
    try {
        const res = await UrlScraper(url);
        console.log(res);
    } catch(error) {
        console.error(error.message);
    }
};  
  
fetchUrls(exampleUrl);  
```  
expected output:  
```
[
    'https://www.allrecipes.com/recipe/270712/air-fryer-coconut-shrimp/',
    'https://www.allrecipes.com/recipe/279984/air-fryer-sweet-and-spicy-roasted-carrots/',
    'https://www.allrecipes.com/recipe/267255/air-fryer-brussels-sprouts/',
    'https://www.allrecipes.com/recipe/277951/air-fryer-bacon-wrapped-scallops-with-sriracha-mayo/',
    'https://www.allrecipes.com/recipe/276831/air-fryer-ranch-pork-chops/',
    'https://www.allrecipes.com/recipe/272858/air-fryer-chicken-thighs/',
    '30 more results...'
]
```

### Fetching Recipes by Url

```
const { ScrapeRecipes } = require('rethora-recipe-scraper');  
  
const exampleUrl = 'https://www.allrecipes.com/recipe/254970/fried-green-tomato-parmesan/;  
  
const fetchRecipes = async url => {
    try {
        const res = await ScrapeRecipes(url);
        console.log(res) // returns object with properties .success & .skipped

        // returns array of successfully scraped recipes
        console.log(res.sucess); 

        // returns array or urls that scraper could not the get recipe for
        console.log(res.skipped); 
    } catch(error) {
        console.error(error.message);
    }
};  
  
fetchRecipes(exampleUrl);
```   

### Chaining ScrapeUrls and ScrapeRecipes  
If you desire, you can chain the two modules together to get an entire array of recipes from recipes category page.  
```
const { ScrapeUrls, ScrapeRecipes } = require('rethora-recipe-scaper');

const exampleUrl = 'https://www.allrecipes.com/recipes/88/bbq-grilling/';

const getRecipes = async url => {
    try {
        // returns an array of urls
        const recipeUrls = await ScapeUrls(url);
        // uses that array to get array of recipes
        const recipes = await ScrapeRecipes(recipeUrls);
        console.log(recipes.success);
    } catch (error) {
        console.error(error.message);
    }
};

getRecipes(exampleUrl);
```

## Recipe Object Structure
```
{
	time: { cookMin: 19, totalMin: 19 },
	nutr: {
		serves: 16,
		cals: 62,
		gFat: 3.2,
		gSatFat: 0.7,
		gPro: 5.4,
		gCarbs: 3.6,
		gFiber: 0.5,
		mgCho: 6,
		mgSodium: 222
	},
	url: 'https://www.myrecipes.com/recipe/smoked-trout-arugula-stacks',
	name: 'Smoked Trout, Arugula, and Granny Smith Stacks',
	desc: 'Crisp apples serve as a base for Smoked Trout, Arugula, and Granny Smith Stacks, lending crunch and flavor to these healthy bites.',
	ing: [
		'1 lemon',
		'12 ounces packaged lemon-pepper smoked trout fillets (such as Ducktrap)',
		'1 ½ cups baby arugula leaves',
		'1 tablespoon fresh lemon juice',
		'1 tablespoon extra-virgin olive oil',
		'3 Granny Smith apples, cut into 32 thin slices'
	],
	dir: [
		'Slice lemon into 4 (1/16-inch) rounds. Cut rounds into 8 wedges.',
		'Remove and discard skin from fish; flake fish.',
		'Combine arugula, juice, and oil in a bowl; toss to coat.',
		'Arrange apple slices in a single layer. Divide arugula mixture and fish evenly among stacks; top each with 1 lemon wedge.'
	],
	img: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F04%2F29%2Fsloppyjoe-2000.jpg'
}
```
(This may differ depending on website data)

## Notice
Depending on what data the recipe url has, some object properties may be excluded from the result! If scraper does not fill enough properties (like name, description, ingredients) it will be excluded from the success array result and the url will be pushed to the skipped array result. Any url that is passed to the ScrapeRecipes module that contains a link with a recipe (and is currently supported) will return a recipe. Some pages that are not supported are pages that contain blogs, articles, links to a page that contains more links to recipes (but not the recipe itself), and a few more. Some results may take a while depending on how many pages are being fetched.

## Bugs
Please report any bugs or functionality issues found to "https://github.com/Rethora/recipe-scraper/issues". I will do my best to work on them. Any feedback or additional websites to include is greatly appreciated. Thanks!

## Dev

### Scripts

`npm start`  
will execute index.js
`npm test`  
will execute tests.js

## Supported Pages (so far...)

https://www.allrecipes.com/  
https://www.cookinglight.com/  
https://www.eatingwell.com/  
https://www.myrecipes.com/  
https://www.skinnytaste.com/  
https://www.joyfulhealthyeats.com/  
https://healthyfitnessmeals.com/