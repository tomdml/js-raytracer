// implement custom jest extensions to allow for nearly-equal shallow and deep float comparison.

function toBeShallowCloseTo (actual, target) {
  const epsilon = 0.00001

  function floatEqual (a, b, epsilon) {
    return Math.abs(a - b) < epsilon
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

function closeToMatrix (actual, target) {
  const epsilon = 0.00001

  function floatEqual (a, b, epsilon) {
    return Math.abs(a - b) < epsilon
  }

  const pass = actual.data.map((row, rowIdx) =>
    row.map((cell, colIdx) =>
      floatEqual(cell, target.get(rowIdx, colIdx), epsilon)
    )
  ).every(row => row.every(item => item))

  return {
    message: () =>
          `expected ${this.utils.printReceived(actual)} to be matrix close to ${this.utils.printExpected(target)}`,
    pass
  }
}

expect.extend({ toBeShallowCloseTo, closeToMatrix })
