const game = require('../public/game.json')
const playerSchema = require('../schema.js')
var chatrooms = {name : []}

var states = {
    '': function(player, term, input) {
		playerSchema.addNearby(player)
        term.writeLines([
			'You enter a tavern',
			"You decide to yell whatevers on your mind at the room",
			'Enter your message or enter "Leave" to exit'
		])
		term.read(player, 'enterMessage')
	},
	'enterMessage': function(player, term, input) {
		if (input == "Leave") {
			term.writeLine("Goodbye")
			term.terminate()
		}
		else{
			if chatroom[player.locations.name]{
				if (chatroom[player.locations.name].length <= 50){
					chatroom[player.locations.name] += input
				}
				else{
					for (index in chatroom[player.locations.name].length){
						chatroom[player.locations.name].shift()
					}
					chatroom[player.locations.name] += input
				}
			}
			else{
				chatroom[player.locations.name] = input
			}
		}
	}
	/*'select' : function(player, term, input) {
		if (input == "Leave") {
			term.terminate(player)
		}
		else{
			for (let index of player.nearby){
				if (index.sn == input) {
					player.trader.sn = input
					term.writeLines([
						'What would you like to give them',
						'(1) oxen',
						'(2) food',
						'(3) ammunition',
						'(4) clothes',
						'(5) wagon_wheel',
						'(6) wagon_axle',
						'(7) wagon_tongue',
						'(8) money'
					])
					term.read(player, 'sell')
				}
			}
			term.writeLine("No player with that sn")
			term.writeLine('Enter a valid sn or enter "Leave" to exit')
			term.read("select")
		}
	},
	'sell' : function(player, term, input) {
		if (input == "1"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "oxen"
			term.read("sellAmount")
		}
		else if (input =="2"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "food"
			term.read("sellAmount")
		}
		else if (input =="3"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "ammunition"
			term.read("sellAmount")
		}
		else if (input =="4"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "clothes"
			term.read("sellAmount")
		}
		else if (input =="5"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "wagon_wheel"
			term.read("sellAmount")
		}
		else if (input =="6"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "wagon_axle"
			term.read("sellAmount")
		}
		else if (input =="7"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "wagon_tongue"
			term.read("sellAmount")
		}
		else if (input =="8"){
			term.writeLine("How much would you like to offer")
			player.trade.sellItem = "money"
			term.read("sellAmount")
		}
		else{
			term.writeLine("Enter a valid number")
			term.read('sell')
		}
	},
	'sellAmount' : function(player, term, input) {
		if (input == "Leave"){
			term.terminate(player)
		}
		try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine('Invalid input. Please write an integer value and press enter or type "Leave" to exit.')
            term.read(player, 'sellAmount')
            return
        }
		sellItem = player.trade.sellItem
		if (input>player.inventory[sellItem] && input>0){
			term.writeLine("You do not have enough " + sellItem)
			term.read('sellAmount')
		}
		else{
			player.trade.sellAmount = input
			term.writeLines([
				'What would you like to buy from them',
				'(1) oxen',
				'(2) food',
				'(3) ammunition',
				'(4) clothes',
				'(5) wagon_wheel',
				'(6) wagon_axle',
				'(7) wagon_tongue',
				'(8) money'
			])
			term.read('buy')
		}	
	},
	'buy' : function(player, term, input) {
		if (input == "1"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "oxen"
			term.read("buyAmount")
		}
		else if (input =="2"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "food"
			term.read("buyAmount")
		}
		else if (input =="3"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "ammunition"
			term.read("buyAmount")
		}
		else if (input =="4"){
			term.writeLine("How much would you like to buy from them")
			player.trade.sellItem = "clothes"
			term.read("sellAmount")
		}
		else if (input =="5"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "wagon_wheel"
			term.read("buyAmount")
		}
		else if (input =="6"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "wagon_axle"
			term.read("buyAmount")
		}
		else if (input =="7"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "wagon_tongue"
			term.read("buyAmount")
		}
		else if (input =="8"){
			term.writeLine("How much would you like to buy from them")
			player.trade.buyItem = "money"
			term.read("buyAmount")
		}
		else{
			term.writeLine("Enter a valid number")
			term.read('buy')
		}
	},
	'buyAmount' : function(player, term, input) {
		if (input == "Leave"){
			term.terminate(player)
		}
		try {
            var numberSold = Number.parseInt(input)
        } catch (e) {
            console.error(e)
            term.writeLine('Invalid input. Please write an integer value and press enter or type "Leave" to exit.')
            term.read(player, 'buyAmount')
            return
        }
		buyItem = player.trade.buyItem
		partner = player.nearby.filter(function(v){
			return v.sn == player.trade.partnerSn
		})[0]
		if (input>partner.inventory[buyItem] && input>0){
			term.writeLine("They do not have enough " + sellItem)
			term.read('buyAmount')
		}
		else{
			player.trade.buyAmount = input
			term.writeLine("Your offer has be sent")
			var tradePartner = await getPlayer(partner)
			if (tradePartner.offers.name == ""){
				playerSchema.updateDatabase(partner, "offers.name", player.name)
			}
			else{
				term.writeLine("Player is currently busy")
			}
			term.terminate(player)
		}	
	}*/
}

exports.states = states