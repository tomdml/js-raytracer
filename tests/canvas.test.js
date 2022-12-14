const { Canvas } = require('../rt/canvas')
const { color } = require('../rt/color')

test('creating a canvas', () => {
  const c = new Canvas(10, 20)
  expect(c.width).toBe(10)
  expect(c.height).toBe(20)
})

test('writing pixels to a canvas', () => {
  const c = new Canvas(10, 20)
  const red = color(1, 0, 0)
  c.write_pixel(2, 3, red)
  expect(c.pixel_at(2, 3)).toBe(red)
})

test('constructing the PPM header', () => {
  const c = new Canvas(5, 3)
  const ppmHeader = c._ppm_header
  expect(ppmHeader).toMatch(/^P3\n5 3\n255?/)
})

test('constructing the PPM pixel data', () => {
  const c = new Canvas(5, 3)
  const c1 = color(1.5, 0, 0)
  const c2 = color(0, 0.5, 0)
  const c3 = color(-0.5, 0, 1)

  c.write_pixel(0, 0, c1)
  c.write_pixel(2, 1, c2)
  c.write_pixel(4, 2, c3)
  const ppmBody = c._ppm_body()

  expect(ppmBody).toMatch(`255 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 128 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 255`)
})

test('PPM files are terminated by a newline character', () => {
  const c = new Canvas(5, 3)
  const ppm = c.to_ppm()
  expect(ppm).toMatch(/^.*\n/)
})
