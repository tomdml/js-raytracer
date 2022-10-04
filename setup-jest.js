function toBeShallowCloseTo(actual, target) {

	const epsilon = 0.0000001;

	function floatEqual(a, b, epsilon) {
		return Math.abs(a-b) < epsilon
	}

	const pass = Object.keys(actual).map(
		key => floatEqual(actual[key], target[key], epsilon)
	).every(item => item === true)

	  if (pass) {
	    return {
	      message: () =>
	        `expected ${this.utils.printReceived(
	          actual,
	        )} not be shallow close to ${this.utils.printExpected(
	          `${target}`,
	        )}`,
	      pass: true,
	    };
	  } else {
	    return {
	      message: () =>
	        `expected ${this.utils.printReceived(
	          actual,
	        )} to be shallow close to ${this.utils.printExpected(
	          `${target}`,
	        )}`,
	      pass: false,
	    };
	  }
}

expect.extend({toBeShallowCloseTo})