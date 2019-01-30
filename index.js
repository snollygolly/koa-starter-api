const config = require("./config.json");

const http = require("http");
const https = require("https");
const fs = require("fs");
const Koa = require("koa");

// for passport support
const jwt = require("koa-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

exports.app = app;

const secret = {
	jwksUri: config.site.jwt.jwksUri,
	cache: true,
	rateLimit: true,
	jwksRequestsPerMinute: 2
};

app.use(jwt({
	secret: jwksRsa.koaJwtSecret(secret),
	audience: config.site.jwt.audience,
	issuer: config.site.jwt.issuer,
	algorithms: ["RS256"]
}).unless({ path: [/^\/heartbeat/] }));

// body parser
app.use(bodyParser());

// Error handling middleware
app.use(async(ctx, next) => {
	try {
		await next();
		if (ctx.status === 200) {
			return ctx.body = {
				error: false,
				result: ctx.body
			};
		}
	} catch (err) {
		ctx.app.emit("error", err, this);
		ctx.status = err.status || 500;
		return ctx.body = {
			error: true,
			message: err.message
		};
	}
});

require("./routes");

// Listen
const httpServer = http.createServer(app.callback())
	.listen(config.site.port, listeningReporter);

let httpsServer;
if (config.site.ssl.enabled === true) {
	httpsServer = https.createServer({
		key: fs.readFileSync(config.site.ssl.key, "utf8"),
		cert: fs.readFileSync(config.site.ssl.cert, "utf8")
	}, app.callback()).listen(config.site.ssl.port, listeningReporter);
}
// A function that runs in the context of the http server
// and reports what type of server listens on which port
function listeningReporter() {
	// `this` refers to the http server here
	const { port } = this.address();
	const protocol = this.addContext ? "https" : "http";
	console.log(`${config.site.name} is now listening on port ${port} [${protocol}]`);
}

process.on("SIGINT", function exit() {
	process.exit();
});
