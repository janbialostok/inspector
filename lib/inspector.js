'use strict';
var Bluebird = require('bluebird');

var Inspector = function (Model) {
	this.Model = Model;
	this.query = {};
	this.results = undefined;
	this.expect = undefined;
	this._find = undefined;
	this.errors = [];
};

var runQuery = function (options) {
	return new Bluebird(function (resolve, reject) {
		options.Model[options.find](options.query, function (err, data) {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

Inspector.prototype.$eq = function (field, val, force) {
	this.query[field] = val;
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$ne = function (field, val, force) {
	if (typeof this.query[field] === 'object' || !this.query[field]) {
		if (this.query[field].$ne && !force) {
			var existsError = new Error('$ne property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$ne = val;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$ne: val
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a not equal property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$gt = function (field, val, force) {
	if (typeof this.query[field] === 'object') {
		if (this.query[field].$ne && !force) {
			var existsError = new Error('$gt property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$gt = val;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$gt: val
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a $gt property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$lt = function (field, val, force) {
	if (typeof this.query[field] === 'object') {
		if (this.query[field].$lt && !force) {
			var existsError = new Error('$lt property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$lt = val;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$lt: val
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a $lt property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$gte = function (field, val, force) {
	if (typeof this.query[field] === 'object') {
		if (this.query[field].$gte && !force) {
			var existsError = new Error('$lt property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$gte = val;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$gte: val
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a $gte property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$lte = function (field, val, force) {
	if (typeof this.query[field] === 'object') {
		if (this.query[field].$lte && !force) {
			var existsError = new Error('$lt property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$lte = val;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$lte: val
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a $lte property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$in = function (field, val, force) {
	if (!Array.isArray(val)) {
		var typeError = new Error('$in lookup value must be of type array');
		this.errors.push(typeError);
	}
	else {
		if (this.query[field].$in && !force) {
			this.query[field].$in = this.query[field].$in.concat(val);
		}
		else if (this.query[field].$in && force) {
			this.query[field].$in = val;
		}
		else if (!this.query[field].$in) {
			this.query[field].$in = val;
		}
		else if (!this.query[field]) {
			this.query[field] = {
				$in: val
			};
		}
		else {
			var error = new Error('Query is not properly formatted to add a $in property');
			this.errors.push(error);
		}
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$nin = function (field, val, force) {
	if (!Array.isArray(val)) {
		var typeError = new Error('$in lookup value must be of type array');
		this.errors.push(typeError);
	}
	else {
		if (this.query[field].$nin && !force) {
			this.query[field].$nin = this.query[field].$nin.concat(val);
		}
		else if (this.query[field].$nin && force) {
			this.query[field].$nin = val;
		}
		else if (!this.query[field].$nin) {
			this.query[field].$nin = val;
		}
		else if (!this.query[field]) {
			this.query[field] = {
				$nin: val
			};
		}
		else {
			var error = new Error('Query is not properly formatted to add a $nin property');
			this.errors.push(error);
		}
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$exists = function (field, val, force) {
	if (typeof this.query[field] === 'object') {
		if (this.query[field].$exists && !force) {
			var existsError = new Error('$exists property already exists, please use force flag if you would like to overwrite');
			this.errors.push(existsError);
			console.log('this.query', this.query);
			return this;
		}
		this.query[field].$lte = (val) ? true : false;
	}
	else if (!this.query[field]) {
		this.query[field] = {
			$exists: (val) ? true : false
		};
	}
	else {
		var error = new Error('Query is not properly formatted to add a $exists property');
		this.errors.push(error);
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$or = function (field) {
	if (!field) {
		this.query.$or = [this.query];
	}
	else if (field && this.query[field]) {
		this.query[field] = this.query[field] || {};
		this.query[field] = {
			$or: [
				this.query[field]
			]
		};
	}
	else {
		this.query.$or = [];
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.$and = function (field) {
	if (!field) {
		this.query.$and = [this.query];
	}
	else if (field && this.query[field]) {
		this.query[field] = this.query[field] || {};
		this.query[field] = {
			$and: [
				this.query[field]
			]
		};
	}
	else {
		this.query.$and = [];
	}
	console.log('this.query', this.query);
	return this;
};

Inspector.prototype.find = function (type) {
	if (!type || type.toLowerCase() === 'find') {
		this._find = 'find';
		return this;
	}
	type = type.replace(/find/gi, '').toLowerCase();
	if (type === 'one') {
		this._find = 'findOne';
	}
	else if (type === 'byid') {
		this._find = 'findById';
	}
	else {
		var error = new Error('Invalid FIND type');
		this.errors.push(error);
	}
	return this;
};

Inspector.prototype.execute = function (cb) {
	if (this.Model && this.query && this._find && this.errors.length === 0) {
		var options = {
			Model: this.Model,
			query: this.query,
			find: this._find
		};
		runQuery(options)
			.then(function (data) {
				this.results = data;
				if (typeof cb === 'function') {
					this.results = data;
					cb(null, this);
				}
				else {
					this.results = data;
					return this;
				}
			})
			.catch(function (err) {
				this.errors.push([err, err.stack]);
				if (typeof cb === 'function') {
					cb(this.errors);
				}
				else {
					return this;
				}
			});
	}
	else if (this.errors.length > 0) {
		var execError = new Error('Execution failed errors present');
		this.errors.push(execError);
		if (typeof cb === 'function') {
			cb(this.errors);
		}
		else {
			return this;
		}
	}
	else {
		var error = new Error('Missing fields for execution');
		this.errors.push(error);
		return this;
	}
};

Inspector.prototype.executeAsync = function () {
	return new Bluebird(function (resolve, reject) {
		Inspector.prototype.execute(function (err, data) {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

module.exports = Inspector;