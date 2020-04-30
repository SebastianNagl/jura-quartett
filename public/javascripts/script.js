//calculates the total in the shopping cart / kaufen
function calcTotal() {
  let priceUnit = document.querySelector(".pu span").innerHTML; //select price
  let quantity = document.querySelector(".qty input").value; //select quantity
  let total = document.querySelector(".total span"); //select total

  let totalCalc = priceUnit * quantity;
  let totalPrice = `Total €${totalCalc}`; //calculate the total

  quantity.onclick = calcTotal;

  return (total.innerHTML = totalPrice); //writes subtotal
}
