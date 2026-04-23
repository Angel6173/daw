const style = document.createElement('style');
style.innerHTML = `
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #1e1e1e;
  font-family: 'Inter', sans-serif;
}

.calc-container {
  width: 320px;
  background-color: #252525;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

#calc-display {
  width: 100%;
  height: 60px;
  font-size: 26px;
  text-align: right;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #111;
  color: white;
}

.calc-buttonss {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 16px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #333;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #444;
}

button:active {
  transform: scale(0.95);
}

/* COLORES */
button:nth-child(1) {background:#ef4444;}
button:nth-child(2) {background:#f97316;}
button:nth-child(3) {background:#f97316;}
button:nth-child(4) {background:#3b82f6;}

button:nth-child(5),
button:nth-child(6) {background:#7c3aed;}

button:nth-child(7),
button:nth-child(8) {background:#6366f1;}

button:nth-child(24) {background:#22c55e;}
`;
document.head.appendChild(style);

const container = document.createElement("div");
container.className = "calc-container";

const display = document.createElement("input");
display.type = "text";
display.id = "calc-display";
display.disabled = true;

container.appendChild(display);
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "calc-buttonss";

function createButton(text, onclickFunc) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.setAttribute("onclick", onclickFunc);
    buttonsContainer.appendChild(btn);
}

createButton("AC", "clearDisplay()");
createButton("C", "clearDisplay()");
createButton("←", "deleteLast()");
createButton("÷", "appendOperator('/')");

createButton("(", "appendParenthesis('(')");
createButton(")", "appendParenthesis(')')");
createButton("x", "appendOperator('*')");
createButton("-", "appendOperator('-')");

createButton("7", "appedNumber('7')");
createButton("8", "appedNumber('8')");
createButton("9", "appedNumber('9')");
createButton("+", "appendOperator('+')");

createButton("4", "appedNumber('4')");
createButton("5", "appedNumber('5')");
createButton("6", "appedNumber('6')");
createButton("*", "appendOperator('*')");

createButton("1", "appedNumber('1')");
createButton("2", "appedNumber('2')");
createButton("3", "appedNumber('3')");
createButton("/", "appendOperator('/')");

createButton("0", "appedNumber('0')");
createButton(".", "appedNumber('.')");
createButton("=", "calculate()");
createButton("Evaluar", "calculate()");

container.appendChild(buttonsContainer);
document.body.appendChild(container);


let displayValue = '';

function appedNumber(number){
    if(number === '.' && displayValue.includes('.')) return;
    displayValue += number;
    updateDisplay();
}

function appendOperator(op){
    if(displayValue === '') return;

    const last = displayValue.slice(-1);
    if(['+', '-', '*', '/'].includes(last)){
        displayValue = displayValue.slice(0, -1);
    }

    displayValue += op;
    updateDisplay();
}

function appendParenthesis(p){
    displayValue += p;
    updateDisplay();
}

function calculate(){
    if(displayValue === '') return;

    try{
        displayValue = eval(displayValue).toString();
    }catch{
        displayValue = 'Error';
    }

    updateDisplay();
}

function deleteLast(){
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function clearDisplay(){
    displayValue = '';
    updateDisplay();
}

function updateDisplay(){
    document.getElementById('calc-display').value = displayValue;
}