let current = ""; // last number on display
let array = []; // operations
let pristine = true; // true when display cleared and after equals pressed
let isInteger = true;
let error = false; // division by 0

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	displayNumbers();
});

// Add number to display
function number(n) {
	// zeros neither to the left nor simultanious
	current = (pristine || (current == 0 && isInteger) ? n : current + n);
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
		if (l == 0 && current === "" && operator == 'sub') createNode(operator, '', false);
		else if (l == 0 && current === "") createNode(operator, 0, false);
		// changes last index's operator if operators pressed simultaniously
		else if (current === "") array[l-1].operator = operator;
		else createNode(operator, current, false);
		current = "";
	}
	displayNumbers();
	isInteger = true;
}

function addDecimal() {
	if (isInteger) {
		current = (pristine || (current == 0 && isInteger) ? '.' : current + '.');
		isInteger = false;
		displayNumbers();
		pristine = false;
	}
}

// Adds a number and operator to the array
function createNode(operator, number, isDecimal) {
	let node = {
		operator,
		number,
	}
	array.push(node);
};

// Display numbers on the screen
function displayNumbers() {
	let numberDisplay = "";
	if (error) numberDisplay = "&infin;";
	else {
		if (array.length > 0 || current != "") {
			let op = "";
			for (i in array) {
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
	}
	error = false;
	display.innerHTML = numberDisplay;
}

// Fresh start
function clearDisplay() {
  current = "";
	array = [];
	pristine = true;
	isInteger = true;
  displayNumbers();
}

function operate() {
	createNode(undefined, current, false);
	console.table(array);
	for (let j = 0; j < array.length; j++) {
		if (array[j].operator == 'div' || array[j].operator == 'mul') {
			if (array[j+1].number == 0) error = true;
			else array[j+1].number = array[j].operator == 'div'
														? array[j].number / array[j+1].number
														: array[j].number * array[j+1].number;
			array[j].operator = 'skp';
		}
	}

	let k = array.length;
	while (k--) { // Multiplication and division first!
		if (array[k].operator == 'skp')
			array.splice(k, 1);
	}

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
			case 'skp':
				break;
			case undefined:
				ans = ans;
				break;
		}
	}
	current = !error ? ans : '';
	pristine = true;
	isInteger = (current.toString().indexOf('.') >= 0 ? false : true);
	array = [];
	displayNumbers();
}
