var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

var inventory = {
    oxen: Number,
    ammunition: Number,
    food: Number,
    axles: Number
}

var player = {
    sn: String,
    name: String,
    turn: Number,
    miles: Number,
    money: Number,
    location: String,
    status: String,
    inprogress: [],
    history: [{
        turn: Number,
        action: String,
        info: String
    }],
    inventory: inventory,
    party: [{
        name: String,
        diseases: [],
        alive: Boolean
    }],
    offers: {
        name: String,
        request: {
            item: String,
            amount: Number
        },
        reward: {
            item: String,
            amount: Number
        },
        sn: String
    },
    nearby: [{
        name: String,   
        sn: String,
        inventory: inventory
    }],
	trade: {
		partnerSn : String,
		sellItem : String,
		sellAmount : Number,
		buyItem : String,
		buyAmount : Number
	}
  }

var playerSchema = new mongoose.Schema(player)
var Player = mongoose.model('Player', playerSchema)
exports.Player = Player

/**
 * Adds an empty player to the database, returning its unique Save Number
 */
exports.newPlayer = async function newPlayer(properties={}) {
    var sn, count
    do {
        sn = (Math.random() + 1).toString(36).substr(2, 6)
        count = await Player.count({sn: sn}).exec()
    } while(count)
    var nplayer = new Player({sn: sn})
    for (let p in properties) {
        nplayer[p] = properties[p]
    }
    nplayer.save()
    return nplayer
}

/**
 * Get a player by Save Number
 * @param {String} sn 
 */
exports.getPlayer = async function getPlayer(sn) {
    return await Player.findOne({sn: sn}).exec()
}

/**
 * Modifies the player with save number sn
 * Properties must be top-level
 * @param {String} sn The player's Save Number
 */
exports.modifyPlayer = async function modifyPlayer(sn, properties) {
    var player = await getPlayer(sn)
    for(let p in properties) {
        player[p] = properties[p]
    }
    player.save()
}

/**
* Adds information about nearby players to the given player 
*/
exports.addNearby = async function (player) {
	player.nearby = []
	nearby = await Player.findAll({
		location: {name: player.location.name}
	})
	for (let p of nearby) {
		player.nearby.push({
			name: p.name,
			sn: p.sn,
			inventory: p.inventory
		})
	}
}


