var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var companiesSchema = new Schema({
    course: {type: String},
	location: {type: String},
	year: {type: String}
});

module.exports = mongoose.model('Company', companiesSchema);
