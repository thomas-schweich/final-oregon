const game = require('../public/game.json')

var states = {
    '': function (player, term, input) {
        term.writeLines('You have died. Would you like to hire a preist?',
        '(1) Yes',
        '(2) No')
        
        if (input=="1") {
            term.read(player, 'preist')
		}
		else if (input=="2") {
			term.read(player, 'grave')
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'dead')
		}
    },
    'preist' : function(player,term) {
        term.writeLines('A preist arrives and asks what he is supposed to do with a dead body',
        'he states, "I dont even know CPR"')
        term.read(player, 'grave')
    },
    'grave' : function(player,term,input) {
        term.writeLines('Would you like to put a message on your gravestone?',
        '(1) Yes',
        '(2) No')

		if (input=="1") {
            term.writeLines('What do you want your gravestone to say?')
            graveText = input,
            term.writeLines('Your Gravestone: ' + graveText + ' ¯\_(ツ)_/¯')
			term.terminate(player)
		}
		else if (input=="2") {
            term.writeLines('Your Gravestone:  ¯\_(ツ)_/¯')
			term.terminate(player)
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'grave')
		}

    }
}

exports.states = states