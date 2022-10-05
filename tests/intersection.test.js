const { intersection, intersections } = require('../src/intersection')
const { sphere } = require('../src/sphere')

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