const { point } = require('../src/tuple')

class Sphere {

	constructor() {	}

	intersect(ray) {

		// vector from sphere origin to ray origin
		const sphere_to_ray = ray.origin.sub(point(0, 0, 0))

		const a = ray.direction.dot(ray.direction)
		const b = 2 * ray.direction.dot(sphere_to_ray)
		const c = sphere_to_ray.dot(sphere_to_ray) - 1

		const discriminant = b**2 - 4*a*c

		if (discriminant < 0) return []

		const t1 = (-b - discriminant**0.5) / (2*a)
		const t2 = (-b + discriminant**0.5) / (2*a)

		return [t1, t2]
	}

}

function sphere() {
	return new Sphere()
}

module.exports = { sphere }