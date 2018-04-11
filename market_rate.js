var mongoose = require('mongoose');
 
var marketRateModel = function(){
  var marketRateSchema = mongoose.Schema({
    name: String,
    coin: String    
  });
 
  return mongoose.model('MarketRate', marketRateSchema);
};

module.exports = new marketRateModel();