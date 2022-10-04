function Tuple(x, y, z, w) {
	this.x = x
	this.y = y
	this.z = z
	this.w = w
}

Tuple.prototype.add = function(other) {
	return new Tuple(
		this.x + other.x,
		this.y + other.y,
		this.z + other.z,
		this.w + other.w,
	)
}

Tuple.prototype.sub = function(other) {
	return new Tuple(
		this.x - other.x,
		this.y - other.y,
		this.z - other.z,
		this.w - other.w,
	)
}

Tuple.prototype.neg = function() {
	return new Tuple(
		-this.x,
		-this.y,
		-this.z,
		-this.w
	)
}

function Vector(x, y, z) {
	return new Tuple(x, y, z, 0)
}

function Point(x, y, z) {
	return new Tuple(x, y, z, 1)
}


module.exports = {Tuple, Point, Vector}