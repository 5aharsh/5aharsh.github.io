var terminal = new Terminal();

var termInput = document.querySelector("#term-input");

var focusTermInput = () => {
    document.execCommand('copy');
    termInput.focus();
};

termInput.onkeydown = (event) => {
    if(event.keyCode == 13) {
        var command = termInput.value;
        terminal.execute(command);
    }
};

window.onload = focusTermInput();

document.addEventListener('mouseup', focusTermInput);