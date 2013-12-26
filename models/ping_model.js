var db = require('./_mongodb');
// TODO: make flexible such that the database used e.g. mongodb/mysql is interchangeable

module.exports = {
	check: function (cb) {
		var content = {};
		content.collection = 'counters';
		content.query = {_id: 'ping'};
		content.columns = {};
		db.read(content, function(err, result){
			if (err) {
				cb(-1);
			}
			else {
				cb(0);
			}
		});
	}
};