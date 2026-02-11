function toNumber(value) {
  const n = Number(value)
  if (Number.isNaN(n)) {
    throw new Error("WhymathError: Invalid number")
  }
  return n
}

function round(value, precision = 2) {
  const factor = Math.pow(10, precision)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

module.exports = {
  toNumber,
  round,
  clamp
}