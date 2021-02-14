let button = document.querySelector(".buttons");
const display = document.querySelector(".resultBox");
let currentDisplay = "";
let value = "";
const operators = ["+", "-", "*", "/"];

button.addEventListener('click', function (event) {

    // first thing displayed must be a number that can't be 0 ...

    if (event.target.classList.contains("number") && !value) {
        if (event.target.innerText != "0")
            value = event.target.innerText;
        display.innerText = value;
        return;

    }
    // you cant type two operators following eachother, overwrite the first one in that case
    if (operators.includes(value[value.length - 1]) && event.target.classList.contains("operator")) {
        value = value.slice(0, -1);
        value += event.target.innerText;
        display.innerText = value;

        return;
    }


    if (event.target.innerText === "C") {
        value = "";
        display.innerText = value;
        return;
    }

    if (event.target.innerText === "backspace") {
        value = value.slice(0, -1);
        display.innerText = value;
        return;
    }

    if (event.target.innerText === "=") {
        value = value.split("");
        function getResults(array) {
            let opIndexes = [];
            let intermediateValue = "";
            let intermediateValues = [];
            for (let i = 0; i < array.length; i++) {
                //array[i] is digit
                if (!operators.includes(array[i])) {
                    intermediateValue += array[i];
                }
                //array[i] is operator 
                else {
                    opIndexes.push(i);
                    intermediateValues.push(intermediateValue);
                    intermediateValue = [];
                }
            }
            intermediateValues.push(intermediateValue);
            intermediateValues = intermediateValues.map(function (element) { return parseInt(element) });
            const results = [intermediateValues, opIndexes]

            for (let i = 0; i < opIndexes.length; i++) {
                if (value[opIndexes[i]] == "*") {
                    intermediateValues[i] = intermediateValues[i] * intermediateValues[i + 1];
                    intermediateValues.splice(i + 1, 1);
                    opIndexes.splice(i, 1);
                    i--;
                    console.log(intermediateValues);
                    console.log(opIndexes);
                    console.log("*****");
                    console.log(intermediateValues);
                }
            }

            for (let i = 0; i < opIndexes.length; i++) {
                if (value[opIndexes[i]] == "/") {
                    intermediateValues[i] = intermediateValues[i] / intermediateValues[i + 1];
                    intermediateValues.splice(i + 1, 1);
                    opIndexes.splice(i, 1);
                    i--;
                    console.log(intermediateValues);
                    console.log(opIndexes);
                    console.log("/////");
                    console.log(intermediateValues);
                }
            }


            for (let i = 0; i < opIndexes.length; i++) {
                if (value[opIndexes[i]] == "+") {
                    intermediateValues[i] = intermediateValues[i] + intermediateValues[i + 1];
                    intermediateValues.splice(i + 1, 1);
                    opIndexes.splice(i, 1);
                    i--;
                    console.log(intermediateValues);
                    console.log(opIndexes);
                    console.log("+++++");
                    console.log(intermediateValues);
                }
            }

            for (let i = 0; i < opIndexes.length; i++) {
                if (value[opIndexes[i]] == "-") {
                    intermediateValues[i] = intermediateValues[i] - intermediateValues[i + 1];
                    intermediateValues.splice(i + 1, 1);
                    opIndexes.splice(i, 1);
                    i--;
                    console.log(intermediateValues);
                    console.log(opIndexes);
                    console.log("-----");
                    console.log(intermediateValues);
                
                }
            }
            display.innerText = intermediateValues[0];

        }
        getResults(value);
        return;
    }

    value += event.target.innerText;
    display.innerText = value;

});

button.addEventListener("mousedown", function (event) {
    event.target.classList.add("clicked");
});

button.addEventListener("mouseup", function (event) {
    event.target.classList.remove("clicked");
});
