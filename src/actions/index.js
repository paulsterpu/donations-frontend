let userActions = require('./userActions');
let donationsActions = require('./donationsActions');
let filterActions = require('./filterActions');

module.exports = Object.assign({}, userActions, donationsActions, filterActions);
