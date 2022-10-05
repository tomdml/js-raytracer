class PointLight {

	constructor(position, intensity) {
		this.position = position
		this.intensity = intensity
	}
}

function point_light(position, intensity) {
	return new PointLight(position, intensity)
}

module.exports = { point_light }