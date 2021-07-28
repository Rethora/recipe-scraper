"use strict";

class ParseRecipe {
    constructor() {
        this.obj = {};
        this.obj.time = {};
        this.obj.nutr = {};
        this.parseTime = this.parseTime;
    }

    // string
    url(v) {
        this.obj.url = v;
    }

    // string
    name(v) {
        this.obj.name = v;
    }

    // array
    tags(v) {
        this.obj.tags = v;
    }

    // string
    description(v) {
        this.obj.desc = v;
    }

    // array
    ingredients(a) {
        this.obj.ing = a;
    }

    // array
    directions(a) {
        this.obj.dir = a;
    }

    // string || number
    prepMin(v) {
        this.obj.time.prepMin = this.parseTime(v);
    }

    // string || number
    cookMin(v) {
        this.obj.time.cookMin = this.parseTime(v);
    }

    // string || number
    additionalMin(v) {
        this.obj.time.addMin = this.parseTime(v);
    }

    // string || number
    totalMin(v) {
        this.obj.time.totalMin = this.parseTime(v);
    }

    // string || number
    servings(v) {
        this.obj.nutr.serves = Number(v);
    }

    // string || number
    calories(v) {
        const numCals = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.cals = numCals;
    }

    // string || number
    protein(v) {
        const numPro = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gPro = numPro;;
    }

    // string || numberstring || 
    carbs(v) {
        const numCarbs = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gCarbs = numCarbs;
    }

    // string || number
    cholesterol(v) {
        const numCholesterol = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.mgCho = numCholesterol;
    }

    // string || number
    sodium(v) {
        const numSodium = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.mgSodium = numSodium;
    }

    // string || number
    sugar(v) {
        const numSugar = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gSugar = numSugar;
    }

    // string || number
    fiber(v) {
        const numFiber = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gFiber = numFiber;
    }

    // string || number
    fat(v) {
        const numFat = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gFat = numFat;
    }

    // string || number
    satFat(v) {
        const numFat = Number(v.replace(/[a-z]/gi, ''));
        this.obj.nutr.gSatFat = numFat;
    }

    // string
    image(v) {
        this.obj.img = v;
    }

    // returns the completed obj
    recipe(v) {
        return this.obj;
    }

    // returns time value as number in minutes
    parseTime(v) {
        if (v.includes('hours') || v.includes('hr') || v.includes('hrs')) {
            const timeInMin = v.split(' ');
            v = Number(timeInMin[0]) * 60;
            return v;
        } else {
            const timeInMin = v.split(' ');
            return Number(timeInMin[0]);
        }
    }
};

module.exports = ParseRecipe;