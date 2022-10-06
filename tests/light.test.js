const { point_light } = require('../src/light')
const { color } = require('../src/color')
const { point } = require('../src/tuple')

test('a point light has a position and intensity', () => {
  const intensity = color(1, 1, 1)
  const position = point(0, 0, 0)
  const light = point_light(position, intensity)

  expect(light.position).toBe(position)
  expect(light.intensity).toBe(intensity)
})
