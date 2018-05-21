let numberDisplay = 0;
let decimal = false;
let tree = undefined;

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	display.innerHTML = numberDisplay;
});

function number(n) {
  numberDisplay = numberDisplay != 0 ? "" + numberDisplay + n : n;
  display.innerHTML = numberDisplay;
	console.log(n + " pressed");
}

function addDecimal() {
	console.log(!decimal ? "Decimal point" : "Oops! Can't do that!");
  numberDisplay = ((!decimal) ? numberDisplay + "." : numberDisplay);
	display.innerHTML = numberDisplay;
	decimal = true;
}

function clearDisplay() {
  decimal = false;
  numberDisplay = 0;
  display.innerHTML = numberDisplay;
}

function backspace() {
	console.log(numberDisplay != 0 ? numberDisplay[numberDisplay.length-1] + " is no more..." : "This 0 is tough!");
	numberDisplay = numberDisplay.length > 1 ? numberDisplay = numberDisplay.slice(0, -1) : numberDisplay = 0;
	display.innerHTML = numberDisplay;
}

function addNode(operator) {
	let node = {
		operator,
		left: numberDisplay,
	}
	if (tree === undefined) tree = node;
	else
}

function operate() {

}
