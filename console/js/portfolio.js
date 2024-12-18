var terminal = new Terminal();

var termInput = document.querySelector("#terminal-text");

var thelper = document.querySelector("#terminal-helper");

var focusTermInput = () => {
    document.execCommand("copy");
    termInput.focus();
};

termInput.onkeydown = (event) => {
    if (event.keyCode == 13) {
        var command = termInput.value;
        terminal.execute(command);
    }
};

thelper.onclick = (event) => {
    focusTermInput();
    terminalType("help", 0);
};

var terminalType = (txt, i) => {
    if (i < txt.length) {
        terminal.input.value += txt.charAt(i);
        i++;
        setTimeout(terminalType, 50, txt, i);
    }
};

window.onload = focusTermInput();

document.addEventListener("mouseup", focusTermInput);
