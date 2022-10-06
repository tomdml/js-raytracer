const { pointLight } = require('../rt/light')
const { color } = require('../rt/color')
const { point } = require('../rt/tuple')

test('a point light has a position and intensity', () => {
  const intensity = color(1, 1, 1)
  const position = point(0, 0, 0)
  const light = pointLight(position, intensity)

  expect(light.position).toBe(position)
  expect(light.intensity).toBe(intensity)
})
