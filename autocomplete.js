async function autocomplete(){
	console.log("HERE");
	const input = document.getElementById("candySearch").value;
	const response = await fetch(`/autocomplete/${input}`);
	const json = await response.json();
	let html = document.getElementById("results");
	html.innerHTML = "<ul id='resultsList'>";
	for(let i=0; i<json.length; ++i){
		console.log(json[i]);
		html.innerHTML += '<li>'+json[i].competitorname+'</li>';
	}
	html.innerHtml += "</ul>";
}

document.getElementById("candySearch").oninput = autocomplete;