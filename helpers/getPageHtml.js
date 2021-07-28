"use strict";

const axios = require('axios');
const cheerio = require('cheerio');

const getPageHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = getPageHtml;