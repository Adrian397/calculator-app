//THEME
const inputs = document.querySelectorAll(".calc-header__themes__inputs");
const darkInput = document.querySelector(".input-dark-theme");
const lightInput = document.querySelector(".input-light-theme");
const saturatedInput = document.querySelector(".input-saturated-theme");
const body = document.querySelector("body");

darkInput.checked = true;

function setColorTheme() {
  if (darkInput.checked == true) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
  if (lightInput.checked == true) {
    body.classList.add("light");
  } else {
    body.classList.remove("light");
  }
  if (saturatedInput.checked == true) {
    body.classList.add("saturated");
  } else {
    body.classList.remove("saturated");
  }
}

setColorTheme();

inputs.forEach((e) => {
  e.addEventListener("change", setColorTheme);
});

//CALCULATOR
const firstScreen = document.querySelector(".calc-screen__first");
const secondScreen = document.querySelector(".calc-screen__second");
const numbers = document.querySelectorAll(".calc-buttons__number");
const deleteBtn = document.querySelector(".calc-buttons__delete");
const resetBtn = document.querySelector(".calc-buttons__reset");
const computeBtn = document.querySelector(".calc-buttons__compute");
const operations = document.querySelectorAll(".calc-buttons__operation");

class Calculator {
  constructor(_firstScreen, _secondScreen) {
    this.firstScreen = _firstScreen;
    this.secondScreen = _secondScreen;
    this.clear();
  }

  clear() {
    this.first = "";
    this.second = "";
    this.operation = undefined;
  }

  appendNumbers(number) {
    if (this.second.length > 10) return;
    if (number === "." && this.second.includes(".")) return;
    if (number === "." && this.second === "") return;
    this.second += number;
  }

  appendOperation(operation) {
    if (this.first !== "" && this.operation !== undefined) {
      this.computation();
    }

    if (this.second !== "") {
      this.operation = operation;
      this.first = this.second;
      this.second = "";
    }
  }

  computation() {
    if (isNaN(parseFloat(this.second)) || this.operation === undefined) return;

    let result;
    switch (this.operation) {
      case "+":
        result = parseFloat(this.first) + parseFloat(this.second);
        break;
      case "-":
        result = parseFloat(this.first) - parseFloat(this.second);
        break;
      case "x":
        result = parseFloat(this.first) * parseFloat(this.second);
        break;
      case "/":
        result = parseFloat(this.first) / parseFloat(this.second);

        if (parseFloat(this.first) / parseFloat(this.second) === Infinity) {
          return [
            (this.second = "Did you just try dividing by 0? 😡"),
            ((this.first = ""), (this.operation = undefined)),
          ];
        }
        break;
    }

    this.second = result;
    this.first = "";
    this.operation = undefined;
  }

  delete() {
    if (this.second.length === 0) return;
    this.second = this.second.slice(1);
  }

  update() {
    this.firstScreen.innerText = this.first;
    this.secondScreen.innerText = this.second;

    if (this.operation !== undefined) {
      this.firstScreen.innerText = `${this.first} ${this.operation}`;
    }
  }
}

const calc = new Calculator(firstScreen, secondScreen);

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    calc.appendNumbers(e.target.innerText);
    calc.update();
    secondScreen.style = "transform: translateY(0%); font-size: 1rem;";
  })
);

operations.forEach((operation) =>
  operation.addEventListener("click", (e) => {
    calc.appendOperation(e.target.innerText);
    calc.update();
  })
);

computeBtn.addEventListener("click", () => {
  calc.computation();
  calc.update();
  secondScreen.style = "transform: translateY(-50%); font-size: 1.35rem;";
});

deleteBtn.addEventListener("click", () => {
  calc.delete();
  calc.update();
});

resetBtn.addEventListener("click", () => {
  calc.clear();
  calc.update();
});
