const { color } = require('./color')

class Material {
  constructor (_color, ambient, diffuse, specular, shininess) {
    this.color = _color
    this.ambient = ambient
    this.diffuse = diffuse
    this.specular = specular
    this.shininess = shininess
  }

  lighting (light, point, eyev, normalv) {
    // combine the surface color with the light's color/intensity
    const effectiveColor = this.color.mul(light.intensity)

    // find the direction to the light source
    const lightv = light.position.sub(point).norm

    // compute the ambient contribution
    const ambient = effectiveColor.mul(this.ambient)

    let diffuse, specular

    // cos of angle between light vector and normal vector
    // negative number means light of on the other side of the surface
    const lightDotNormal = lightv.dot(normalv)
    if (lightDotNormal < 0) {
      diffuse = color(0, 0, 0)
      specular = color(0, 0, 0)
    } else {
      diffuse = effectiveColor.mul(this.diffuse).mul(lightDotNormal)

      // cos of angle between reflection vector and eye
      // negative number means light reflects away from eye
      const reflectv = lightv.neg().reflect(normalv)
      const reflectDotEye = reflectv.dot(eyev)

      if (reflectDotEye <= 0) specular = color(0, 0, 0)
      else {
        const factor = reflectDotEye ** this.shininess
        specular = light.intensity.mul(this.specular).mul(factor)
      }
    }

    return ambient.add(diffuse).add(specular)
  }
}

function material ({ _color = color(1, 1, 1), ambient = 0.1, diffuse = 0.9, specular = 0.9, shininess = 200.0 } = {}) {
  return new Material(_color, ambient, diffuse, specular, shininess)
}

module.exports = { material }
