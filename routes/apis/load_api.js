var version = {};
version.v1 = {
  routes : require('./v1/_api.js')
};
/*
version.v2 = { 
  routes : require('./v2/_api.js')
}
*/

/* 
  NOTE: no need to modify this. Just need to add the api in vx/_api.js
*/


module.exports = {
  execute : function(req, res){
    execute(req.params.method, req, res);       
  }
};

function execute(method, req, res) {
  var instance = version[req.params.version];
  if(typeof instance != 'undefined'){
    if (typeof instance.routes[method] != 'undefined') {
      instance.routes[method](req, res);
    }
    else {
      res.json(404, {error: {code: "404", message: "Invalid API endpoint"}});
    }
  }
  else{
    res.json(404, {error: {code: "404", message: "Invalid API version"}});
  }
}

