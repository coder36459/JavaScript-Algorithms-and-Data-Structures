const displayCash = document.getElementById("cash");
const displayPrice = document.getElementById("display-price");
const displayDue = document.getElementById("display-due");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const testBtn = document.getElementById("test-btn");
const resetBtn = document.getElementById("reset-btn");
const displayCID = document.getElementById("display-cid");
const displayTotalCashInDrawer = document.getElementById("total-cash-in-drawer");
const displaySolution = document.getElementById("solution");
const tip = document.getElementById("tip");
const test = [
[20, 1.87, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]],
[20, 19.5, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]],
[100, 3.26, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]],
[20, 19.5, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]],
[20, 19.5, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]],
[20, 19.5, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]]
];
let cash = displayCash.value, price = displayPrice.value, cid = test[0][2], cidBefore, t, btn;
const amount = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
const reverseCID = d => {
	let r = [];
	for (const x in test[d][2]) {
		r.unshift(test[d][2][x]);
	}
	return r;
}
const cashValue = () => {
	return displayCash.value * 1;
}
const priceValue = () => {
	return displayPrice.value * 1;
}
const roundToTwoDecimalPlaces = num => {
	return Math.round((num + Number.EPSILON) * 100) / 100;
}
const sumArray = data => {
	let sum = 0;
	for (const x in data) {
		sum += data[x][1];
	}
	return roundToTwoDecimalPlaces(sum);
}
const status = a => {
	let s = "";
	for (const x in a) {
		s +=  a[x][0] + ": " + "$"+a[x][1] + ", ";
	}
	return s;
}
const reset = () => {
	cid = reverseCID(0);
	cidBefore = sumArray(cid);
	displayCash.value = test[0][0];
	displayPrice.value = test[0][1];
	displayDue.value = "";
	changeDue.innerText = "Status: READY";
	displayCID.innerText = "Total cash in drawer: $" + sumArray(cid);
	displayTotalCashInDrawer.innerText = status(cid);
	displaySolution.innerText = "";
	displaySolution.style.display = "none";
	resetBtn.innerText = "Reset";
	testBtn.innerText = "Test";
	t = 0;
	btn = 0;
}
reset();
purchaseBtn.addEventListener("click", () => {
	if (btn === 0) {
		let chd = [], d = 0, d1 = 0, m = 0, n = 0;
		if (cashValue() < priceValue()) {
			alert("Customer does not have enough money to purchase the item.");
		}
		else if (cashValue() === priceValue()) {
			changeDue.innerText = "No change due - customer paid with exact cash.";
		}
		else {
			let due = (cashValue() - priceValue()) * 100;
			for (const x in cid) {
				const coinsBills = () => {
					if (n > 0) {
						chd.push([cid[x][0], roundToTwoDecimalPlaces(n)]);
					}
					n = 0;
				}
				const item = i => {
					while (i > 0) {
						due -= amount[x];
						m -= amount[x];
						n += v;
						cid[x][1] = roundToTwoDecimalPlaces(cid[x][1] - v);
						i--;
					}
				}
				let v = roundToTwoDecimalPlaces(amount[x]/100);
				m = roundToTwoDecimalPlaces(cid[x][1]) * 100;
				if (due % amount[x] !== due) {
					d = Math.floor(due / amount[x]);
					d1 = m / amount[x];
					if (d * amount[x] > m) {
						item(d1);
						coinsBills(n);
					}
					else {
						item(d);
						coinsBills(n);
					}
				}
			}
			if (cidBefore !== sumArray(chd) && cashValue() - priceValue() === sumArray(chd)) {
				changeDue.innerText = "Status: OPEN\n" + status(chd);
			}
			else if (cidBefore === sumArray(chd) && cashValue() - priceValue() === sumArray(chd)) {
				changeDue.innerText = "Status: CLOSED\n" + status(chd);
			}
			else {
				changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
			}
		}
		if (cashValue() !== "" && cashValue() >= priceValue()) {
			displayDue.value = roundToTwoDecimalPlaces(cashValue() - priceValue());
		}
		displaySolution.innerText = "Below you will find more details.\n\n";
		displaySolution.style.display = "block";
		btn++;
	}
});
const tooltip = (id, text) => {
	id.addEventListener("mouseover", () => {
		tip.style.visibility = "visible";
		tip.style.left = "50%";
		tip.style.top = "0px";
		tip.style.transform = "translateX(-50%)";
		tip.style.backgroundColor = "rgba(250,216,250.7)";
		tip.innerText = text;
	});
	id.addEventListener("mouseout", () => {
		tip.style.visibility = "hidden";
	});
}
tooltip(displayCash, "The amount of cash provided by the customer for the item.");
tooltip(displayPrice, "The price of the item.");
tooltip(displayDue, "Refund of change to the customer based on the price of the item.");
tooltip(displayTotalCashInDrawer, "The amount of cash in the cash drawer.");
const numberOfTest = () => {
	displayCash.value = test[t][0];
	displayPrice.value = test[t][1];
	displayDue.value = "";
	cid = reverseCID(t);
	cidBefore = sumArray(cid);
	displayCID.innerText = "Total cash in drawer: $" + sumArray(cid);
	displayTotalCashInDrawer.innerText = status(cid);
	testBtn.innerText = "Test " + t;
	btn = 0;
}
testBtn.addEventListener("click", () => {
	t++;
	if (t < 6) {
		numberOfTest(t);
	}
	else {
		t = 1;
		numberOfTest(t);
	}
});
resetBtn.addEventListener("click", () => {
	reset();
});
