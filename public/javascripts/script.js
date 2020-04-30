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
