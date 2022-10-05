function toBeShallowCloseTo(actual, target) {

	const epsilon = 0.00001;

	function floatEqual(a, b, epsilon) {
		return Math.abs(a-b) < epsilon
	}

	const pass = Object.keys(actual).map(
		key => floatEqual(actual[key], target[key], epsilon)
	).every(item => item === true)

	return {
	    message: () =>
	        `expected ${this.utils.printReceived(actual)} to be matrix close to ${this.utils.printExpected(target)}`,
	    pass
	}
}

function closeToMatrix(actual, target) {

	const epsilon = 0.00001;

	function floatEqual(a, b, epsilon) {
		return Math.abs(a-b) < epsilon
	}

	let pass = actual.data.map((row, row_idx) => 
		row.map((cell, col_idx) => 
			floatEqual(cell, target.get(row_idx, col_idx), epsilon)
	    )
	).every(row => row.every(item => item))

	return {
	    message: () =>
	        `expected ${this.utils.printReceived(actual)} to be matrix close to ${this.utils.printExpected(target)}`,
	    pass
	}
}

expect.extend({toBeShallowCloseTo, closeToMatrix})