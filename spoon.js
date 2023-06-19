const url = 'https://api.apilayer.com/spoonacular/food/menuItems/search?query=pasta';
const options = {
	method: 'GET',
	headers: {
		'apikey': '2qdn5A7f4FaJcEKsSDJ80xaUEX7CPJRl',
	}
};
async function tryAPI(){try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}}



module.exports = tryAPI()
