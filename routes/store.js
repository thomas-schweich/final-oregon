const game = require('../public/game.json')

var states = {
    '': function(player, term, input) {
        term.writeLines([
            'Welcome to the General Store!',
            'Would you like to:',
            '(1) Buy items',
            '(2) Sell items'
        ])
        term.read(player, 'buysell')
    },
    'buysell': function(player, term, input) {
        if(input === "1") {
            term.writeLine("How many oxen would you like to buy?")
            term.read(player, 'oxenBought')
        } else if (input === "2") {
            term.writeLine("How many oxen would you like to sell?")
            term.read(player, 'oxenSold')
        } else {
            term.writeLine("Invalid selection. Valid options are '1' or '2'")
        }
    },
    'oxenBought': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'oxenBought')
            return
        }
        if(player.money < game.items.oxen.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'oxenBought')
            return
        }
        player.money -= game.items.oxen.price * numberBought
        player.inventory.oxen += numberBought
        term.writeLine("Successfully bought " + numberBought + " oxen")
        term.terminate(player)
    },
    'oxenSold': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'oxenSold')
            return
        }
        if(player.items.oxen < numberSold) {
            term.writeLine("You don't have enough oxen to sell.")
            term.read(player, 'oxenSold')
            return
        }
        player.money += game.items.oxen.value * numberSold
        player.inventory.oxen -= numberSold
        term.writeLine("Successfully sold " + numberSold + " oxen")
        term.terminate(player)
    }

}

exports.states = states
