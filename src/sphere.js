const { point } = require('../src/tuple')
const { intersection, intersections } = require('../src/intersection')
const { I } = require('../src/matrix')
const { material } = require('../src/materials')

class Sphere {
  constructor () {
    this.transform = I
    this.material = material()
  }

  intersect (ray) {
    ray = ray.transform(this.transform.inverse)

    // vector from sphere origin to ray origin
    const sphere_to_ray = ray.origin.sub(point(0, 0, 0))

    const a = ray.direction.dot(ray.direction)
    const b = 2 * ray.direction.dot(sphere_to_ray)
    const c = sphere_to_ray.dot(sphere_to_ray) - 1

    const discriminant = b ** 2 - 4 * a * c

    if (discriminant < 0) return intersections()

    const t1 = (-b - discriminant ** 0.5) / (2 * a)
    const t2 = (-b + discriminant ** 0.5) / (2 * a)

    return intersections(
      intersection(t1, this),
      intersection(t2, this)
    )
  }

  normal_at (world_point) {
    const object_point = this.transform.inverse.mul(world_point)
    const object_normal = object_point.sub(point(0, 0, 0))
    const world_normal = this.transform.inverse.T.mul(object_normal)
    world_normal.w = 0 // hack to avoid w getting mangled - alternatively find the (3, 3) submatrix

    return world_normal.norm
  }
}

function sphere () {
  return new Sphere()
}

module.exports = { sphere }
