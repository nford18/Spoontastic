const spoon = require('./spoon');
const passport = require('passport');
const json = require('json')

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

    app.get('/spoonacularAPI/', (req, res) =>{
        res.send((tryAPI()))
    });

	async function tryAPI(){try {
		console.log("Hello there")
        console.log(document)
        const input = document.getElementById("foodSearch").value
        console.log(input)
		const response = await fetch((url + input), options);
		const result = await response.json();
	let html = document.getElementById("results");
	html.innerHTML = "<ul id ='listResults'>";
	for(let i=0; i<json.length; ++i){
		console.log(json[i]);
		html.innerHTML += '<li>'+json[i]+'</li>';
	}
	html.innerHtml += "</ul>";
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