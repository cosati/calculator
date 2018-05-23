let hasDecimal = false;
let current = 0;
let isOperator = false;
let array = [];

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	display.innerHTML = 0;
});

// Add number to display
function pressButton(n) {
	// TODO press operator before number
	// TODO press minus before anything else
	if (current != 0) current += n;
	else current = n;
	display.innerHTML = current;
	isOperator = false;
}

function pressOperator(o) {
	// TODO press different operators simultaniously
	let operator = " + ";
	switch (o) {
		case "minus":
			operator = " - ";
			break;
		case "multiply":
			operator = " ร— ";
			break;
		case "divide":
			operator = " รท ";
			break;
		default:
			operator = " + "
	}
	//current = (isOperator ? )
	current = current + operator;
	display.innerHTML = current;
	isOperator = true;
	hasDecimal = false;
}

// Adds decimal point
function adddecimal() {
	console.log(!decimal ? "decimal point" : "Oops! Can't do that!");
  current = ((!decimal) ? numberDisplay + "." : numberDisplay);
	display.innerHTML = numberDisplay;
	hasDecimal = true;
}

function node() {
	
}

function displayNumbers() {
	let aux = _tree;
	let numberDisplay = "";
	while (aux != undefined) {
		let op = "";
		switch (aux.operator) {
			case "plus":
				op = numberDisplay != "" ? " + " : "";
				break;
			case "minus":
				op = numberDisplay != "" ? " - " : "";
				break;
			case "multiply":
				op = numberDisplay != "" ? " x " : "";
				break;
			case "divide":
				op = numberDisplay != "" ? " / " : "";
				break;
		}
		numberDisplay = numberDisplay + aux.number + op;
		aux = aux.next;
	};	
	numberDisplay = numberDisplay + current;
	display.innerHTML = numberDisplay;
}

function clearDisplay() {
  decimal = false;
  current = 0;
  isOperator = false;
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
		number: current,
		next: undefined,
	};
	if (_tree === undefined) {
		_tree = node;
		tree_ = node;
	}
	else {
		let aux = _tree;
		while (aux.next != undefined) {
			aux = aux.next;
		};
	aux.next = node;
	tree_ = node;
	}
	displayNumbers();
}


function operate() {
	// TODO order priorityu operation
	let ans = 0;
	for (let i = 0; i < array.length; i++) {
		switch (array[i].operator) {
			case 'sum':
				ans += array[i].number;
				break;
			case 'sub':
				ans -= array[i].number;
				break;
			case 'div':
				ans = ans / array[i].number;
				break;
			case 'mul':
				ans = ans * array[i].number;
				break;
		}
	}
}

/*
{
	number,
	operator,
}
*/