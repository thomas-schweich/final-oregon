const game = require('../public/game.json')

var states = {
    '': function (player, term, input) {
        var prompt = game.features.hunt.prompts [Math.floor(Math.random() * game.features.hunt.prompts.length)]
        player.huntPrompt = prompt
        term.writeLines([
            'Begin Hunting!',
            'Type: ' + prompt
        ])
        term.read(player, 'shoot')
    },
    'shoot': function(player, term, input) {
        if(input === player.huntPrompt) {
            term.writeLine("Hit!")
            var numMeat = [Math.floor(Math.random() * 100)]
            if(player.inventory.food < 2000) {
                term.writeLine(numMeat + " food added to your inventory")
                player.inventory.food += numMeat
                term.terminate(player)
            }
        } else {
            term.writeLine("you missed!")
            term.terminate(player, 'hunt')

        }
    },

    
}
exports.states = states