const game = require('../public/game.json')



/**
 * Generates up to one event and one disease to happen to the player
 */
function luck() {
    for (let e of game.events) {
        var luck = Math.random() * 2
    }
}

var states = {
    '': function (player, term, input) {
        var recentIdx = 0
        game.locations.forEach(function(e, i) {
            if (e.distance < player && i > recentIdx) {
                recentIdx = i
            }
        })
        player.location = game.locations[recentIdx + 1]
        player.miles = game.locations[recentIdx + 1].distance
        term.terminate(player)
    }
}

exports.states = states
