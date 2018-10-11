const game = require('../public/game.json')

var states = {
    '': function(player, term, input) {
        term.writeLines([
            'Welcome to the Oregon Trail!',
            'The journey will be trying, but those who prevail will be rewarded.',
            'So, who are you?'
        ])
        game.occupations.forEach((e, i) => {
            term.writeLine('(' + (i + 1) + ') ' + e.name + ' (' + e.difficulty + ')')
        })
        term.read(player, 'difficultySelected')
    },
    'difficultySelected': function(player, term, input) {
        switch(input) {
            case '1':
                player.money = game.occupations[0].money
                break
            case '2':
                player.money = game.occupations[1].money
                break
            case '3':
                player.money = game.occupations[2].money
                break
            default:
                term.writeLine('Please enter either "1", "2", or "3"')
                term.read(player, 'difficultySelected')
                return
        }
        term.writeLine('What is your name?')
        term.read(player, 'nameEntered')
    },
    'nameEntered': function(player, term, input) {
        if(input.split(' ').length > 1) {
            term.writeLine('Too many spaces. Please enter a nickname below.')
            term.read(player, 'nameEntered')
            return
        }
        player.name = input
        term.writeLine('Hello, ' + player.name)
        term.writeLine('You have $' + player.money)
        term.writeLine('How many oxen do you want to buy?')
        term.read(player, 'oxen')
    },
    'oxen': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'oxen')
            return
        }
        var cost = game.items['oxen'].price * num
        if(player.money > cost) {
            player.inventory.oxen += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'oxen')
            return
        }
        term.writeLine('How much food would you like to buy?')
        term.writeLine('It costs ' + game.items.food.price + ' per lb.')
        term.terminate(player)
        //term.read(player, 'food')
    }
}

exports.states = states
