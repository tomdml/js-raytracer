const { point } = require('./tuple')
const { intersection, intersections } = require('./intersection')
const { I } = require('./matrix')
const { material } = require('./materials')

class Sphere {
  constructor (_material) {
    this.transform = I
    this.material = _material
  }

  intersect (ray) {
    ray = ray.transform(this.transform.inverse)

    // vector from sphere origin to ray origin
    const sphereToRay = ray.origin.sub(point(0, 0, 0))

    const a = ray.direction.dot(ray.direction)
    const b = 2 * ray.direction.dot(sphereToRay)
    const c = sphereToRay.dot(sphereToRay) - 1

    const discriminant = b ** 2 - 4 * a * c

    if (discriminant < 0) return intersections()

    const t1 = (-b - discriminant ** 0.5) / (2 * a)
    const t2 = (-b + discriminant ** 0.5) / (2 * a)

    return intersections(
      intersection(t1, this),
      intersection(t2, this)
    )
  }

  normal_at (worldPoint) {
    const objectPoint = this.transform.inverse.mul(worldPoint)
    const objectNormal = objectPoint.sub(point(0, 0, 0))
    const worldNormal = this.transform.inverse.T.mul(objectNormal)
    worldNormal.w = 0 // hack to avoid w getting mangled - alternatively find the (3, 3) submatrix

    return worldNormal.norm
  }
}

function sphere ({ _material = material() } = {}) {
  return new Sphere(_material)
}

module.exports = { sphere }
