const config = require("../config.json");

module.exports.heartbeat = async(ctx) => {
	return ctx.body = "Welcome to the Stick Quest API!";
};

module.exports.info = async(ctx) => {
	return ctx.body = {
		info: `Success: ${new Date()}`,
		user: ctx.state.user
	};
};
