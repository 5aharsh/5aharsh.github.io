class Options {
    constructor(selector = "#terminal", behaviour = {}, commands = {}, files = {}) {
        this.selector = selector;
        this.behaviour = behaviour;
        this.commands = commands;
        this.files = files;
    }

    setBehaviour(behaviour) {
        this.behaviour = behaviour;
    }

    setCommands(commands) {
        this.commands = commands;
    }

    setFiles(files) {
        this.files = files;
    }
}

class Terminal {
    constructor(options = null) {
        if (options === null) {
            this.options = new Options();
            this.options.setFiles({
                "about.txt": [
                    "Some file to read from"
                ],
                "socials.txt": [
                    "LinkedIn - https://www.linkedin.com/in/5aharsh/",
                    "Stackoverflow - https://stackoverflow.com/users/4720652"
                ],
                "sample.txt": [
                    ""
                ]
            });
            this.options.setCommands({
                whoami: ["Saharsh Anand (@5aharsh)"],
                date: [new Date()],
                pwd: [window.location.href],
                ls: [this.listFiles()]

            });
            this.options.setBehaviour({
                unknown: ["Unknown command... Try 'help'. Add some really long sentence to test the width thing"],
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
        this.input.value = "";
    }

    appendLine(text) {
        var terminalPrint = document.querySelector("#terminal-print");
        var terminalLine = document.createElement("span");
        terminalLine.className = "terminal-line";
        terminalLine.textContent = text;
        terminalPrint.appendChild(terminalLine);
        window.scrollTo(0, document.body.scrollHeight);
    }

    processCommand(command) {
        command = command.replace(/(?:\r\n|\r|\n)/g, '');
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

    listFiles(){
        var files = "";
        for (var i in this.options.files) {
            // Add some extra gap for readability
            files = files + "\u00a0" + i + "\u0009";
        }
        return files;
    }
}
