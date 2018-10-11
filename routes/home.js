const game = require('../public/game.json')

var states = {
    '': function (player, term, input) {
        term.writeLine('You are in ' + player.location.name + ' at mile marker ' + player.miles)
        term.writeLine('Would you like to:')
        player.location.features.forEach(function (e, i) {
            feature = game.features[e]
			term.writeLine("In home")
            term.writeLine('(' + (i + 1) + ') ' + feature.description)
        })
        term.read(player, 'chosen')
    },
    'chosen': function(player, term, input) {
        var choice = Number.parseInt(input) - 1
        term.terminate(player, player.location.features[choice])
    }
}

exports.states = states
