// term.js -- Thomas Schweich
// Object representing a text terminal including methods for synchronously writing a line and asynchronously reading a line

function Term() {
    this.lines = []
    for (let i = 0; i < LINES; i++) {
        this.lines.push({
            type: 'none'
        })
    }
}

Term.prototype.writeLine = function (line) {
    this.lines.push({
        type: 'output',
        text: line
    })
    this.lines.shift()
}

Term.prototype.writeLines = function (lines) {
    for (let line of lines) {
        this.writeLine(line)
    }
}

Term.prototype.readLine = async function () {
    var result = null
    var timeout = null
    var line = {
        type: 'input',
        active: true,
        text: ''
    }
    this.lines.push(line)
    this.lines.shift()
    document.onkeydown = function (e) {
        if (e.keyCode == 13) { // ENTER
            result = line.text
        } else if (e.keyCode == 8) { // BACKSPACE
            e.preventDefault()
            if (line.text.length > 0) {
                line.text = line.text.slice(0, -1)
            }
        } else if (e.key.length == 1) {
            line.text += e.key
        }
    }

    async function waitInput() {
        if (result == null) {
            return new Promise(function (resolve, reject) {
                clearTimeout(timeout)
                timeout = setTimeout(() => resolve(waitInput()), 100)
            })
        } else {
            line.active = false
            document.onkeydown = null
            return result
        }
    }

    return await waitInput()
}
