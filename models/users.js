const db = require("../helpers/db_mongo");
const common = require("../helpers/common");

module.exports = {
	get: async(id) => {
		const user = await db.getDocument(id, "users");
		if (user === null) {
			throw new Error("No user exists with this id");
		}
		return user;
	},
	update: async(id, props) => {
		const user = await db.updateDocument({
			_id: id
		},{
			$set: props
		}, "users");
		if (user === null) {
			throw new Error("No user can be updated with this id");
		}
		return user;
	}
};
