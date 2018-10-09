var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)


var player = {
    sn: String,
    name: String,
    turn: Number,
    miles: Number,
    location: String,
    status: String,
    inventory: {
        oxen: Number,
        ammunition: Number
    },
    party: [String],
    offers: [
        {
            name: String,
            request: {
                item: String,
                amount: Number
            },
            sn: String
        },
    ],
    nearby: [
        {   
            uid: String,
            inventory: {
                oxen: Number,
                ammunition: Number
            }
        },
    ]
  }

var playerSchema = new mongoose.Schema(player)
var Player = mongoose.model('Player', playerSchema)

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
    nplayer = {
        ...nplayer,
        ...properties
    }
    nplayer.save()
    return nplayer
}

/**
 * Get a player by Save Number
 * @param {String} sn 
 */
exports.getPlayer = async function getPlayer(sn) {
    return await Player.findOne({sn: sn})
}

/**
 * Modifies the player with save number sn
 * Objects below the first level must be complete
 * @param {String} sn The player's Save Number
 */
exports.modifyPlayer = async function modifyPlayer(sn, properties) {
    var player = await getPlayer(sn)
    player = {
        ...player,
        ...properties
    }
    player.save()
}


