// https://github.com/jondubois/proper-skip-list/blob/master/index.js

var assert = require('assert');

function makeNode(level, key, value)
{
	var node = new Array(4 + level);
	node[0] = key;
	node[1] = value;
	return node;
}

function nodesEqual(left, right)
{
	if ((left === undefined) && right) return false;
	if ((right === undefined) && left) return false;
	if (left[0] !== right[0]) return false;
	if (left[1] !== right[1]) return false;
	if (left[2] !== right[2]) return false;
	if (left[3] !== right[3]) return false;
	return true;
}

var P = 1 / Math.E;
var NIL = makeNode(-1);

function Skiplist(maxsize)
{
	this.maxsize = maxsize || 65535;
	this.maxlevel = Math.round(Math.log(this.maxsize, 2));

	this.level = 0;
	this.head = makeNode(this.maxlevel);
	this.tail = NIL;
	for (var i = 0; i < this.maxlevel; i++)
		this.head[i + 3] = NIL;
	this._update = new Array(this.maxlevel + 1);
	for (i = 0; i < this._update.length; i++)
		this._update[i] = this.head;
}

Skiplist.prototype._randomLevel = function()
{
	var lvl = 0;
	var max = Math.min(this.maxlevel, this.level + 1);
	while ((Math.random() < P) && (lvl < max))
		lvl++;
	return lvl;
};

Skiplist.prototype.find = function(search, reverse)
{
	var node = reverse ? this.tail : this.head[3];
	var idx = reverse ? 2 : 3;
	var results = [];

	if (search)
	{
		var update = this._update.slice(0);
		var found = this._findLess(update, search);
		if (!nodesEqual(found[3], NIL))
			node = found[3];
	}
	while (node[0])
	{
		results.push([node[0], node[1]]);
		node = node[idx];
	}
	return results;
};

Skiplist.prototype.findWithCount = function(search, maxResultsToReturn, reverse)
{
	var node = reverse ? this.tail : this.head[3];
	var idx = reverse ? 2 : 3;
	var results = [];

	if (search)
	{
		var update = this._update.slice(0);
		var found = this._findLess(update, search);
		if (!nodesEqual(found[3], NIL))
			node = found[3];
	}
	while (node[0] && (results.length < maxResultsToReturn))
	{
		results.push([node[0], node[1]]);
		node = node[idx];
	}
	return results;
};

Skiplist.prototype.length = function()
{
	// more for my curiosity
	var node = this.head[3];
	var count = 0;
	while (node[0])
	{
		count++;
		node = node[3];
	}
	return count;
};

Skiplist.prototype._findLess = function(update, search)
{
	var node = this.head;
	for (var i = this.level; i >= 0; i--)
	{
		var key = node[3 + i][0];
		while (key && (key < search))
		{
			node = node[3 + i];
			key = node[3 + i] ? node[3 + i][0] : null;
		}
		update[i] = node;
	}
	return node;
};

Skiplist.prototype.insert = function(key, value)
{
	assert(key);
	var update = this._update.slice(0);
	var node = this._findLess(update, key);
	var prev = node;
	node = node[3];
	if (node[0] === key)
		node[1] = value;
	else
	{
		var lvl = this._randomLevel();
		this.level = Math.max(this.level, lvl);
		node = makeNode(lvl, key, value);
		node[2] = prev;
		for (var i = 0; i <= this.level; i++)
		{
			node[3 + i] = update[i][3 + i];
			update[i][3 + i] = node;
		}
		if (nodesEqual(node[3], NIL))
			this.tail = node;
		else
			node[3][2] = node;
	}
};

Skiplist.prototype.remove = function(key)
{
	var update = this._update.slice(0);
	var node = this._findLess(update, key);
	node = node[3];

	if (node[0] === key)
	{
		node[3][2] = update[0];
		for (var i = 0; i <= this.level; i++)
		{
			if (!nodesEqual(update[i][3 + i], node))
				break;
			update[i][3 + i] = node[3 + i];
		}

		while ((this.level > 1) && (this.head[3 + this.level].key !== null))
			this.level--;

		if (nodesEqual(this.tail, node))
			this.tail = node[2];

		return true;
	}

	return false; // just to make it explicit
};

Skiplist.prototype.match = function(search)
{
	var node = this.head;
	for (var i = this.level; i >= 0; i--)
	{
		var key = node[3 + i][0];
		while (key && (key < search))
		{
			node = node[3 + i];
			key = node[3 + i] ? node[3 + i][0] : null;
		}
	}
	node = node[3];
	if (node[0] === search)
		return node[1];

	return null;
};

module.exports = Skiplist;
