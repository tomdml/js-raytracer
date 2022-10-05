class Intersections {

	constructor(...args) {
		this.xs = args
		this.xs.sort((a, b) => a.t - b.t )
	}

	get hit() {
		return this.xs.find(elem => elem.t > 0)
	}

	get length() {
		return this.xs.length
	}

	at(loc) {
		return this.xs.at(loc)
	}
}

function intersection(t, object) {
	return {t, object}
}

function intersections(...args) {
	return new Intersections(...args)
}

module.exports = { intersection, intersections }