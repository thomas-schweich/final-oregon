const game = require('../public/game.json')

var states = {
    '': function(player, term, input) {
        term.writeLines([
            'Welcome to the ' + player.location.name + ' General Store!',
            'Would you like to:',
            '(1) Buy items',
            '(2) Sell items'
        ])
        term.read(player, 'itemSelect')
    },
	'itemSelect' : function(player,term,input) {
		if (input=="1") {
			term.writeLines([
				'What item would you like buy?',
				'(1) Buy oxen',
				'(2) Buy food',
				'(3) Buy amunition',
				'(4) Buy clothes',
				'(5) Buy spare parts',
			])
			term.read(player, 'buy')
		}
		else if (input=="2") {
			term.writeLines([
				'What item would you like sell?',
				'(1) Sell oxen',
				'(2) Sell food',
				'(3) Sell amunition',
				'(4) Sell clothes',
				'(5) Sell spare parts',
			])
			term.read(player, 'sell')
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'itemSelect')
		}
	},
	'buy' : function(player, term, input) {
		if (input=="1"){
			term.writeLine("Oxen cost " + game.items.oxen.price + " per ox.")
			term.writeLine("How many oxen would you like to buy?")
			term.read(player,"oxenBuy")
		}
		else if (input=="2"){
			term.writeLine("Food costs " + game.items.food.price + " per pound.")
			term.writeLine("How much food would you like to buy?")
			term.read(player,"foodBuy")
		}
		else if (input=="3"){
			term.writeLine("Ammunition costs " + game.items.ammunition.price + " per bullet.")
			term.writeLine("How much ammunition would you like to buy?")
			term.read(player,"ammunitionBuy")
		}
		else if (input=="4"){
			term.writeLine("Clothes cost " + game.items.clothes.price + " per set.")
			term.writeLine("How many clothes would you like to buy?")
			term.read(player,"clothesBuy")
		}
		else if (input=="5"){
			term.writeLines([
				"What kind of wagon part would you like to buy",
				"(1) Buy wagon wheel",
				"(2) Buy wagon axle",
				"(3) Buy wagon tongue"
			])
			term.read(player, "partSelectBuy")
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'buy')
		}
	},
	'partSelectBuy': function(player, term, input) {
		if(input === "1") {
			term.writeLine("Wagon wheels cost " + game.items.wagon_wheel.price + " per wheel.")
			term.writeLine("How many wheels would you like to buy?")
			term.read(player,"wheelBuy")
		}
		else if (input === "2") {
			term.writeLine("Wagon axles cost " + game.items.wagon_axle.price + " per axle.")
			term.writeLine("How many axles would you like to buy?")
			term.read(player,"axleBuy")
		}
		else if (input === "3") {
			term.writeLine("Wagon tongues cost " + game.items.wagon_tongue.price + " per tongue.")
			term.writeLine("How many tongues would you like to buy?")
			term.read(player,"tongueBuy")
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'partSelectBuy')
		}
	},
    'oxenBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'oxenBuy')
            return
        }
        if(player.money < game.items.oxen.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'oxenBuy')
            return
        }
        player.money -= game.items.oxen.price * numberBought
        player.inventory.oxen += numberBought
        term.writeLine("Successfully bought " + numberBought + " oxen")
        term.terminate(player)
    },
	'foodBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'foodBuy')
            return
        }
        if(player.money < game.items.food.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'foodBuy')
            return
        }
        player.money -= game.items.food.price * numberBought
        player.inventory.food += numberBought
        term.writeLine("Successfully bought " + numberBought + " pounds of food")
        term.terminate(player)
    },
	'ammunitionBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'ammunitionBuy')
            return
        }
        if(player.money < game.items.ammunition.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'ammunitionBuy')
            return
        }
        player.money -= game.items.ammunition.price * numberBought
        player.inventory.ammunition += numberBought
        term.writeLine("Successfully bought " + numberBought + " bullets")
        term.terminate(player)
    },
	'clothesBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'clothesBuy')
            return
        }
        if(player.money < game.items.clothes.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'clothesBuy')
            return
        }
        player.money -= game.items.clothes.price * numberBought
        player.inventory.clothes += numberBought
        term.writeLine("Successfully bought " + numberBought + " sets of clothes")
        term.terminate(player)
    },
	'wheelBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'wheelBuy')
            return
        }
        if(player.money < game.items.wagon_wheel.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'wheelBuy')
            return
        }
        player.money -= game.items.wagon_wheel.price * numberBought
        player.inventory.wagon_wheel += numberBought
        term.writeLine("Successfully bought " + numberBought + " wheels")
        term.terminate(player)
    },
	'axleBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'axleBuy')
            return
        }
        if(player.money < game.items.wagon_axle.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'axleBuy')
            return
        }
        player.money -= game.items.wagon_axle.price * numberBought
        player.inventory.wagon_axle += numberBought
        term.writeLine("Successfully bought " + numberBought + " axles")
        term.terminate(player)
    },
	'tongueBuy': function(player, term, input) {
        try {
            var numberBought = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'tongueBuy')
            return
        }
        if(player.money < game.items.wagon_tongue.price * numberBought) {
            term.writeLine("Insufficient funds. Please enter a number you can afford.")
            term.read(player, 'tongueBuy')
            return
        }
        player.money -= game.items.wagon_tongue.price * numberBought
        player.inventory.wagon_tongue += numberBought
        term.writeLine("Successfully bought " + numberBought + " tongues")
        term.terminate(player)
    },
	'sell' : function(player, term, input) {
		if (input=="1"){
			term.writeLine("I'll buy oxen for " + game.items.oxen.value + " per ox.")
			term.writeLine("How many oxen would you like to sell?")
			term.read(player,"oxenSell")
		}
		else if (input=="2"){
			term.writeLine("I'll buy food for " + game.items.food.value + " per pound.")
			term.writeLine("How much food would you like to sell?")
			term.read(player,"foodSell")
		}
		else if (input=="3"){
			term.writeLine("I'll buy ammunition for " + game.items.ammunition.value + " per bullet.")
			term.writeLine("How much ammunition would you like to sell?")
			term.read(player,"ammunitionSell")
		}
		else if (input=="4"){
			term.writeLine("I'll buy clothes for " + game.items.clothes.value + " per set.")
			term.writeLine("How many clothes would you like to sell?")
			term.read(player,"clothesSell")
		}
		else if (input=="5"){
			term.writeLines([
				"What kind of wagon part would you like to sell",
				"(1) Sell wagon wheel",
				"(2) Sell wagon axle",
				"(3) Sell wagon tongue"
			])
			term.read(player, "partSelectSell")
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'sell')
		}
	},
	'partSelectSell': function(player, term, input) {
		if(input === "1") {
			term.writeLine("I'll buy wagon wheels for " + game.items.wagon_wheel.value+ " per wheel.")
			term.writeLine("How many wheels would you like to sell?")
			term.read(player,"wheelSell")
		}
		else if (input === "2") {
			term.writeLine("I'll buy wagon axles for " + game.items.wagon_axle.value + " per axle.")
			term.writeLine("How many axles would you like to sell?")
			term.read(player,"axleSell")
		}
		else if (input === "3") {
			term.writeLine("I'll buy wagon tongues for " + game.items.wagon_tongue.value + " per tongue.")
			term.writeLine("How many tongues would you like to sell?")
			term.read(player,"tongueSell")
		}
		else{
			term.writeLine("Please input a valid number")
			term.read(player, 'partSelectBuy')
		}
	},
    'oxenSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'oxenSell')
            return
        }
        if(player.inventory.oxen < numberSold) {
            term.writeLine("You don't have enough oxen to sell.")
            term.read(player, 'oxenSell')
            return
        }
        player.money += game.items.oxen.value * numberSold
        player.inventory.oxen -= numberSold
        term.writeLine("Successfully sold " + numberSold + " oxen")
        term.terminate(player)
    },
	'foodSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'foodSell')
            return
        }
        if(player.inventory.food < numberSold) {
            term.writeLine("You don't have enough food to sell.")
            term.read(player, 'foodSell')
            return
        }
        player.money += game.items.food.value * numberSold
        player.inventory.food -= numberSold
        term.writeLine("Successfully sold " + numberSold + " pounds of food")
        term.terminate(player)
    },
	'ammunitionSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'ammunitionSell')
            return
        }
        if(player.inventory.ammunition < numberSold) {
            term.writeLine("You don't have enough ammunition to sell.")
            term.read(player, 'ammunitionSell')
            return
        }
        player.money += game.items.ammunition.value * numberSold
        player.inventory.ammunition -= numberSold
        term.writeLine("Successfully sold " + numberSold + " bullets")
        term.terminate(player)
    },
	'clothesSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'clothesSell')
            return
        }
        if(player.inventory.clothes < numberSold) {
            term.writeLine("You don't have enough clothes to sell.")
            term.read(player, 'clothesSell')
            return
        }
        player.money += game.items.clothes.value * numberSold
        player.inventory.clothes -= numberSold
        term.writeLine("Successfully sold " + numberSold + " sets of clothes")
        term.terminate(player)
    },
	'wheelSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'wheelSell')
            return
        }
        if(player.inventory.wagon_wheel < numberSold) {
            term.writeLine("You don't have enough wheels to sell.")
            term.read(player, 'wheelSell')
            return
        }
        player.money += game.items.wagon_wheel.value * numberSold
        player.inventory.wagon_wheel -= numberSold
        term.writeLine("Successfully sold " + numberSold + " wheels")
        term.terminate(player)
    },
	'axleSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'axleSell')
            return
        }
        if(player.inventory.wagon_axle < numberSold) {
            term.writeLine("You don't have enough axles to sell.")
            term.read(player, 'axleSell')
            return
        }
        player.money += game.items.wagon_axle.value * numberSold
        player.inventory.wagon_axle -= numberSold
        term.writeLine("Successfully sold " + numberSold + " axles")
        term.terminate(player)
    },
	'tongueSell': function(player, term, input) {
        try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine("Invalid input. Please write an integer value and press enter.")
            term.read(player, 'tongueSell')
            return
        }
        if(player.inventory.wagon_tongue < numberSold) {
            term.writeLine("You don't have enough tongues to sell.")
            term.read(player, 'tongueSell')
            return
        }
        player.money += game.items.wagon_tongue.value * numberSold
        player.inventory.wagon_tongue -= numberSold
        term.writeLine("Successfully sold " + numberSold + " tongues")
        term.terminate(player)
    }

}

exports.states = states
