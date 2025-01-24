let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
    const cashInput = document.getElementById("cash");
    const changeDue = document.getElementById("change-due");
    const cash = parseFloat(cashInput.value);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        changeDue.textContent = "";
        return;
    }

    if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    let changeNeeded = Math.round((cash - price) * 100) / 100;
    let totalCid = 0;
    let cidCopy = cid.map(arr => [...arr]);

    // Calculate total cash in drawer
    for (let item of cidCopy) {
        totalCid += item[1];
    }
    totalCid = Math.round(totalCid * 100) / 100;

    // Check if total cash in drawer equals change needed
    if (totalCid === changeNeeded) {
        const nonZeroChange = cidCopy.filter(item => item[1] > 0);
        changeDue.textContent = `Status: CLOSED ${nonZeroChange.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
        return;
    }

    // Check if we have enough money in drawer
    if (totalCid < changeNeeded) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // Calculate change
    const denominations = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    let change = [];
    let remainingChange = changeNeeded;

    for (let [denom, value] of denominations) {
        let currentDenomInDrawer = cidCopy.find(item => item[0] === denom)[1];
        let amount = 0;

        while (remainingChange >= value && currentDenomInDrawer >= value) {
            amount += value;
            remainingChange = Math.round((remainingChange - value) * 100) / 100;
            currentDenomInDrawer = Math.round((currentDenomInDrawer - value) * 100) / 100;
        }

        if (amount > 0) {
            change.push([denom, amount]);
        }
    }

    if (remainingChange > 0) {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    changeDue.textContent = `Status: OPEN ${change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ")}`;
});
