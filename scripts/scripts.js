let current = 0;
let array = [];

window.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display');
	createNode('sum', 0, false);
	displayNumbers();
});

// Add number to display
function pressButton(n) {
	// TODO press operator before number
	// TODO press minus before anything else
	if (current != 0) current += "" + n; 
	else current = n;
	displayNumbers();
}

function pressOperator(o) {
	// TODO press different operators simultaniously
	let operator;
	switch (o) {
		case "sub":
			operator = " - ";
			break;
		case "mul":
			operator = " × ";
			break;
		case "div":
			operator = " ÷ ";
			break;
		default:
			operator = " + "
	}
	// array[array.length-1].operator = o;
	// array[array.length-1].number = current;
	createNode(o, current, false);
	current = "";
	displayNumbers();
	current = 0;
	// Add another node to array
}

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
	numberDisplay = "";
	let op = "";
	for (let i = 0; i < array.length; i++) {
		switch (array[i].operator) {
			case 'sum':
				op = " + ";
				break;
			case 'sub':
				op = " - ";
				break;
			case 'mul':
				op = " × ";
				break;
			case 'div':
				op = " ÷ ";
				break;
		}
		// TODO fix first number possibilities
		numberDisplay += array[i].number + op;
	}
	numberDisplay += current;
	display.innerHTML = numberDisplay;
}

function clearDisplay() {
  createNode(undefined, 0, false);
  current = 0;
  display.innerHTML = 0;
}

function backspace() {
	console.log(numberDisplay != 0 ? numberDisplay[numberDisplay.length-1] + " is no more..." : "This 0 is tough!");
	numberDisplay = numberDisplay.length > 1 ? numberDisplay = numberDisplay.slice(0, -1) : numberDisplay = 0;
	display.innerHTML = numberDisplay;
}

function operate() {
	// TODO order priority operation
	createNode(undefined, current, false);
	//array[array.length-1].number = current;
	let ans = array[0].number;
	for (let i = 1; i < array.length; i++) {
		switch (array[i-1].operator) {
			case 'sum':
				ans += Number(array[i].number);
				console.log(ans);
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
	console.table(array);
	current = 0;
	array = []
	createNode('sum', ans, false);
	displayNumbers();
}

//atualiza current - adiciona novo nó quando aperta operador