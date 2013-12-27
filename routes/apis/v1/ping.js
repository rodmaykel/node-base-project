var model = require('../../../models/ping_model');

module.exports = function(req,res){
	model.check(function(result){
		if (result == -1) {
			res.json(500, {status: 'error'});
		}
		else {
			res.json(200, {status: 'ok'});
		}
	});
};


// there's a ping counter:

// db.counters.insert({ "_id" : "ping", "seq" : 1 });
