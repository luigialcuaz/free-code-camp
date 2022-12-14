/*cash register drawer
      cid -> cash-in-drawer, a 2d array listing
      available currency
      should always return an object with a status
      key and a change key
      return {status: "INSUFFICIENT_FUNDS", change: []}
      if cid is less than the change due or if
      you cannot return the exact change
      return {staus: "CLOSED", change:[...]}
      with cid as the value for the key change if
      it is equal to the change due
      othewise
      return {status: "OPEN", change: [...]}
      with the change due in coins and bills,
      sorted in the highest to lowest order,
      as the value of the change key
      */
//if cid doesnt have enough change or cant
//return the correct amount, status: insufficient
//if cid is equal to the change, status: closed
//if cid has enough and can return exact amount
//return status:open, with change sorted
//highest to lowest
//cid length is 9
function checkCashRegister(price, cash, cid) {
  const cashValue = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  const changeArray = [];
  let cashTotal = cid.reduce(
    (total, registerCash) =>
      Math.round(total * 100 + registerCash[1] * 100) / 100,
    0
  );

  let changeDue = cash - price;
  let statement = { status: "INSUFFICIENT_FUNDS", change: [] };

  for (
    let i = cid.length - 1;
    i >= 0 && changeDue !== 0 && cashTotal >= changeDue;
    i--
  ) {
    if (changeDue / cashValue[i] >= 1) {
      let cashMultiplier = Math.floor(changeDue / cashValue[i]);
      if (cashMultiplier > 0 && cid[i][1] < changeDue) {
        cashMultiplier = cid[i][1] / cashValue[i];
      }

      const cashGiven = cashValue[i] * cashMultiplier;
      changeDue = Math.round(changeDue * 100 - cashGiven * 100) / 100;
      changeArray.push([cid[i][0], cashGiven]);
      cashTotal -= cashGiven;
    }
  }

  if (changeDue === 0 && cashTotal === 0) {
    statement.status = "CLOSED";
    statement.change = cid;
    return statement;
  } else if (changeDue === 0) {
    statement.status = "OPEN";
    statement.change = changeArray;
    return statement;
  }
  return statement;
}
// {status: "OPEN", change: [["QUARTER", 0.5]]}
// console.log(
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
//{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
//{status: "INSUFFICIENT_FUNDS", change: []}
checkCashRegister(19.5, 20, [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
]);
//{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
