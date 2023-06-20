const spoon = require('./spoon');
const passport = require('passport');

function checkAuth(req, res, next){
	if(req.session.user){
		return next();
	}
	res.redirect("/");
}

const url = 'https://api.apilayer.com/spoonacular/food/menuItems/search?query=';
const options = {
	method: 'GET',
	headers: {
		'apikey': '2qdn5A7f4FaJcEKsSDJ80xaUEX7CPJRl',
	}
};

module.exports = function(app){

    // app.get('/spoonacularAPI/:food', (req, res) =>{
    //     res.send(json(spoon(req.params)))
    // });

	async function tryAPI(query){try {
		const response = await fetch((url + query), options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}}

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