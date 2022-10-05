class Ray {

	constructor(origin, direction) {
		this.origin = origin
		this.direction = direction
	}

	position(t) {
		return this.origin.add(this.direction.mul(t))
	}

}

function ray(origin, direction) {
	return new Ray(origin, direction)
}

module.exports = { ray }