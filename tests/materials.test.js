const { material } = require('../src/materials')
const { color } = require('../src/color')
const { point, vector } = require('../src/tuple')
const { point_light } = require('../src/light')

test('the default material', () => {
	const m = material()

	expect(m.color).toStrictEqual(color(1, 1, 1))
	expect(m.ambient).toBe(0.1)
	expect(m.diffuse).toBe(0.9)
	expect(m.specular).toBe(0.9)
	expect(m.shininess).toBe(200.0)
})

test('lighting with the eye between the light and the surface', () => {
	const m = material()
	const position = point(0, 0, 0)

	const eyev = vector(0, 0, -1)
	const normalv = vector(0, 0, -1)
	const light = point_light(point(0, 0, -10), color(1, 1, 1))

	const result = m.lighting(light, position, eyev, normalv)

	expect(result).toStrictEqual(color(1.9, 1.9, 1.9))
})

test('lighting weith the eye between the light and the surface, eye offset 45deg', () => {
	const m = material()
	const position = point(0, 0, 0)

	const eyev = vector(0, (2 ** 0.5)/2, -(2 ** 0.5)/2)
	const normalv = vector(0, 0, -1)
	const light = point_light(point(0, 0, -10), color(1, 1, 1))

	const result = m.lighting(light, position, eyev, normalv)

	expect(result).toStrictEqual(color(1.0, 1.0, 1.0))
})

test('lighting with eye opposite surface, light offset 45deg', () => {
	const m = material()
	const position = point(0, 0, 0)

	const eyev = vector(0, 0, -1)
	const normalv = vector(0, 0, -1)
	const light = point_light(point(0, 10, -10), color(1, 1, 1))

	const result = m.lighting(light, position, eyev, normalv)

	expect(result).toBeShallowCloseTo(color(0.7364, 0.7364, 0.7364))
})

test('lighting with eye in the path of the reflection vector', () => {
	const m = material()
	const position = point(0, 0, 0)

	const eyev = vector(0, -(2 ** 0.5)/2, -(2 ** 0.5)/2)
	const normalv = vector(0, 0, -1)
	const light = point_light(point(0, 10, -10), color(1, 1, 1))

	const result = m.lighting(light, position, eyev, normalv)

	expect(result).toBeShallowCloseTo(color(1.6364, 1.6364, 1.6364))
})

test('lighting with the light behind the surface', () => {
	const m = material()
	const position = point(0, 0, 0)

	const eyev = vector(0, 0, -1)
	const normalv = vector(0, 0, -1)
	const light = point_light(point(0, 0, 10), color(1, 1, 1))

	const result = m.lighting(light, position, eyev, normalv)

	expect(result).toStrictEqual(color(0.1, 0.1, 0.1))
})