# :koala: koa-starter-api
A starter kit for a slightly opinionated [Koa](https://koajs.com/) API project.

## Opinions
I built this project as a companion to my [koa-starter-api](https://github.com/snollygolly/koa-starter-api).  It's a pared down version with a few API specific features.  It also includes some basic helper interfaces for MongoDB and CouchDB.

* [Koa v2](https://koajs.com/)
* [Koa-JWT](https://github.com/koajs/jwt)
* [MongoDB](https://www.mongodb.com/)
* [CouchDB](http://couchdb.apache.org/)

I'm also including goodies from:

* [Nodemon](https://github.com/remy/nodemon)
* [ESLint](https://eslint.org/)
* [Auth0](https://auth0.com/)

## Prerequisites
* [Node.js](https://nodejs.org/en/) (Version 10 and up recommended, async/await support required)
* [Auth0 Account](https://auth0.com/) (for JWT)

### Installation

* Clone down the repository.
```
git clone https://github.com/snollygolly/koa-starter-api.git
```

* Install packages (from inside the koa-starter-api folder).
```
npm install
```

* Create your config.  There's a `config.example.json` file in the root.  Edit it to include all your values for the site and your OAuth information.  Save it as `config.json` and leave it in the root.

* If you want to use Google Analytics, set `config.site.analytics` to your Tracking ID and make sure the analytics partial (analytics.hbs) contains the correct Universal Analytics tracking code.  If you don't want to use Google Analytics, remove that property or set it to false.

* Start it up.
```
npm start
```

* Enjoy!

## Extra Information

While koa-starter-api isn't a framework, I've added a few small extras to make getting your project up and started as easy as possible.


#### Response Format

Every response from the API includes an `error` property that is set to false if the request was successful and true is the request threw an error.  The data you set in `ctx.body` will be available in the `result` property.

If the request throws an error, it will be set in the response as `message`.  You might want to disable this in production (you can do that in `index.js`).
