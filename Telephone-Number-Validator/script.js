const test = ["1 555-555-5555", "1 (555) 555-5555", "5555555555", "555-555-5555", "(555)555-5555", "1(555)555-5555", "555-5555", "5555555", "1 555)555-5555", "1 555 555 5555", "1 456 789 4444", "123**&!!asdf#", "55555555", "(6054756961)", "2 (757) 622-7382", "0 (757) 622-7382", "-1 (757) 622-7382", "2 757 622-7382", "10 (757) 622-7382", "27576227382", "(275)76227382", "2(757)6227382", "2(757)622-7382", "555)-555-5555", "(555-555-5555", "(555)5(55?)-5555", "55 55-55-555-5", "11 555-555-5555"];
const checkBtn = document.getElementById("check-btn");
const userInput = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");
const testApp = document.getElementById("test");
checkBtn.addEventListener("click", () => {
	let input = userInput.value;
	let b = input.replace(/[^0-9]/g, "");
	resultsDiv.style.display = "block";
	if (!userInput.value) {
		alert("Please provide a phone number");
	}
	if (input.charAt(0) === "(" && input.charAt(input.length - 1) === ")") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (input.indexOf("?") > 0){
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (b.length < 10 || b.length > 11) {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (input.charAt(0) === "(" && input.charAt(4) !== ")") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (input.charAt(0) !== "(" && input.charAt(3) === ")") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (input.charAt(2) == " ") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (b.length === 11 && b.charAt(0) !== "1") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else if (input.charAt(1) === " " && input.charAt(5) === ")") {
		resultsDiv.innerText = "Invalid US number: " + input;
	}
	else {
		resultsDiv.innerText = "Valid US number: " + input;
	}
});
clearBtn.addEventListener("click", () => {
	resultsDiv.style.display = "none";
	resultsDiv.innerText = "";
	userInput.value = "";
});
const t = () => {let y = ""; for (const x in test) {y += `<div>${test[x]}</div>`} return y;}
testApp.innerHTML = t();
