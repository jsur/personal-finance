const axios = require('axios');
const firebase = require('firebase');
const cron = require('cron');
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
};
const baseurl = process.env.BASE_URL_ALPHA_VANTAGE;
const interval = '1min';
const apikey = process.env.API_KEY_ALPHA_VANTAGE;
const { symbols } = require('./symbols');

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getQuotes() {
  console.log('trying getQuotes'); 
  const quotePromises = [];
  const canStoreSnapShot = await db.ref('config/latestStorage').once('value');
  const canStore = canStoreSnapShot.val().done;

  if (canStore) {
    console.log('started getQuotes');
    setFirebaseDoneFlag(false);

    for (let i = 0; i < symbols.length; i++) {
      await sleep(1000);
      let promise;
      try {
        promise = await axios.get(`${baseurl}function=TIME_SERIES_INTRADAY&symbol=${symbols[i]}&interval=${interval}&apikey=${apikey}`);
      } catch (error) {
        console.log(`error in axios.get: called url ${error.config ? error.config.url : ''}, response code and status: ${error.response ? error.response.status : ''} ${error.response ? error.response.statusText : ''}`);
      }
      quotePromises.push(promise);
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
    storeIntoFirebase(symbolArr);
  } else {
    console.log(`canStore is ${canStore}, can't update data.`);
  }

}

async function storeIntoFirebase(symbolArr) {
  console.log('starting firebase storage');

  for (let i = 0; i <= symbolArr.length; i++) {
    await sleep(750);
    const item = symbolArr[i];
    if (item && item.symbol) {
      item.symbol = item.symbol.replace('.', '-');
      const timestamp = new Date();
      const obj = {
        timestamp: timestamp.toString(),
        latestOpen: item.latestOpen,
        latestClose: item.latestClose,
        latestHigh: item.latestHigh,
        latestLow: item.latestLow
      };
      await db.ref(`stocks/${item.symbol}`).set(obj);
    }
  }

  console.log('firebase storage complete.');
  const stocksSnapShot = await db.ref('stocks').once('value');
  const stocksLength = Object.keys(stocksSnapShot.val()).length;
  console.log(`current stock count: ${stocksLength}`);
  setFirebaseDoneFlag(true);
}

const job = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: getQuotes
});

function setFirebaseDoneFlag(bool) {
  const timestamp = new Date();
  db.ref('config/latestStorage').set({
    done: bool,
    timestamp: timestamp.toString()
  });
}

function cronJob() {
  console.log('cronJob started');
  job.start();
}

module.exports = { cronJob, getQuotes };