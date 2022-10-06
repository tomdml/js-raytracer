const { intersection, intersections } = require('../rt/intersection')
const { sphere } = require('../rt/sphere')

test('an intersection encapsulates t and object', () => {
  const s = sphere()
  const i = intersection(3.5, s)

  expect(i.t).toBe(3.5)
  expect(i.object).toBe(s)
})

test('aggregating intersections', () => {
  const s = sphere()
  const i1 = intersection(1, s)
  const i2 = intersection(2, s)

  const xs = intersections(i1, i2)

  expect(xs.at(0).t).toBe(1)
  expect(xs.at(1).t).toBe(2)
})

test('the hit, when all intersections have positive t', () => {
  const s = sphere()
  const i1 = intersection(1, s)
  const i2 = intersection(2, s)

  const xs = intersections(i1, i2)

  expect(xs.hit).toBe(i1)
})

test('the hit, when some intersections have negative t', () => {
  const s = sphere()
  const i1 = intersection(-1, s)
  const i2 = intersection(1, s)

  const xs = intersections(i1, i2)

  expect(xs.hit).toBe(i2)
})

test('the hit, when all intersections have negative t', () => {
  const s = sphere()
  const i1 = intersection(-2, s)
  const i2 = intersection(-1, s)

  const xs = intersections(i1, i2)

  expect(xs.hit).toBe(undefined)
})

test('the hit is always the lowest nonnegative intersection', () => {
  const s = sphere()
  const i1 = intersection(5, s)
  const i2 = intersection(7, s)
  const i3 = intersection(-3, s)
  const i4 = intersection(2, s)

  const xs = intersections(i1, i2, i3, i4)

  expect(xs.hit).toBe(i4)
})
