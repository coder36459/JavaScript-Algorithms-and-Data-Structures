const test = [[20, 1.87, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]], [20, 19.5, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]], [100, 3.26, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]], [20, 19.5, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]], [20, 19.5, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]], [20, 19.5, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]]];
let cash = test[0][0];
let price = test[0][1];
let cid = test[0][2];
let t;
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
const sumArray = (a) => {
	let y = 0;
	for (const x in a) {
		y += a[x][1];
	}
	return Number(y.toFixed(2));
}
const reverse = (type) => {
	let r = [];
	for (const x in type) {
		r.unshift([type[x][0], type[x][1]]);
	}
	return r;
}
const statusBefore = (s) => {
	let str = "";
	for (const x in s) {
		str += " " + s[x][0] + ": $" + s[x][1];
	}
	return str;
}
const round = (a, b) => {
	return Math.round((a - b) * 100) / 100;
}
const reset = () => {
	cash = test[0][0];
	price = test[0][1];
	cid = test[0][2];
	t = 0;
	displayCash.value = cash;
	displayPrice.value = price;
	displayDue.value = "";
	changeDue.innerText = "Status: READY";
	displayCID.innerText = "Total cash in drawer: $" + sumArray(cid);
	displayTotalCashInDrawer.innerText = statusBefore(reverse(cid));
	displaySolution.innerText = "";
	displaySolution.style.display = "none";
	resetBtn.innerText = "Reset";
	testBtn.innerText = "Test";
}
reset();
purchaseBtn.addEventListener("click", () => {
	const cashValue = () => {
		return displayCash.value * 1;
	}
	const priceValue = () => {
		return price * 1;
	}
	let change = [], sol = "";
	if (cashValue() !== "" && cashValue() >= priceValue()) {
		displayDue.value = round(cashValue(), priceValue());
	}
	const status = (type) => {
		let str = "";
		for (const x in type) {
			str += " " + type[x][0] + ": $" + type[x][1];
		}
		return str;
	}
	displayCID.innerText = "Total cash in drawer: $" + sumArray(cid);
	displayTotalCashInDrawer.innerText = status(reverse(cid));
	displayTotalCashInDrawer.style.display = "block";
	if (priceValue() > cashValue()) {
		alert("Customer does not have enough money to purchase the item");
	}
	else if (cashValue() === priceValue()) {
		changeDue.innerText = "No change due - customer paid with exact cash";
	}
	else {
		let reverseCID = [];
		for (const x in cid) {
			reverseCID.unshift([cid[x][0], cid[x][1]]);
		}
		const amount = [ 10000, 2000, 1000, 500, 100, 25, 10, 5, 1 ];
		let due = round(cashValue(), priceValue());
		let dueOne = Math.round(due * 100);
		const line = "-".repeat(55);
		sol += "Cash: $" + cashValue() + "\t" + "Price: $" + priceValue() + "\n" + line;
		for (const x in reverseCID) {
			let dueChk = (dueOne % amount[x]);
			let dueAmo = Math.floor(dueOne / amount[x]);
			let cidOne = Math.round(reverseCID[x][1] * 100);
			let cidAmo = Math.floor(cidOne / amount[x]);
			let cidF1 = Number(((amount[x]/100) * dueAmo).toFixed(2));
			let cidF2 = Number(((amount[x]/100) * cidAmo).toFixed(2));
			const roundCID = () => {
				return Math.round(reverseCID[x][1] * 100) / 100;
			}
			if (dueChk !== dueOne) {
				if (cidAmo > dueAmo) {
					sol += "\n$" + dueOne/100 + "\t\t$" + amount[x]/100 + "\t" + dueAmo + "\t$" + roundCID();
					dueOne -= (amount[x] * dueAmo);
					reverseCID[x][1] -= Math.round(((amount[x]/100) * dueAmo) * 100) / 100;
					sol += "\n$" + dueOne/100 + "\t\t\t\t$" + roundCID() + "\t\t$" + cidF1 + "\n" + line;
					if (cidF1 > 0) {
						change.push([reverseCID[x][0], cidF1]);
					}
				}
				else {
					if (cidAmo > 0) {
						sol += "\n$" + dueOne/100 + "\t\t$" + amount[x]/100 + "\t" + cidAmo + "\t$" + roundCID();
					}
					dueOne -= (amount[x] * cidAmo);
					reverseCID[x][1] -= Math.round(((amount[x]/100) * cidAmo) * 100) / 100;
					if (cidF2 > 0) {
						sol += "\n$" + dueOne/100 + "\t\t\t\t$" + roundCID() + "\t\t$" + cidF2 + "\n" + line;
						change.push([reverseCID[x][0], cidF2]);
					}
				}
			}
		}
		sol += "\n\t\t\t\t\t" + "Due:" + "\t$" + round(cashValue(), priceValue());
		const statusOpen = () => {
			return changeDue.innerText = "Status: OPEN\n" + status(change);
		}
		const statusClosed = () => {
			return changeDue.innerText = "Status: CLOSED\n" + status(change);
		}
		let cp = ((cashValue() - priceValue()).toFixed(2)) * 1;
		if (cp === sumArray(change)) {
			if (sumArray(reverseCID) === 0) {
				statusClosed();
			}
			else {
				statusOpen();
			}
		}
		else {
			displaySolution.style.display = "none";
			return changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
		}
	}
	displaySolution.style.display = "block";
	return displaySolution.innerHTML = "<p>Below you will find more details.</p>" + "<pre>" + sol + "</pre>";
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
	cash = test[t][0];
	price = test[t][1];
	cid = test[t][2];
	displayCash.value = cash;
	displayPrice.value = price;
	displayDue.value = "";
	displayCID.innerText = "Total cash in drawer: $" + sumArray(cid);
	displayTotalCashInDrawer.innerText = statusBefore(reverse(cid));
	displayTotalCashInDrawer.style.display = "block";
	displaySolution.innerText = "";
	displaySolution.style.display = "none";
	testBtn.innerText = "Test " + t;
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
