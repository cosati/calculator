let current = ""; // last number on display
let array = []; // operations
let pristine = true; // true when display cleared and after equals pressed

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	displayNumbers();
});

// Add number to display
function number(n) {
	// zeros neither to the left nor simultanious
	current = (pristine || current == 0 ? n : current + n);
	// Pristine: Pressing a number after displaying a result
	// should erase the result and display only the pressed number
	pristine = false;
	displayNumbers();
}

function pressOperator(operator) {
	let l = array.length;
	let lastOperator = l > 0 ? array[l-1].operator : '';
	let lastNumber = l > 0 ? array[l-1].number : '';
	// if first pressed button is '-', first number will be negative. To correct, press clear
	if (l != 1 || lastOperator != 'sub' || lastNumber !== '' || current !== '') {
		// press operator before pressing any number
		if (l == 0 && current === "") createNode(operator, "", false);
		// changes last index's operator if operators pressed simultaniously
		else if (current === "") array[l-1].operator = operator;
		else createNode(operator, current, false);
		current = "";
	}
	displayNumbers();
}

// Adds a number and operator do the array
function createNode(operator, number, isDecimal) {
	let node = {
		operator,
		number,
		isDecimal,
	}
	array.push(node);
};

// Display numbers on the screen
function displayNumbers() {
	// TODO ... for larger numbers
	let numberDisplay = "";
	if (array.length > 0 || current != "") {
		let op = "";
		for (let i = 0; i < array.length; i++) {
			switch (array[i].operator) {
				case 'sum':
					op = " + ";
					break;
				case 'sub':
					op = (i > 0 || array[i].number !== '' ? " - " : "-");
					break;
				case 'mul':
					op = " × ";
					break;
				case 'div':
					op = " ÷ ";
					break;
				case undefined:
					op = "";
					break;
			}
			numberDisplay += array[i].number + op;
		}
		numberDisplay += current;
	}
	else numberDisplay = 0; // Fresh start
	if (numberDisplay.length > 10) {
		numberDisplay = numberDisplay.slice(0, 9);
		numberDisplay += '...';
	}
	display.innerHTML = numberDisplay;
}

// Fresh start
function clearDisplay() {
  current = "";
	array = [];
	pristine = true;
  displayNumbers();
}

function operate() {
	// TODO order priority in operations
	createNode(undefined, current, false);
	let ans = Number(array[0].number);
	for (let i = 1; i < array.length; i++) {
		switch (array[i-1].operator) {
			case 'sum':
				ans += Number(array[i].number);
				break;
			case 'sub':
				ans -= Number(array[i].number);
				break;
			case 'div':
				ans = ans / Number(array[i].number);
				break;
			case 'mul':
				ans = ans * Number(array[i].number);
				break;
			case undefined:
				ans = ans;
				break;
		}
	}
	current = ans;
	pristine = true;
	array = []
	displayNumbers();
}
