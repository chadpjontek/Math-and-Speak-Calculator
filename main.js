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
  playSound("err");
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
function displayChainOutput(op) {
  chainOutput = inputArr.join('');
  chainOutput = chainOutput.replace(/([+])|([\-])|([/])|([*])/g, function (match, p1, p2, p3, p4) {
    if (p1) { return " + "; }
    if (p2) { return " - "; }
    if (p3) { return " ÷ "; }
    if (p4) { return " X "; }
  });
  chainOutput = chainOutput.substr(-22);
  $("#chained-output").text(chainOutput);
  playSound(op);
}
function getTotal() {
  total = Math.round(eval(inputArr.join('')) * 1000) / 1000;
}
function addDecimal() {
  inputArr.push(".");
  displayCurOutput();
  decimalActive = true;
  playSound(buttonPressed);
}
function playSound(id) {
  var data = {
    1: {
      sound: new Howl({
        src: ['sounds/one.mp3']
      })
    },
    2: {
      sound: new Howl({
        src: ['sounds/two.mp3']
      })
    },
    3: {
      sound: new Howl({
        src: ['sounds/three.mp3']
      })
    },
    4: {
      sound: new Howl({
        src: ['sounds/four.mp3']
      })
    },
    5: {
      sound: new Howl({
        src: ['sounds/five.mp3']
      })
    },
    6: {
      sound: new Howl({
        src: ['sounds/six.mp3']
      })
    },
    7: {
      sound: new Howl({
        src: ['sounds/seven.mp3']
      })
    },
    8: {
      sound: new Howl({
        src: ['sounds/eight.mp3']
      })
    },
    9: {
      sound: new Howl({
        src: ['sounds/nine.mp3']
      })
    },
    0: {
      sound: new Howl({
        src: ['sounds/zero.mp3']
      })
    },
    "c": {
      sound: new Howl({
        src: ['sounds/scale.mp3']
      })
    },
    "start": {
      sound: new Howl({
        src: ['sounds/music_ascending.mp3']
      })
    },
    "add": {
      sound: new Howl({
        src: ['sounds/plus.mp3']
      })
    },
    "subtract": {
      sound: new Howl({
        src: ['sounds/minus.mp3']
      })
    },
    "multiply": {
      sound: new Howl({
        src: ['sounds/times.mp3']
      })
    },
    "divide": {
      sound: new Howl({
        src: ['sounds/divided_by.mp3']
      })
    },
    "equals": {
      sound: new Howl({
        src: ['sounds/equals.mp3']
      })
    },
    "point": {
      sound: new Howl({
        src: ['sounds/weird _sound.mp3']
      })
    },
    "err": {
      sound: new Howl({
        src: ['sounds/music_decending.mp3']
      })
    },
    "link": {
      sound: new Howl({
        src: ['sounds/space_ship.mp3']
      })
    },
  };
  data[id].sound.play();
}
// on page load
$(document).ready(function () {
  playSound("start");
})
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
    playSound(buttonPressed);
    // clear
  } else if (buttonPressed === "c") {
    clear();
    playSound("c");
    // operators
  } else if (operatorIds.includes(buttonPressed)) {
    decimalActive = false;
    if (equalActivated) {
      equalActivated = false;
    }
    if (operators.includes(inputArr[inputArr.length - 1])) {
      inputArr.pop();
      inputArr.push(operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput(buttonPressed);
    } else if (inputArr.length === 0) {
      inputArr.push("0", operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput(buttonPressed);
    } else if (inputArr[inputArr.length - 1] !== ".") {
      getTotal();
      inputArr.push(operators[operatorIds.indexOf(buttonPressed)]);
      displayChainOutput(buttonPressed);
      curOutput = total.toString();
      displayCurOutput();
    }
    // equals
  } else if (buttonPressed === "equals") {
    if (inputArr.length > 0 && !operators.includes(inputArr[inputArr.length - 1]) && inputArr[inputArr.length - 1] !== ".") {
      getTotal();
      chainOutput += curOutput + " = " + total.toString() + " ";
      chainOutput = chainOutput.substr(-22);
      $("#chained-output").text(chainOutput);
      curOutput = total.toString();
      displayCurOutput();
      inputArr = [curOutput];
      equalActivated = true;
      decimalActive = true;
      playSound(buttonPressed);
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
})