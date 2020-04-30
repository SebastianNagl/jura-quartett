document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

let selector, elems, makeActive;

elems = document.getElementsByTagName("a");

makeActive = function () {
  for (let i = 0; i < elems.length; i++) elems[i].classList.remove("active");

  this.classList.add("active");
};

for (let i = 0; i < elems.length; i++)
  elems[i].addEventListener("mousedown", makeActive);

function calcTotal() {
  let priceUnit = document.querySelector(".pu span").innerHTML; //select price
  let quantity = document.querySelector(".qty input").value; //select quantity
  let total = document.querySelector(".total span"); //select total

  let totalCalc = priceUnit * quantity;
  let totalPrice = `Total €${totalCalc}`; //calculate the total

  quantity.onclick = calcTotal;

  return (total.innerHTML = totalPrice); //writes subtotal
}
