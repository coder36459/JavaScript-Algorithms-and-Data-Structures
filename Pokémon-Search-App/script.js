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
const spritesIMG = document.getElementById("sprites-img");
searchBtn.addEventListener("click", () => {
	let item = (searchInput.value).toLowerCase();
	//console.log(item)
	fetch(resourcesURL)
	.then((res) => res.json())
	.then((data) => resourcesArray(data.results, item))
	.catch((err) => console.error(err));
	const resourcesArray = (data, item) => {
		const check = (ch, i) => {
			if (ch < 0) {
				alert("Pokémon not found");
				console.log(i);
			}
			else {
				alert("Pokémon is found");
				const resourcesURLNameOrID = resourcesURL + "/" + i;
				fetch(resourcesURLNameOrID)
				.then((res) => res.json())
				.then((data) => {
					pokemonName.innerText = data["name"];
					pokemonID.innerText = data["id"];
					weight.innerText = data["weight"];
					height.innerText = data["height"];
					types.innerText = (data["types"][0]["type"]["name"]).toUpperCase();
					hp.innerText = data["stats"][0]["base_stat"];
					attack.innerText = data["stats"][1]["base_stat"];
					defense.innerText = data["stats"][2]["base_stat"];
					specialAttack.innerText = data["stats"][3]["base_stat"];
					specialDefense.innerText = data["stats"][4]["base_stat"];
					speed.innerText = data["stats"][5]["base_stat"];
					spritesIMG.innerHTML = `<img id="sprite" src="${data["sprites"]["front_default"]}">`;
					console.log("pokemon-name", data["name"])
					console.log("pokemon-id", data["id"])
					console.log("weight", data["weight"])
					console.log("height", data["height"])
					console.log("hp", data["stats"][0]["base_stat"])
					console.log("attack", data["stats"][1]["base_stat"])
					console.log("defense", data["stats"][2]["base_stat"])
					console.log("special-attack", data["stats"][3]["base_stat"])
					console.log("special-defense", data["stats"][4]["base_stat"])
					console.log("speed", data["stats"][5]["base_stat"])
					console.log("types", data["types"][0]["type"]["name"])
					console.log("sprites", data["sprites"]["front_default"])
					})
				.catch((err) => console.error(err));
				console.log(resourcesURLNameOrID);
			}
		}
		if (Number.isInteger(searchInput.value * 1)) {
			let checkID = data.map(e => e.id).indexOf(Number(item));
			check(checkID, item);
		}
		else {
			let checkName = data.map(e => e.name).indexOf(item);
			check(checkName, item);
		}
	}
});
