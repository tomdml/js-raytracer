class PointLight {
  constructor (position, intensity) {
    this.position = position
    this.intensity = intensity
  }
}

function pointLight (position, intensity) {
  return new PointLight(position, intensity)
}

module.exports = { pointLight }
