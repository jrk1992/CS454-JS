var config = require('../config.json');
var superagent = require('superagent');
var Firebase = require("firebase");

module.exports = function(app) {
	app.get('/search/shows',function(req,res){
		//document.cookie="text="+req.query.name+"";
		superagent
			.get(config.tvmaze.url +'/search/shows')
			.query({q:  req.query.name})
			.query({format: 'json'})
			.end(function(err,result){
				res.json(result.body)
				
			});
	})

	app.get('/search/show/:id',function (req,res){
		
		superagent
			.get(config.tvmaze.url + 'shows/' +req.params.id)
			.query({embed:  'cast'})
			.query({format: 'json'})
			.end(function(err,result){
				
				res.json(result.body)
				
			})

	})
	
};



