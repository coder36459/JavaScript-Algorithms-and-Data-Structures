const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const numerals = [[1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]];
let count = 0;
convertBtn.innerText = "Convert";
convertBtn.addEventListener("click", () => {
	const arabic = () => {return number.value * 1;}
	let roman = "";
	if (convertBtn.innerText === "Convert") {
		convertBtn.innerText = "Reset";
		let d = 0;
		count = parseInt(arabic());
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
			for (const x in numerals[0]) {
				if (count % numerals[0][x] != count) {
					d = Math.floor(count / numerals[0][x]);
					if (d > 1) {
						while (d > 0) {
							count -= numerals[0][x];
							roman += numerals[1][x];
							d--;
						}
					}
					else {
						count -= numerals[0][x];
						roman += numerals[1][x];
					}
				}
			}
			return output.innerText = roman, output.style.display = "block";
		}	
	}
	else {
		convertBtn.innerText = "Convert";
		number.value = "";
		output.innerText = "";
		output.style.display = "none";
		roman = "";
	}
});
