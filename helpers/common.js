module.exports = {
	getPerc: (elapsed, duration) => {
		return Math.round((elapsed / duration) * 100);
	},
	getSeconds: () => {
		return Math.round(new Date().valueOf() / 1000);
	}
};
