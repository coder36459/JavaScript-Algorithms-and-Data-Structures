let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const testBtn = document.getElementById("test");
const resetBtn = document.getElementById("reset");
const displayPrice = document.getElementById("price");
const displayTotalCashInDrawer = document.getElementById("total-cash-in-drawer");
const tip = document.getElementById("tip");
const cashValue = () => {
	return cash.value * 1;
}
const amount = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
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
const cidBefore = sumArray(cid); cid.reverse();
purchaseBtn.addEventListener("click", () => {
	let chd = [];
	let d = 0, d1 = 0, m = 0, n = 0;
	if (cashValue() < price) {
		alert("Customer does not have enough money to purchase the item");
	}
	else if (cashValue() === price) {
		changeDue.innerText = "No change due - customer paid with exact cash";
	}
	else {
		let due = (cashValue() - price) * 100;
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
		if (price < cashValue() && cidBefore > (cashValue() - price)) {
			changeDue.innerText = "Status: OPEN\n" + status(chd);
		}
		else if (price < cashValue() && cidBefore === (cashValue() - price)) {
			changeDue.innerText = "Status: CLOSED" + "\n" + status(chd);
		}
		else {
			changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
		}
	}
});
testBtn.innerText = "Test 1";
resetBtn.innerText = "Reset";
cash.value = 20;
displayPrice.value = price;
changeDue.innerText = "Status: ";
displayTotalCashInDrawer.innerText = "Total cash in drawer:\n" + status(cid);
cash.addEventListener("mouseover", () => {
	tip.style.visibility = "visible";
	tip.style.left = "50%";
	tip.style.top = "0px";
	tip.style.transform = "translateX(-50%)";
	tip.style.backgroundColor = "rgba(250,216,250.7)";
	tip.innerText = "The amount of cash provided by the customer for the item.";
});
cash.addEventListener("mouseout", () => {
	tip.style.visibility = "hidden";
});
resetBtn.addEventListener("click", () => {
	cash.value = "";
});
