function getSearchURL(){
    const input = document.getElementById("foodSearch").value;
    return input;
}

async function foodSearch(){
    const input = document.getElementById("foodSearch").value;
	const response = await fetch(`/spoonacularAPI/${input}`);
    console.log("done")
}