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

Tuple.prototype.mul = function(scalar) {
	return new Tuple(
		this.x * scalar,
		this.y * scalar,
		this.z * scalar,
		this.w * scalar,
	)
}

Tuple.prototype.div = function(scalar) {
	return new Tuple(
		this.x / scalar,
		this.y / scalar,
		this.z / scalar,
		this.w / scalar,
	)
}

Tuple.prototype.abs = function() {
	return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5
}

function tuple(x, y, z, w) {
	return new Tuple(x, y, z, w)
}

function vector(x, y, z) {
	return tuple(x, y, z, 0)
}

function point(x, y, z) {
	return tuple(x, y, z, 1)
}


module.exports = {tuple, point, vector}