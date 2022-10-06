const { color } = require('./color')

class Material {
  constructor (color, ambient, diffuse, specular, shininess) {
    this.color = color
    this.ambient = ambient
    this.diffuse = diffuse
    this.specular = specular
    this.shininess = shininess
  }

  lighting (light, point, eyev, normalv) {
    // combine the surface color with the light's color/intensity
    const effective_color = this.color.mul(light.intensity)

    // find the direction to the light source
    const lightv = light.position.sub(point).norm

    // compute the ambient contribution
    const ambient = effective_color.mul(this.ambient)

    let diffuse, specular

    // cos of angle between light vector and normal vector
    // negative number means light of on the other side of the surface
    const light_dot_normal = lightv.dot(normalv)
    if (light_dot_normal < 0) {
      diffuse = color(0, 0, 0)
      specular = color(0, 0, 0)
    } else {
      diffuse = effective_color.mul(this.diffuse).mul(light_dot_normal)

      // cos of angle between reflection vector and eye
      // negative number means light reflects away from eye
      const reflectv = lightv.neg().reflect(normalv)
      const reflect_dot_eye = reflectv.dot(eyev)

      if (reflect_dot_eye <= 0) specular = color(0, 0, 0)
      else {
        const factor = reflect_dot_eye ** this.shininess
        specular = light.intensity.mul(this.specular).mul(factor)
      }
    }

    return ambient.add(diffuse).add(specular)
  }
}

function material (_color = color(1, 1, 1), ambient = 0.1, diffuse = 0.9, specular = 0.9, shininess = 200.0) {
  return new Material(_color, ambient, diffuse, specular, shininess)
}

module.exports = { material }
