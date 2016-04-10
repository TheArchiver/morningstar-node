const axios = require('axios');
const util  = require('util');
const R     = require('ramda');

const toIsoDate = (date) => new Date(date).toISOString().replace(/T(.*)/, '');

// url formatting
// ==============

const historicalUrl = (ticker, fromDate, toDate) =>
  util.format('http://globalquote.morningstar.com/globalcomponent'+
    '/RealtimeHistoricalStockData.ashx?ticker=%s&showVol=true&dtype=his&f=d'+
    '&curry=USD&range=%s|%s&isD=true&isS=true&hasF=true'+
    '&ProdCode=DIRECT', ticker, toIsoDate(fromDate), toIsoDate(toDate));

// response
// ========

const responseHandler = (response) => {
  if (response.status != 200) {
    console.error('morningstar request failed', response);
    throw new Error(response.statusText);
  }
  const cleanedData = response.data.replace(/\bNaN\b/g, "null");
  return JSON.parse(cleanedData);
}

// exported
// ========

const historical = opts =>
  axios.get(historicalUrl(opts.ticker, opts.from, opts.to))
  .then(responseHandler);

module.exports = {
  historical: historical,
};
