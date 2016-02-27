var constants = require("../constants");

var ChirpStore = module.exports = require("./store").extend({
    init: function(){
        this.bind(constants.GOT_SHIRPS, this.set);
        this.bind(constants.CHIRPED, this.add);
    }
});