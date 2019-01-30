const Promise = require("bluebird");
const cradle	= Promise.promisifyAll(require("cradle"));

// A custom Error just for database problems.
function CouchDBError(message) {
	this.name = "CouchDBError";
	this.message = (message || "");
}
CouchDBError.prototype = Error.prototype;

// Connects to a database and returns the DB object.
const connectToDatabase = (dbName) => {
	try {
		return new(cradle.Connection)().database(dbName);
	} catch (err) {
		throw new CouchDBError(`DB: Get: Connection to database [${dbName}] failed`);
	}
};

module.exports = {
	createDatabase: async(database) => {
		try {
			const c = new(cradle.Connection)();
			const db = c.database(database);
			const confirmation = await db.createAsync();
			return confirmation;
		} catch (err) {
			throw new CouchDBError(`DB: Create of [${database}] failed`);
		}
	},
	deleteDatabase: async(database) => {
		try {
			const db = connectToDatabase(database);
			const confirmation = await db.destroyAsync();
			return confirmation;
		} catch (err) {
			throw new CouchDBError(`DB: Delete of [${database}] failed`);
		}
	},
	getDocument: async(id, database) => {
		try {
			const db = connectToDatabase(database);
			const doc = await db.getAsync(id);
			return doc;
		} catch (err) {
			throw new CouchDBError(`DB: Get of [${id}] failed`);
		}
	},
	saveDocument: async(document, database) => {
		try {
			const db = connectToDatabase(database);
			const returnVal = await db.saveAsync(document._id, document);
			return document;
		} catch (err) {
			throw new CouchDBError(`DB: Save of [${document._id}] failed`);
		}
	},
	removeDocument: async(id, database) => {
		try {
			const db = connectToDatabase(database);
			const returnVal = await db.removeAsync(id);
			return returnVal;
		} catch (err) {
			throw new CouchDBError(`DB: Delete of [${id}] failed`);
		}
	},
	runView: async(path, key, database, opts = {}) => {
		try {
			const db = connectToDatabase(database);
			const returnVal = {};
			if (key !== null) {
				opts.key = key;
			}
			returnVal.results = await db.viewAsync(path, opts);
			return returnVal;
		} catch (err) {
			throw new CouchDBError(`DB: View of [${path}] failed`);
		}
	},
	saveView: async(id, view, database) => {
		try {
			const db = connectToDatabase(database);
			const document = await db.saveAsync(`_design/${id}`, view);
			return document;
		} catch (err) {
			throw new CouchDBError(`DB: Save of [${id}] view failed`);
		}
	}
};
