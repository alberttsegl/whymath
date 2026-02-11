const { assert, assertNumber, assertPositive } = require("../utils/assert")

module.exports = function validateCommon(ctx) {
  assert(ctx.base !== null, "Base value is required")
  assertNumber(ctx.base, "Base value")
  assertPositive(ctx.base, "Base value")

  if (ctx.value !== null) {
    assertNumber(ctx.value, "Value")
  }

  if (ctx.target !== null) {
    assertNumber(ctx.target, "Target")
  }

  assert(ctx.mode, "Calculation mode is required")
}