// variable used to store current and chained output, the running total, if there is a decimal, and if +, -, X, or ÷ has been just activated
var curOutput = "0";
var chaOutput = "0";
var total = 0;
var isOperating = false;
var isDecimal = false;
// handle any button press
$("button").click(function () {
  var buttonPressed = this.id;
  // if a number is pressed and it's not too long for the UI update the UI
  if (curOutput.length < 11 && (Number(buttonPressed) || buttonPressed === "0")) {
    if (isOperating) {
      curOutput = buttonPressed;
      isOperating = false;
      $("#current-output").text(curOutput);
    } else {
      if (curOutput === "0") {
        curOutput = buttonPressed;
      } else {
        curOutput += buttonPressed;
      }
      $("#current-output").text(curOutput);
    }
    // too long err message
  } else if (curOutput.length > 10 && (Number(buttonPressed) || buttonPressed === "0")) {
    limitError();
    // clear all
  } else if (buttonPressed === "c") {
    clear();
    // add
  } else if (buttonPressed === "add") {
    if (isOperating) {
      chaOutput = chaOutput.replace(/ [÷X+-] $/, " + ");
      $("#chained-output").text(chaOutput);
    } else {
      if (chaOutput === "0") {
        chaOutput = curOutput + " + ";
        total = Number(curOutput);
      } else {
        chaOutput += curOutput + " + ";
        total += Number(curOutput);
        if (total.toString().length > 10) {
          // too long message
          limitError();
        }
        curOutput = total.toString();
        $("#current-output").text(curOutput);
      }
      isOperating = true;
      if (chaOutput.length > 22) {
        var temp = chaOutput.split('');
        temp.splice(0, chaOutput.length - 22);
        chaOutput = temp.join('');
      }
      $("#chained-output").text(chaOutput);
    }
    // subtract
  } else if (buttonPressed === "subtract") {
    if (isOperating) {
      chaOutput = chaOutput.replace(/ [÷X+-] $/, " - ");
      $("#chained-output").text(chaOutput);
    } else {
      if (chaOutput === "0") {
        chaOutput = curOutput + " - ";
        total = Number(curOutput);
      } else {
        chaOutput += curOutput + " - ";
        total -= Number(curOutput);
        curOutput = total.toString();
        $("#current-output").text(curOutput);
      }
      isOperating = true;
      if (chaOutput.length > 22) {
        var temp = chaOutput.split('');
        temp.splice(0, chaOutput.length - 22);
        chaOutput = temp.join('');
      }
      $("#chained-output").text(chaOutput);
    }
    // multiply
  } else if (buttonPressed === "multiply") {
    if (isOperating) {
      chaOutput = chaOutput.replace(/ [÷X+-] $/, " X ");
      $("#chained-output").text(chaOutput);
    } else {
      if (chaOutput === "0") {
        chaOutput = curOutput + " X ";
        total = Number(curOutput);
      } else {
        chaOutput += curOutput + " X ";
        total *= Number(curOutput);
        curOutput = total.toString();
        $("#current-output").text(curOutput);
      }
      isOperating = true;
      if (chaOutput.length > 22) {
        var temp = chaOutput.split('');
        temp.splice(0, chaOutput.length - 22);
        chaOutput = temp.join('');
      }
      $("#chained-output").text(chaOutput);
    }
    // divide
  } else if (buttonPressed === "divide") {
    if (isOperating) {
      chaOutput = chaOutput.replace(/ [÷X+-] $/, " ÷ ");
      $("#chained-output").text(chaOutput);
    } else {
      if (chaOutput === "0") {
        chaOutput = curOutput + " ÷ ";
        total = Number(curOutput);
      } else {
        chaOutput += curOutput + " ÷ ";
        total /= Number(curOutput);
        curOutput = total.toString();
        $("#current-output").text(curOutput);
      }
      isOperating = true;
      if (chaOutput.length > 22) {
        var temp = chaOutput.split('');
        temp.splice(0, chaOutput.length - 22);
        chaOutput = temp.join('');
      }
      $("#chained-output").text(chaOutput);
    }
  }
  function limitError(){
    $("#current-output").text("digit limit");
    curOutput = "0";
    chaOutput = "0"
    total = 0;
    $("#chained-output").text(chaOutput);
  }
  function clear(){
    curOutput = "0"
    chaOutput = "0"
    total = 0;
    $("#current-output").text(curOutput);
    $("#chained-output").text(chaOutput);
  }
});