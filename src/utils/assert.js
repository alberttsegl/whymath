function error(message) {
  throw new Error("WhymathError: " + message)
}

function assert(condition, message) {
  if (!condition) error(message)
}

function assertNumber(value, name) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    error(name + " must be a number")
  }
}

function assertPositive(value, name) {
  if (value <= 0) {
    error(name + " must be positive")
  }
}

module.exports = {
  assert,
  assertNumber,
  assertPositive
}