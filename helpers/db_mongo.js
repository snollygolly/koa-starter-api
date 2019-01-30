const config = require("../config.json");
const MongoClient	= require("mongodb").MongoClient;

// Connection URL
const url = config.db.url;
const dbName = config.db.name;


// A custom Error just for database problems.
function MongoDBError(message) {
	this.name = "MongoDBError";
	this.message = (message || "");
}
MongoDBError.prototype = Error.prototype;

module.exports = {
	getDocument: async(id, collection) => {
		try {
			const client = await MongoClient.connect(url, { useNewUrlParser: true });
			const db = client.db(dbName);
			const doc = await db.collection(collection).findOne({_id: id});
			client.close();
			return doc;
		} catch (err) {
			throw new MongoDBError(`DB: Get of [${id}] failed`);
		}
	},
	findDocuments: async(query, collection) => {
		try {
			const client = await MongoClient.connect(url, { useNewUrlParser: true });
			const db = client.db(dbName);
			const doc = await db.collection(collection).find(query).toArray();
			client.close();
			return doc;
		} catch (err) {
			throw new MongoDBError(`DB: Find of [${id}] failed`);
		}
	},
	insertDocument: async(document, collection) => {
		try {
			const client = await MongoClient.connect(url, { useNewUrlParser: true });
			const db = client.db(dbName);
			const doc = await db.collection(collection).insertOne(document);
			client.close();
			return doc;
		} catch (err) {
			throw new MongoDBError(`DB: Insert of [${id}] failed`);
		}
	},
	updateDocument: async(query, params, collection) => {
		try {
			const client = await MongoClient.connect(url, { useNewUrlParser: true });
			const db = client.db(dbName);
			const doc = await db.collection(collection).findOneAndUpdate(query, params, {
				returnOriginal: false
			});
			client.close();
			return doc.value;
		} catch (err) {
			throw new MongoDBError(`DB: Insert of [${id}] failed`);
		}
	}
};
