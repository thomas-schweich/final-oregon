
 /**
  * Object defining funcitonality 
  * @param {String} label The label used to access the plugin as in /<sn>/LABEL
  * @param {function(player) => boolean} validate Return true if the player is eligable to participate in this plugin, false otherwise
  * @param {function(player, req, res)} action Perform the action on res given req
  */
exports.Plugin = function Plugin(label, validate, action) {
    this.label = label
    this.validate = validate
    this.action = action
}

/**
 * Causes the plugin to respond according to the given request if the given player is valid
 * @param {Player} player 
 * @param {Request} req 
 * @param {Response} res 
 */
Plugin.prototype.handle = function(player, req, res) {
    if(this.validate(player)) {
        this.action(player, req, res)
    } else {
        res.sendStatus(400)
    }
}

/**
 * A group of plugins which can be chosen by label
 */
exports.PluginGroup = function PluginGroup() {
    this.plugins = {}
}


PluginGroup.prototype.handle = function(label, player, req, res) {
    this.plugins[label].handle(player, req, res)
}

PluginGroup.prototype.addPlugin = function (plugin) {
    this.plugins[plugin.label] = plugin
}
