const powerButton = document.querySelector("input[name=power-state]");
const screen = document.getElementById('screen');
powerButton.addEventListener('change', (event) => {
    toggleClass(screen, "screen_on");
    document.querySelectorAll('.neobutton').forEach( x => toggleClass( x, "locked"));
})


function updateDisplay(item){
    const screen = document.getElementById("screen");
    let displayOutput = document.createElement('p');

    if (Array.isArray(item)){
        displayOutput.innerHTML = item.join("");
        
    } else {
        displayOutput.innerHTML = item;
    }
    
    if(screen.hasChildNodes()) {
        screen.replaceChild(displayOutput, screen.childNodes[0]);
    }else {
        screen.appendChild(displayOutput)
    };
}

function toggleClass(element, className) {
    function hasClass(element, className) {
        return element.classList ? element.classList.contains(className) :
               new RegExp('\\b'+ className+'\\b').test(element.className);
    }

    if(hasClass(element, className)) {
        element.classList.remove(className);
    }else {
        element.classList.add(className);
    }
}

function add(a,b) {
    return rounding(parseFloat(a) + parseFloat(b));
}

function subtract(a,b) {
    return rounding(parseFloat(a) - parseFloat(b));
}

function multiply(a,b) {
    return rounding(parseFloat(a) * parseFloat(b));
}

function divide(a,b) {
    if(a === 0 || b === 0){
        return "ERROR, CANNOT DIVIDE BY 0";
    }else {
        return rounding(parseFloat(a) / parseFloat(b));
    }
    
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function rounding(n) {
    return Math.round((parseFloat(n) + Number.EPSILON) * 100) / 100
}

function calculator() {
    let equationLeft = undefined;
    let equationRight = undefined;
    let operator = undefined;
    let signed = false;
    let percent = false;
    const inputStream = [];

    const buttons = document.querySelectorAll(".neobutton");
    Array.from(buttons).forEach(function(item) {
    item.addEventListener("click", (event) => {
        operate(event.target)
        });
    })

    function operate(input) {
        backspace = input.id;
        input = input.textContent;

        if (input == 'C'){
            clearVariables();
            
        } else if(input == "+/-") {
            signed = boolToggle(signed,'-');
    
        } else if (input == "%") {
            percent = boolToggle(percent,'%');

        } else if(input == '=') {
            equationRight = prepareValue(inputStream,percent, signed);
            signed, percent = false;
            inputStream.length = 0;
            calculate();

        } else if(input == '.') {
            if(!inputStream.includes(input)) {
                inputStream.push(input);
                updateDisplay(inputStream);
            }

        }else if (isNumeric(input)){
            inputStream.push(input);
            updateDisplay(inputStream);

        }else {
            console.log(backspace);
            if(backspace == back) {
                inputStream.pop();
                updateDisplay(inputStream);
                backspace = '';
            }

            if(input != '=' || input != '[object HTMLElement]'){
                operator = input;
            }

            updateDisplay(inputStream);
            

            if(equationLeft == undefined) {
                equationLeft = prepareValue(inputStream, percent, signed);
                signed = false;
                percent = false;
                inputStream.length = 0;
            }else {
                if (inputStream.length > 0){
                    equationRight = prepareValue(inputStream,percent, signed);
                    signed, percent = false;
                    inputStream.length = 0;
                    calculate();
                }

            }


        }
        
    }

    function clearVariables() {
        equationLeft = undefined;
        equationRight = undefined;
        operator = undefined;
        signed, percent = false;
        inputStream.length = 0;
        updateDisplay(inputStream);
    }

    function boolToggle(b,symbol) {
        if (b){
            inputStream.unshift(symbol);
            updateDisplay(inputStream);
        }else {
            inputStream.shift();
            updateDisplay(inputStream);
        }
        return !b;
    }

    function prepareValue(inputStream, percent, signed) {
        if (inputStream.length == 0) {
            return 0;
        } else {
            let temp;
            temp = inputStream.join('');
            
            if(signed) {
                temp = -Math.abs(temp);
            }
    
            if(percent) {
                temp = parseFloat(temp) / 100;
            }
    
            return temp;
        }

    }

    function calculate() {
        if (operator == undefined || operator == '=' || equationRight == undefined || equationLeft == undefined) {
            return;
        }else {
            switch(operator) {
                case "+":
                    equationLeft = add(equationLeft, equationRight);
                    equationRight = undefined;
                    updateDisplay(equationLeft);
                    break;
                case "-":
                    equationLeft = subtract(equationLeft, equationRight);
                    equationRight = undefined;
                    updateDisplay(equationLeft);
                    break;
                case "x":
                    equationLeft = multiply(equationLeft, equationRight);
                    equationRight = undefined;
                    updateDisplay(equationLeft);
                    break;
                case "÷":
                    equationLeft = divide(equationLeft, equationRight);
                    equationRight = undefined;
                    updateDisplay(equationLeft);
                    break;
            }
        }

    }

}

calculator();