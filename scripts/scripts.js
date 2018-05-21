let numberDisplay = 0;
let decimal = false;

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	display.innerHTML = numberDisplay;
});

function number(n) {
  numberDisplay = numberDisplay != 0 ? "" + numberDisplay + n : n;
  display.innerHTML = numberDisplay;
}

function addDecimal() {
  numberDisplay = (decimal == false) ? numberDisplay + "." : numberDisplay;
}

function clear() {
  decimal = false;
  numberDisplay = 0;
  console.log(numberDisplay);
  display.innerHTML = numberDisplay;
}

function operate() {

}
