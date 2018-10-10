var states = {
    '': function (player, term, input) {
        term.writeLine('You are in ' + player.location + ' at mile marker ' + player.miles)
        term.writeLine('Would you like to:')
        player.location.features.foreach(function (e, i) {
            term.writeLine('(' + (i + 1) + ') ' + e.description)
        })
        term.read(player, 'chosen')
    },
    'chosen': function(player, term, input) {
        var choice = Number.parseInt(input) - 1
        term.end(player, player.location.features[choice])
    }
}

exports.states = states
