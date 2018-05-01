const axios = require('axios');

const apikey = 'IG7GCGFUSUXTXJW0'; // Alpha Vantage
const baseurl = 'https://www.alphavantage.co/query?';
const interval = '1min';

const getQuotes = async (symbolsArr) => {
  const quotePromises = symbolsArr.map(symbol => {
    return axios.get(`${baseurl}function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apikey}`);
  });
  let quotes;
  try {
    quotes = await Promise.all(quotePromises);
  } catch (err) {
    console.log('KARMIA VIRHE!!', err);
    return new Error(err);
  }
  const retArr = quotes.map((quote) => {
    if (quote.status === 200) {

      const quoteData = quote.data[`Time Series (${interval})`];
      const latestQuoteData = quoteData ? Object.keys(quoteData)[0] : undefined;

      return {
        status: quote.status,
        symbol: quoteData ? quote.data['Meta Data']['2. Symbol'] : undefined,
        latestOpen: quoteData ? quoteData[latestQuoteData]['1. open'] : undefined,
        latestClose: quoteData ? quoteData[latestQuoteData]['4. close'] : undefined ,
        latestHigh: quoteData ? quoteData[latestQuoteData]['2. high'] : undefined,
        latestLow: quoteData ? quoteData[latestQuoteData]['3. low'] : undefined
      };
    } else {
      return {
        status: quote.status,
        statusText: quote.statusText
      };
    }
  });
  return retArr;
};

module.exports = { getQuotes };
