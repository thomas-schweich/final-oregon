const game = require('../public/game.json')

/**
 * Generates a semirandom distance for a player to travel based on their wagon setup
 */
function distanceTraveled(player) {
    const distance = 150
    const target = 10
    const range = 3
    var wheels = Math.min(player.inventory.wagon_wheel, 4)
    var axles = Math.min(player.inventory.wagon_axle, 2)
    var tongues = Math.min(player.inventory.wagon_tongue, 1)
    var luck = Math.random() * range
    var score = wheels + axles + tongues + luck
    var fallback = 20 * Math.random()
    var effective = (score - target + range) / 3
    return Math.max(distance * effective, fallback)
}

/**
 * Populate player with a new location and distance based on a semirandom distance travelled
 * @param {Player} player 
 */
function locDist(player) {
    var recentIdx = 0
    game.locations.forEach(function(e, i) {
        if (!e.nonstandard && e.distance <= player.miles && i > recentIdx) {
            recentIdx = i
        }
    })
    var dist = distanceTraveled(player) + game.locations[recentIdx].distance
    var nextLoc = game.locations[recentIdx + 1]
    if (nextLoc.distance < dist) {
        player.miles = nextLoc.distance
        player.location = nextLoc
    } else {
        player.miles = dist
        player.location = game.locations[game.locations.length - 1]
    }
}

/**
 * Generates up to one event or disease to happen to the player
 */
function eventDisease() {
    var event = null
    var disease = null
    for (let e in game.events) {
        ev = game.events[e]
        event = Math.random() * 2 * ev.mean > Math.random() ? ev : null
    }
    for(let d in game.diseases) {
        disease = Math.random() * 2 * ev.mean > Math.random ? ev : null
    }
    if(event && disease) {
        if(Math.random() > .5) {
            event = null
        } else {
            disease = null
        }
    }
    return event || disease    
}

/**
 * Feeds the player's party semirandomly
 * @param {Player} player 
 */
function feed(player) {
    const maxfood = 10
    player.inventory.food -= player.party.length * Math.random() * maxfood
}

var states = {
    '': function (player, term, input) {
        locDist(player)
        feed(player)
        var ed = eventDisease(player)
        if(ed) {
            term.writeLine(ed.description_self)
        }
        var deadOf = null
        for(let d of player.diseases) {
            if(Math.random() < d.death_chance) {
                deadOf = d
                break;
            }
        }
        if(deadOf) {
            term.writeLine(deadOf.death_message_self)
            term.read(player, 'death')
            return
        }
        term.terminate(player)
    }
}

exports.states = states
