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
        term.writeLine('Oxen are $100 per Ox')
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
        term.read(player, 'food')
    },
    'food': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'food')
            return
        }
        var cost = game.items['food'].price * num
        if(player.money > cost) {
            player.inventory.food += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'food')
            return
        }
        term.writeLine('How much clothing would you like to buy?')
        term.writeLine('It costs ' + game.items.clothing.price + ' per set.')
        term.read(player, 'clothing')
    },

    'Clothing': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'clothing')
            return
        }
        var cost = game.items['clothing'].price * num
        if(player.money > cost) {
            player.inventory.clothing += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'clothing')
            return
        }
        term.writeLine('How much ammo would you like to buy?')
        term.writeLine('It costs ' + game.items.ammo.price + ' per bullet.')
        term.read(player, 'ammo')
    },
    'ammo': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'ammo')
            return
        }
        var cost = game.items['ammo'].price * num
        if(player.money > cost) {
            player.inventory.ammunition += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'ammo')
            return
        }
        term.writeLine('How many wagon wheels would you like to buy?')
        term.writeLine('It costs ' + game.items.wagon_wheel.price + ' per wheel.')
        term.read(player, 'wheel')
    },
    'wheel': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'wheel')
            return
        }
        var cost = game.items['wagon_wheel'].price * num
        if(player.money > cost) {
            player.inventory.wagon_wheel += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'wheel')
            return
        }
        term.writeLine('How many Wagon Axles would you like to buy?')
        term.writeLine('It costs ' + game.items.wagon_axle.price + ' per Axle.')
        term.read(player, 'axle')
    },
    'axle': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'axle')
            return
        }
        var cost = game.items['wagon_axle'].price * num
        if(player.money > cost) {
            player.inventory.wagon_axle += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'wagon_axle')
            return
        }
        term.writeLine('How many Wagon Tongues would you like to buy?')
        term.writeLine('It costs ' + game.items.wagon_tongue.price + ' per tongue.')
        term.read(player, 'tongue')
    },
    'tongue': function(player, term, input) {
        try {
            var num = Number.parseInt(input)
        } catch {
            term.writeLine('Please enter an integer')
            term.read(player, 'tongue')
            return
        }
        var cost = game.items['wagon_tongue'].price * num
        if(player.money > cost) {
            player.inventory.wagon_tongue += num
            player.money -= cost
        } else {
            term.writeLine('Insufficient funds. Type "0" if you do not wish to purchase any.')
            term.read(player, 'tongue')
            return
        }
        term.terminate(player)
    },
}

exports.states = states
