class Options {
    constructor(selector = "#terminal", behaviour = {}, commands = {}) {
        this.selector = selector;
        this.behaviour = behaviour;
        this.commands = commands;
    }

    setBehaviour(behaviour) {
        this.behaviour = behaviour;
    }

    setCommands(commands) {
        this.commands = commands;
    }
}

class Terminal {
    constructor(options = null) {
        if (options === null) {
            this.options = new Options();
            this.options.setCommands({
                whoami: ["Saharsh Anand (@5aharsh)"],
                date: [new Date()],

            });
            this.options.setBehaviour({
                unknown: ["Unknown command... Try 'help'"],
                help: this.showHelp(),
            });
        } else {
            this.options = options;
        }
        this.terminal = document.querySelector(this.options.selector);
        this.input = document.querySelector("#term-input");
    }

    execute(command) {
        this.appendLine("> " + command);
        this.processCommand(command);
        window.scrollTo(0, document.body.scrollHeight);
        this.input.value = "";
    }

    appendLine(text) {
        var terminalPrint = document.querySelector("#terminal-print");
        var terminalLine = document.createElement("span");
        terminalLine.className = "terminal-line";
        terminalLine.textContent = text;
        terminalPrint.appendChild(terminalLine);
    }

    processCommand(command) {
        command = command.slice(0, command.length - 1);
        if (command != "") {
            if (this.options.commands[command] === undefined) {
                if (this.options.behaviour[command] === undefined) {
                    var output = this.options.behaviour["unknown"];
                    for (var i of output) {
                        this.appendLine(i);
                    }
                } else {
                    var output = this.options.behaviour[command];
                    for (var i of output) {
                        this.appendLine(i);
                    }
                }
            } else {
                var output = this.options.commands[command];
                for (var i of output) {
                    this.appendLine(i);
                }
            }
        }
    }

    showHelp() {
        var help = [];
        help.push("Try following commands");
        for (var i in this.options.commands) {
            // add some extra gap for readability
            help.push("- " + i);
        }
        return help;
    }
}
