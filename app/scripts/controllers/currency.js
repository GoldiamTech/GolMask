const ObservableStore = require('obs-store')
const extend = require('xtend')
const currencyInfo = require('../../../old-ui/app/infura-conversion.json')

// every ten minutes
const POLLING_INTERVAL = 600000

class CurrencyController {

  constructor (opts = {}) {
    const initState = extend({
      currentCurrency: 'usd',
      conversionRate: 0,
      conversionDate: 'N/A',
    }, opts.initState)
    this.store = new ObservableStore(initState)
    this.currencies = Object.assign( {}, ...currencyInfo.objects.map( elem => ({ [elem.quote.code] : elem.quote.name }) ))
    this.currenciesReal = new Set(["usd", "aud", "brl", "cad", "chf", "clp", "cny", "czk", "dkk", "eur", "gbp", "hkd", "huf", "idr", "ils", "inr", "jpy", "krw", "mxn", "myr", "nok", "nzd", "php", "pkr", "pln", "rub", "sek", "sgd", "thb", "try", "twd", "zar"])
  }

  //
  // PUBLIC METHODS
  //

  getCurrentCurrency () {
    return this.store.getState().currentCurrency
  }

  setCurrentCurrency (currentCurrency) {
    this.store.updateState({ currentCurrency })
  }

  getConversionRate () {
    return this.store.getState().conversionRate
  }

  setConversionRate (conversionRate) {
    this.store.updateState({ conversionRate })
  }

  getConversionDate () {
    return this.store.getState().conversionDate
  }

  setConversionDate (conversionDate) {
    this.store.updateState({ conversionDate })
  }

  async updateConversionRate () {
    let currentCurrency = this.getCurrentCurrency().toLowerCase()
    console.log(currentCurrency)
    try {
      let response
      let primaryUsd
      let secondaryUsd
      let timestamp
      if(this.currenciesReal.has(currentCurrency)) {
        response = await 
          fetch(`https://api.coinmarketcap.com/v1/ticker/goldiam/?convert=${currentCurrency}`)
          .then( res => res.json() )
        primaryUsd   = Number(response[0][`price_${currentCurrency}`] || response[0].price_usd)
        secondaryUsd = 1
        timestamp    = Number(response[0].last_updated)
      }
      else {
        let secondaryPair = this.currencies[currentCurrency]
        response = await Promise.all([
          fetch(`https://api.coinmarketcap.com/v1/ticker/goldiam`).then( res => res.json() ),
          fetch(`https://api.coinmarketcap.com/v1/ticker/${secondaryPair}`).then( res => res.json() )
        ])
        primaryUsd   = Number(response[0][0].price_usd)
        secondaryUsd = Number(response[1][0].price_usd)
        timestamp    = Number(response[0][0].last_updated)
      }
      console.log(`prim: ${primaryUsd}, secnd: ${secondaryUsd}`)
      this.setConversionRate(primaryUsd/secondaryUsd)
      this.setConversionDate(timestamp)
    } catch (err) {
      log.warn(`MetaMask - Failed to query currency conversion:`, currentCurrency, err)
      this.setConversionRate(0)
      this.setConversionDate('N/A')
    }
  }

  scheduleConversionInterval () {
    if (this.conversionInterval) {
      clearInterval(this.conversionInterval)
    }
    this.conversionInterval = setInterval(() => {
      this.updateConversionRate()
    }, POLLING_INTERVAL)
  }
}

module.exports = CurrencyController
