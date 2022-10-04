function tuple(x, y, z, w) {
	return {x, y, z, w}
}

function vector(x, y, z) {
	return tuple(x, y, z, 0)
}

function point(x, y, z) {
	return tuple(x, y, z, 1)
}


module.exports = {tuple, point, vector}