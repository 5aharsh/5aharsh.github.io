class Options {
    constructor(behaviour = {}, commands = {}, files = {}) {
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
    constructor(selector = "#terminal", options = null) {
        this.terminal = document.querySelector(selector);
        this.input = document.querySelector("#terminal-text");
        if (options === null) {
            this.options = new Options();
            this.options.setFiles({
                "about.txt": [
                    "<h3>Hi 👋,</h3>",
                    "&nbsp;",
                    "I am Saharsh, a software Developer from India.",
                    "Currently, I am working as an engineering Associate at Goldman Sachs.",
                    "I love working on complex software problems and building simple solutions.",
                    "I tend to write silly code in my free time. This portfolio being an example for instace.",
                    "&nbsp;",
                    "Feel free to hack around!"
                ],
                "socials.txt": [
                    "LinkedIn - [ <a href='https://www.linkedin.com/in/5aharsh/'>https://www.linkedin.com/in/5aharsh/</a> ]",
                    "Stackoverflow - [ <a href='https://stackoverflow.com/users/4720652'>https://stackoverflow.com/users/4720652</a> ]",
                    "GitHub - [ <a href='https://github.com/5aharsh'>https://github.com/5aharsh</a> ]"
                ],
                "sample.txt": [
                    ""
                ]
            });
            this.options.setCommands({
                whoami: (_command_line) => {
                    this.appendMultiLine([
                        "Saharsh Anand (@5aharsh)"
                    ])
                },
                date: (_command_line) => {
                    this.appendMultiLine([
                        new Date()
                    ])
                },
                pwd: (_command_line) => {
                    this.appendMultiLine([
                        window.location.href
                    ])
                },
                clear: this.clearTerminal,
                ls: (_command_line) => {
                    this.appendMultiLine([
                        this.listFiles()
                    ])
                },
                cat: (_command_line)=>{
                    var file = _command_line[1];
                    if (this.options.files[file] === undefined) {
                        this.appendLine("File not found");
                    } else {
                        this.appendMultiLine(this.options.files[file]);
                    }
                }

            });
            this.options.setBehaviour({
                unknown: ["Unknown command... Try 'help'"],
                help: this.showHelp(),
            });
        } else {
            this.options = options;
        }
    }

    static getTerminalPrint(terminal = '#terminal-print'){
        return document.querySelector(terminal);
    }

    execute(command) {
        this.appendLine("<div id='terminal-pointer'>[ <span>Saharsh@Desktop (@5aharsh) ~</span> ]</div>");
        this.appendLine(command, "t-thin");
        this.processCommand(command);
        this.input.value = "";
    }

    appendLine(text) {
        this.appendLine(text, null);
    }

    appendLine(text, modifierClass) {
        var terminalPrint = document.querySelector("#terminal-print");
        var terminalLine = document.createElement("span");
        terminalLine.className = "terminal-line";
        if (modifierClass!=null)
            terminalLine.className += " "+modifierClass;
        terminalLine.innerHTML = text;
        terminalPrint.appendChild(terminalLine);
        window.scrollTo(0, document.body.scrollHeight);
    }

    appendMultiLine(textArray) {
        for (var i of textArray) {
            this.appendLine(i);
        }
    }

    processCommand(command) {
        command = command.replace(/(?:\r\n|\r|\n)/g, '');
        var command_line = command;
        var command_line_array = command_line.split(" ");
        if (command != "") {
            if (this.options.commands[command_line_array[0]] === undefined) {
                if (this.options.behaviour[command_line_array[0]] === undefined) {
                    var output = this.options.behaviour["unknown"];
                    for (var i of output) {
                        this.appendLine(i);
                    }
                } else {
                    var output = this.options.behaviour[command_line_array[0]];
                    for (var i of output) {
                        this.appendLine(i);
                    }
                }
            } else {
                this.options.commands[command_line_array[0]](command_line_array);
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

    clearTerminal(_command_line){
        Terminal.getTerminalPrint().innerHTML = "";
    }
}
