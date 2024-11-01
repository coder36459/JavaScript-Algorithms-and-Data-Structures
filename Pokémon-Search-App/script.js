const resourcesURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
searchBtn.addEventListener("click", () => {
	let item = (searchInput.value).toLowerCase();
	console.log(item)
	fetch(resourcesURL)
	.then((res) => res.json())
	.then((data) => resourcesArray(data.results, item))
	.catch((err) => console.error(err));
	const resourcesArray = (data, item) => {
		const check = (ch) => {
			if (ch < 0) {
				alert("Pokémon not found");
			}
			else {
				alert("Pokémon is found");
			}
		}
		if (Number.isInteger(searchInput.value * 1)) {
			let checkID = data.map(e => e.id).indexOf(Number(item));
			check(checkID);
		}
		else {
			let checkName = data.map(e => e.name).indexOf(item);
			check(checkName);
		}
	}
});
