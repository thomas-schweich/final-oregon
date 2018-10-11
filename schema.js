var mongoose = require('mongoose')
const game = require('./public/game.json')

mongoose.connect(process.env.MONGODB_URI || require('./dev_db.json'))

var inventory = {
    oxen: Number,
    food: Number,
    clothing: Number,
    ammunition: Number,
    wagon_wheel: Number,
    wagon_axle: Number,
    wagon_tongue: Number
}

var player = {
    sn: String,
    nextURL: String,
    alive: Boolean,
    done: Boolean,
    name: String,
    turn: Number,
    miles: Number,
    money: Number,
    huntPrompt: String,
    location: {
        name: String,
        features: [String],
        distance: Number
    },
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
    offers: [{
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
    }],
    nearby: [{
        name: String,   
        sn: String,
        inventory: inventory
    }]
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
    var nplayer = new Player({
        sn: sn, 
        nextURL: '/' + sn + '/home',
        location: game.locations[0],
        inventory: {
            oxen: 0,
            food: 0,
            clothing: 0,
            ammunition: 0,
            wagon_wheel: 0,
            wagon_axle: 0,
            wagon_tongue: 0
        },
        miles: 0,
        alive: true,
        done: false,
        money: 0,
        name: "",
        status: "",
        turn: 1
    })
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


