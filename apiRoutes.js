//const Candy = require('./candy');
const spoon = require('./spoon');
const passport = require('passport');

function checkAuth(req, res, next){
	if(req.session.user){
		return next();
	}
	res.redirect("/");
}

module.exports = function(app){

    app.get('/spoonacularAPI/:food', (req, res) =>{
        res.send(json(Spoon(req.params)))
    });

	// app.get('/candy/:name',  checkAuth, async (req, res) => {
	// 	const results = await Candy.find({ 
	// 		'competitorname': {
	// 			'$regex' : req.params.name
	// 		}});
	// 	res.render('results', { user: req.user, results: results });
	// });

	// app.get('/autocomplete/:input', checkAuth, async (req, res) => {
	// 	const results = await Candy.find({
	// 		'competitorname': {
	// 			$regex: `^${req.params.input}`
	// 		}
	// 	});
	// 	console.log(results);
	// 	res.json(results);
	// });
}