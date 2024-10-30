const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
.then((res) => res.json())
.then((data) => {console.log(data.results)})
.catch((err) => console.error(err))
searchBtn.addEventListener("click", () => {
	if (searchInput.value === "Red") {
		alert("Pokémon not found");
	}
	else {
		alert("Pokémon is found");
	}
});
