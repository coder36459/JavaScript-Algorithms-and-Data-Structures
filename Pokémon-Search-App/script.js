const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
searchInput.value = "Red";
if (searchInput.value === "Red") {
	searchBtn.addEventListener("click", () => {
		alert("Pokémon not found");
	});
}
else if (searchInput.value === "Pikachu") {
	searchBtn.addEventListener("click", () => {
		alert("Pokémon is found");
	});
}
