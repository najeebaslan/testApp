const ph = require("../models/ph");
const user = require("../models/users");
const ne = require("../models/ne");
const { MyLogger } = require('../utils/find_utils')
const { PACKAGE,NETWORK,USER,PHONE,GLOBAL,AREA,OFFER } = require('../utils/Error/utils_Errors')

class Search {
  async phoneByNumber(number) {
    await ph.findOne({ number });
  }

  async networkByName(networkName) {
    await ne.find({ name: { $regex: networkName } });
  }
}
model.exports = new Search();

