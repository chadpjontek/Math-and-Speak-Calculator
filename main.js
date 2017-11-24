// vars
var curOutput = "0";
var chainOutput = "";
var inputArr = [];
var total = 0;
var decimalActive = false;
var buttonPressed;
var operators = ["+", "-", "*", "/"];
var operatorIds = ["add", "subtract", "multiply", "divide"];
var equalActivated = false;
// functions
function displayCurOutput() {
  if (curOutput.length > 10) {
    limitError();
  } else {
    $("#current-output").text(curOutput);
  }
}
function limitError() {
  curOutput = "0";
  chainOutput = "";
  total = 0;
  inputArr = [];
  $("#current-output").text("digit limit");
  $("#chained-output").text(chainOutput);
  decimalActive = false;
  equalActivated = false;
}
function clear() {
  curOutput = "0";
  chainOutput = "";
  total = 0;
  inputArr = [];
  $("#current-output").text(curOutput);
  $("#chained-output").text(chainOutput);
  decimalActive = false;
  equalActivated = false;
}
function displayChainOutput() {
  chainOutput = inputArr.join('');
  chainOutput = chainOutput.replace(/([+])|([\-])|([/])|([*])/g, function (match, p1, p2, p3, p4) {
    if (p1) { return " + "; }
    if (p2) { return " - "; }
    if (p3) { return " ÷ "; }
    if (p4) { return " X "; }
  });
  chainOutput = chainOutput.substr(-22);
  $("#chained-output").text(chainOutput);
}
function getTotal() {
  total = Math.round(eval(inputArr.join('')) * 10000) / 10000;
}
function addDecimal() {
  inputArr.push(".");
  displayCurOutput();
  decimalActive = true;
}
// handle button presses
$("button").click(function () {
  buttonPressed = this.id;
  // numbers
  if (Number(buttonPressed) || buttonPressed === "0") {
    if (equalActivated) {
      clear();
      equalActivated = false;
    }
    if (operators.includes(inputArr[inputArr.length - 1]) || curOutput === "0") {
      curOutput = buttonPressed;
    } else {
      curOutput += buttonPressed;
    }
    inputArr.push(buttonPressed);
    displayCurOutput();
    // clear
  } else if (buttonPressed === "c") {
    clear();
    // operators
  } else if (operatorIds.includes(buttonPressed)) {
    decimalActive = false;
    if (equalActivated) {
      equalActivated = false;
    }
    if (operators.includes(inputArr[inputArr.length - 1])) {
      inputArr.pop();
      inputArr.push(operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput();
    } else if (inputArr.length === 0) {
      inputArr.push("0", operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput();
    } else if (inputArr[inputArr.length - 1] !== ".") {
      getTotal();
      inputArr.push(operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput();
      curOutput = total.toString();
      displayCurOutput();
    }
    // equals
  } else if (buttonPressed === "equals") {
    if (inputArr.length > 0 && !operators.includes(inputArr[inputArr.length - 1]) && inputArr[inputArr.length - 1] !== ".") {
      getTotal();
      chainOutput += curOutput + " = " + total.toString();
      chainOutput = chainOutput.substr(-22);
      $("#chained-output").text(chainOutput);
      curOutput = total.toString();
      displayCurOutput();
      inputArr = [curOutput];
      equalActivated = true;
      decimalActive = true;
    }
    // decimal point
  } else if (buttonPressed === "point") {
    if (!decimalActive && !operators.includes(inputArr[inputArr.length - 1])) {
      curOutput += ".";
      addDecimal();
    } else if (!decimalActive && operators.includes(inputArr[inputArr.length - 1])) {
      curOutput = ".";
      addDecimal();
    }
  }
});