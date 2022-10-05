class Ray {

	constructor(origin, direction) {
		this.origin = origin
		this.direction = direction
	}
}



function ray(origin, direction) {
	return new Ray(origin, direction)
}

module.exports = { ray }