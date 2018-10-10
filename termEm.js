// termEm.js
// A back-end terminal emulator which can send and receive (sort of) requests to the front-end

function TermEm(player, req, res) {
    this.lines = []
    this.res = res
    this._plugin = req.url.split('/')[2]
    this._inprogress = player.inprogress
}

/**
 * Schedule the given line to be written to the front-end
 * @param {String} line 
 */
TermEm.prototype.writeLine = function (line) {
    this.lines.push(line)
}

/**
 * Schedule the given lines to be written to the front-end
 * @param {[String]} lines 
 */
TermEm.prototype.writeLines = function (lines) {
    for(let l of lines) {
        this.writeLine(l)
    }
}

/**
 * Ask the front end to move to the given nextPlugin, 
 * with options to first prompt the user for info (false default), and
 * an option to continue or end the game (continue by default)
 * @param {Player} player 
 * @param {String} nextPlugin 
 * @param {Boolean} read 
 * @param {Boolean} cont 
 */
TermEm.prototype.end = function (player, nextPlugin='home', read=false, cont=true) {
    player.nextURL = '/' + player.sn + '/' + nextPlugin
    player.save()
    this.res.json({
        player: player,
        read: read,
        cont: cont,
        lines: this.lines,
        nextURL: player.nextURL
    })
}

/**
 * Ask the client to come back to the same url with a new input based on the current prompts
 * Sets up 'callback' to the given state upon completion
 * Saves the given player after adjusting its inprogress field
 * @param {Player} player 
 * @param {String} state
 */
TermEm.prototype.read = function (player, state='') {
    this._setState(player, state)
    player.save()
    this.end(player, this._plugin, true, true)
}

/**
 * Set the state of the plugin for the given player
 * @param {Player} player 
 * @param {String} state 
 */
TermEm.prototype._setState = function(player, state) {
    player.inprogress = player.inprogress.filter((v) => !v.startsWith(this._plugin + ':'))
    player.inprogress.push(this._plugin + ':' + state)
}

/**
 * Returns the current in-progress state for the terminal based on its plugin and the
 * player's inprogress property
 */
TermEm.prototype._getState = function (player) {
    var statestr = player.inprogress.filter((v) => v.startsWith(this._plugin + ':'))
    if(statestr.length > 0)
        return statestr[0].split(':')[1]
    else
        return ''
}

/**
 * Cause the terminal to move to the proper state depending on its player's inprogress property
 */
TermEm.prototype.pickUp = function (player, input) {
    var state = this._getState(player)
    this.states[this._plugin][state](player, this, input)
}

TermEm.prototype.states = {}

/**
 * Initializes TermEm statically with the given states.
 * Format: {PLUGIN: {STATE: FUN}} where PLUGIN is the string name of the plugin,
 * STATE is the name of a plugin's state, and FUN is a function to call
 * once in that state
 * @param {String} name 
 * @param {{String: function(TermEm)}} states 
 */
TermEm.addPlugin = function(name, states) {
    TermEm.prototype.states[name] = states
}

exports.TermEm = TermEm

