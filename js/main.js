let displayItems = [];

const powerButton = document.querySelector("input[name=power-state]");
const screen = document.getElementById('screen');
powerButton.addEventListener('change', (event) => {
    toggleClass(screen, "screen_on");
})

const buttons = document.querySelectorAll(".neobutton");
Array.from(buttons).forEach(function(item) {
    item.addEventListener("click", (event) => {
        updateDisplay(event.target.textContent);
    });
})

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a / b;
}

function divide(a,b) {
    return a / b;
}

function operate(operator, a,b) {

}

function updateDisplay(item){
    displayItems.push(item);
    
    const screen = document.getElementById("screen");
    let displayOutput = document.createElement('p');
    displayOutput.innerHTML = displayItems.join(" ");

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