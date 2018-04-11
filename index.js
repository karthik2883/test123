var CoinMarketCap = require("node-coinmarketcap");
var Connection = require('./conection');
var MarketRate = require('./market_rate');
var config = require('./config.json');

Connection.config(
  config && config.mongodb && config.mongodb.address ? config.mongodb.address : '', 'crypto',
  config.mongodb && config.mongodb.options ? config.mongodb.options : undefined,
  function (err, message) {
    if (!err) console.info('  - Mongodb is connected');

  }
);
function UpdateIndb() {
  var coinmarketcap = new CoinMarketCap();
  // If you want to check multiple coins, use multi():
  coinmarketcap.multi(coins => {
    console.log(coins.get("BTC").price_usd); // Prints price of BTC in USD
    console.log(coins.get("ETH").price_usd); // Print price of ETH in USD
    var newMarketRate = new MarketRate();
    // Set the user's local credentials
    //First find and update 

    MarketRate.findOneAndUpdate({ name: "ETH" }, { $set: { coin: coins.get("ETH").price_usd } }, { new: true }, function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      if (doc == null) {
        newMarketRate.name = "ETH";
        newMarketRate.coin = coins.get("ETH").price_usd;
        // save the user
        newMarketRate.save(function (err) {
          if (err) {
            console.log('Error in Saving coin: ' + err);
          }
          console.log('done: ' + true);
        });
      }
    });

    MarketRate.findOneAndUpdate({ name: "BTC" }, { $set: { coin: coins.get("BTC").price_usd } }, { new: true }, function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      if (doc == null) {
        newCoin.name = "BTC";
        newCoin.coin = coins.get("BTC").price_usd;
        // save the user
        newCoin.save(function (err) {
          if (err) {
            console.log('Error in Saving coin: ' + err);
          }
          console.log('done: ' + true);
        });
      }
    });

  });

}
setInterval(function () {
  UpdateIndb();
}, 10000);