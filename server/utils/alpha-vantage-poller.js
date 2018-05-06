const axios = require('axios');
const Cron = require('cron');
require('dotenv').config();
const baseurl = process.env.BASE_URL_ALPHA_VANTAGE;
const interval = '1min';
const apikey = process.env.API_KEY_ALPHA_VANTAGE;
const Stock = require('../models/Stock');
const Config = require('../models/Config');
const { symbols } = require('./symbols');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getQuotes() {
  console.log('trying getQuotes'); 
  const quotePromises = [];
  const config = await Config.findOne();
  const canStore = config.stockSaveDone;

  if (canStore) {
    console.log('started getQuotes');
    setCanStoreFlag(true);

    for (let i = 0; i < symbols.length; i++) {
      await sleep(1000);
      let promise;
      try {
        promise = await axios.get(`${baseurl}function=TIME_SERIES_INTRADAY&symbol=${symbols[i]}&interval=${interval}&apikey=${apikey}`);
      } catch (error) {
        console.log(`error in axios.get: called url ${error.config ? error.config.url : ''}, response code and status: ${error.response ? error.response.status : ''} ${error.response ? error.response.statusText : ''}`);
      }
      quotePromises.push(promise);
      if (quotePromises.length === symbols.length / 2) {
        console.log('halfway there!');
      }
    }
    console.log(`got ${quotePromises.length} promises for resolving`);

    let quotes;
    try {
      quotes = await Promise.all(quotePromises);
    } catch (error) {
      console.log('error in promise.all', error);
    }
    const symbolArr = quotes.map((quote) => {
      if (quote && quote.status === 200) {

        const quoteData = quote.data[`Time Series (${interval})`];
        const latestQuoteData = quoteData ? Object.keys(quoteData)[0] : undefined;

        return {
          symbol: quoteData ? quote.data['Meta Data']['2. Symbol'] : undefined,
          latestOpen: quoteData ? quoteData[latestQuoteData]['1. open'] : undefined,
          latestClose: quoteData ? quoteData[latestQuoteData]['4. close'] : undefined,
          latestHigh: quoteData ? quoteData[latestQuoteData]['2. high'] : undefined,
          latestLow: quoteData ? quoteData[latestQuoteData]['3. low'] : undefined
        };
      }
    });
    storeIntoDatabase(symbolArr);
  } else {
    console.log(`can't start getQuotes, canStore is ${canStore}`);
  }
}


async function storeIntoDatabase(symbolArr) {
  console.log('starting mongo storage');

  for (let i = 0; i <= symbolArr.length; i++) {
    const item = symbolArr[i];
    if (item && item.symbol) {
      item.symbol = item.symbol.replace('.', '-');
      const stockEntry = {
        symbol: item.symbol,
        latestOpen: item.latestOpen,
        latestClose: item.latestClose,
        latestHigh: item.latestHigh,
        latestLow: item.latestLow
      };
      let stock;
      try {
        stock = await Stock.findOneAndUpdate({ symbol: item.symbol }, stockEntry, { upsert: true });
      } catch (error) {
        console.log('mongoose persisting failed!', error);
      }
    }
  }

  console.log('mongo storage complete.');
  const allStocks = await Stock.find().count();
  console.log(`stored ${allStocks} symbols with quotes`);
  setCanStoreFlag(true);
}

async function setCanStoreFlag(bool) {
  await Config.findOneAndUpdate(
    { stockSaveDone: { $in: [true, false] }},
    { stockSaveDone: bool },
    { upsert: true }
  );
}

const job = new Cron.CronJob({
  cronTime: '* * * * *',
  onTick: getQuotes
});

function cronJob() {
  console.log('cronJob started');
  job.start();
}

module.exports = { cronJob, getQuotes };