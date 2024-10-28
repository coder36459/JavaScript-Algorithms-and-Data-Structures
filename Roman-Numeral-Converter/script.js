document.body.innerHTML = `<main><header><h1>Roman Numeral Converter</h1></header><section><input id="number" type="text"><button id="convert-btn"></button><button id="reset-btn"></button><div id="output"></div></section></main>`;
const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const resetBtn = document.getElementById("reset-btn");
const numerals = [[1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]];
const arabic = () => {
	return number.value * 1;
}
const reset = () => {
	convertBtn.style.display = "inline-block";
	convertBtn.innerText = "Convert";
	resetBtn.style.display = "none";
	number.value = "";
	output.innerText = "";
	output.style.display = "none";
}
const create = () => {
	convertBtn.style.display = "none";
	resetBtn.style.display = "inline-block";
	resetBtn.innerText = "Reset";
}
reset();
convertBtn.addEventListener("click", () => {
	create();
	if (!arabic()) {
		output.innerText = "Please enter a valid number";
		output.style.display = "block";
	}
	else if (arabic() <= 0) {
		output.innerText = "Please enter a number greater than or equal to 1";
		output.style.display = "block";
	}
	else if (arabic() >= 4000) {
		output.innerText = "Please enter a number less than or equal to 3999";
		output.style.display = "block";
	}
	else {
		const convertToRoman = (num) => {
			let count = num, roman = "";
			for (const x in numerals[0]) {
				let isItPossible = count % numerals[0][x];
				let division = Math.floor(count / numerals[0][x]);
				const addToString = () => {
					count -= numerals[0][x];
					roman += numerals[1][x];
				}
				if (count !== isItPossible) {
					if (count === numerals[0][x]) {
						addToString();
					}
					else {
						if (division >= 2) {
							count -= division * numerals[0][x];
							roman += numerals[1][x].repeat(division);
						}
						else {
							addToString();
						}
					}
				}
			}
			return output.innerText = roman, output.style.display = "block";
		}
		convertToRoman(arabic());
	}
});
resetBtn.addEventListener("click", () => {
	reset();
	roman = "";
});
