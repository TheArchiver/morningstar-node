const axios = require('axios');
const util  = require('util');

const toIsoDate = (date) => new Date(date).toISOString().replace(/T(.*)/, '');

// url formatting
// ==============

const historicalUrl = (symbol, fromDate, toDate) =>
  util.format('http://globalquote.morningstar.com/globalcomponent'+
    '/RealtimeHistoricalStockData.ashx?ticker=%s&showVol=true&dtype=his&f=d'+
    '&curry=USD&range=%s|%s&isD=true&isS=true&hasF=true'+
    '&ProdCode=DIRECT', symbol, toIsoDate(fromDate), toIsoDate(toDate));

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

const parseDividend = (morningstarDividend) => {
  return {
    date: toIsoDate(morningstarDividend.Date),
    amount: parseFloat(morningstarDividend.Desc.replace(/[a-zA-Z:<>]/g, '')),
    type: morningstarDividend.Type.toLowerCase(),
  }
}

// exported
// ========

const historical = opts =>
  axios.get(historicalUrl(opts.symbol, opts.from, opts.to))
  .then(responseHandler);

const dividend = opts => {
  return historical(opts)
  .then((historical) => {
    return historical.DividendData.map(parseDividend);
  });
}

module.exports = {
  historical: historical,
  dividend: dividend
};
