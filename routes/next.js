const game = require('../public/game.json')

var states = {
    '': function (player, term, input) {
        var locIdx
        game.locations.forEach(function(e, i) {
            if (e.name === player.location.name) {
                locIdx = i
            }
        })
        // TODO handle if cannot find
        player.location = game.locations[locIdx + 1]
        player.miles = game.locations[locIdx + 1].distance
        term.terminate(player)
    }
}

exports.states = states
