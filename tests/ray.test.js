const { ray } = require('../rt/ray')
const { point, vector } = require('../rt/tuple')
const { I } = require('../rt/matrix')

test('creating and querying a ray', () => {
  const origin = point(1, 2, 3)
  const direction = vector(4, 5, 6)

  const r = ray(origin, direction)

  expect(r.origin).toBe(origin)
  expect(r.direction).toBe(direction)
})

test('computing a point from a distance', () => {
  const r = ray(point(2, 3, 4), vector(1, 0, 0))

  expect(r.position(0)).toStrictEqual(point(2, 3, 4))
  expect(r.position(1)).toStrictEqual(point(3, 3, 4))
  expect(r.position(-1)).toStrictEqual(point(1, 3, 4))
  expect(r.position(2.5)).toStrictEqual(point(4.5, 3, 4))
})

test('translating a ray', () => {
  const r = ray(point(1, 2, 3), vector(0, 1, 0))
  const m = I.translation(3, 4, 5)

  const r2 = r.transform(m)

  expect(r2.origin).toStrictEqual(point(4, 6, 8))
  expect(r2.direction).toStrictEqual(vector(0, 1, 0))
})

test('scaling a ray', () => {
  const r = ray(point(1, 2, 3), vector(0, 1, 0))
  const m = I.scaling(2, 3, 4)

  const r2 = r.transform(m)

  expect(r2.origin).toStrictEqual(point(2, 6, 12))
  expect(r2.direction).toStrictEqual(vector(0, 3, 0))
})
