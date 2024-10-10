const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");
const check = d => {
	let a = [], e = d.replace(/[\W_]/g, "").toLowerCase();
	a = e.split("");
	if (d === "") {
		return alert('Please input a value');
	}
	else if (a.length === 1) {
		return result.innerText = d + " is a palindrome";
	}
	else {
		const b = a.reverse().join("");
		if (e === b) {
			return result.innerText = d + " is a palindrome";
		}
		else {
			return result.innerText = d + " is not a palindrome";
		}
	}
}
checkBtn.addEventListener("click", () => check(textInput.value));
