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
    // clear all
  } else if (buttonPressed === "c") {
    curOutput = "0"
    chaOutput = "0"
    total = 0;
    $("#current-output").text(curOutput);
    $("#chained-output").text(chaOutput);
    // add
  } else if (buttonPressed === "add") {
    if (curOutput !== "0") {
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
          curOutput = total.toString();
          $("#current-output").text(curOutput);
        }
        isOperating = true;
        if(chaOutput.length > 22) {
          var temp = chaOutput.split('');
          temp.splice(0, chaOutput.length - 22);
          chaOutput = temp.join('');
        }
        $("#chained-output").text(chaOutput);
      }
    }
    // subtract
  } else if (buttonPressed === "subtract") {
    if (curOutput !== "0") {
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
        if(chaOutput.length > 22) {
          var temp = chaOutput.split('');
          temp.splice(0, chaOutput.length - 22);
          chaOutput = temp.join('');
        }
        $("#chained-output").text(chaOutput);
      }
    }
  }
});