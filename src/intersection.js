function intersection(t, object) {
	return {t, object}
}

function intersections(...args) {
	return [...args]
}

module.exports = { intersection, intersections }