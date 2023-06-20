const url = 'https://api.apilayer.com/spoonacular/food/menuItems/search?query=';
const options = {
	method: 'GET',
	headers: {
		'apikey': '2qdn5A7f4FaJcEKsSDJ80xaUEX7CPJRl',
	}
};
async function tryAPI(query){try {
	const response = await fetch((url + query), options);
	const result = await response.json();
	let html = document.getElementById("results");
	html.innerHTML = "<ul id ='listResults'>";
	for(let i=0; i<json.length; ++i){
		console.log(json[i]);
		html.innerHTML += '<li>'+json[i].competitorname+'</li>';
	}
	html.innerHtml += "</ul>";
	console.log(result);

} catch (error) {
	console.error(error);
}}

module.exports = tryAPI
