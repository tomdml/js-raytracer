class Ray {
  constructor (origin, direction) {
    this.origin = origin
    this.direction = direction
  }

  position (t) {
    return this.origin.add(this.direction.mul(t))
  }

  transform (M) {
    return new Ray(
      M.mul(this.origin),
      M.mul(this.direction)
    )
  }
}

function ray (origin, direction) {
  return new Ray(origin, direction)
}

module.exports = { ray }
