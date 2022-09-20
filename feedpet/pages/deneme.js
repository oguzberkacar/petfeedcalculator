const toogleOpen = (e) => {
  document.querySelectorAll(e).forEach((a) => {
    a.addEventListener("click", (t) => {
      t.stopPropagation(),
        a.children[1].classList.contains("drop-active")
          ? (a.children[1].classList.toggle("drop-active"),
            a.children[0].classList.toggle("active"))
          : (document.querySelectorAll(e).forEach((e) => {
              e.children[1].classList.remove("drop-active"),
                e.children[0].classList.remove("active");
            }),
            a.children[1].classList.add("drop-active"),
            a.children[0].classList.add("active"));
    });
  });
};
toogleOpen(".sidebar-list__item"), toogleOpen(".tab-to-open-child");
const lifestyles = [
    "Normal",
    "Overweight",
    "Adult Cats",
    "Sterilized cats",
    "For growing kittens",
  ],
  valueOfLifestyles = [1, 0.6, 1.2, 1.2, 2.5];
let valueOfLifestyle = "",
  calories = "",
  amountOfDryFood = "",
  amountOfWetFood = "",
  isCheckedCatWeightUnit = !1,
  isCheckedGrams = !1;
function checkLifestyleValue() {
  const e = document.querySelector("#lifestyle").value;
  for (let a = 0; a < lifestyles.length; a++)
    lifestyles[a] === e && (valueOfLifestyle = valueOfLifestyles[a]);
}
function showAmountOfFeed() {
  const e = document.querySelector("#amountOfFeed"),
    a = document.querySelector("#typeOfFood").value;
  if (amountOfWetFood)
    if (isCheckedGrams)
      "Wet" === a
        ? (e.innerHTML = Math.round(amountOfWetFood))
        : "Dry" === a && (e.innerHTML = (amountOfDryFood / 3.5).toFixed(1));
    else if ("Wet" === a) e.innerHTML = Math.round(amountOfWetFood / 28);
    else if ("Dry" === a) {
      const a = amountOfDryFood / 3.5 / 100;
      e.innerHTML = a.toFixed(1);
    }
}
function clickRadio() {
  const e = document.querySelector("#kg");
  isCheckedCatWeightUnit
    ? ((e.checked = !1), (isCheckedCatWeightUnit = !1))
    : ((isCheckedCatWeightUnit = !0), (e.checked = !0));
}
function clickRadioGrams() {
  const e = document.querySelector("#grams");
  isCheckedGrams
    ? ((e.checked = !1), (isCheckedGrams = !1), showAmountOfFeed())
    : ((isCheckedGrams = !0), (e.checked = !0), showAmountOfFeed());
}
function calc() {
  const e = document.querySelector("#caloriesPerDay"),
    a = document.querySelector("#catWeight").value;
  checkLifestyleValue(),
    (calories = isCheckedCatWeightUnit
      ? 70 * Math.pow(a, 0.75) * valueOfLifestyle
      : 70 * Math.pow(0.45 * a, 0.75) * valueOfLifestyle),
    (e.innerHTML = Math.round(calories)),
    (amountOfWetFood = calories),
    (amountOfDryFood = calories),
    showAmountOfFeed();
}
