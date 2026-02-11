const { assert, assertNumber } = require("../utils/assert")

module.exports = function validatePercentage(ctx) {
  assert(ctx.value !== null, "Percentage value is required")
  assertNumber(ctx.value, "Percentage")

  assert(ctx.value > 0 && ctx.value < 100, "Percentage must be between 0 and 100")

  if (ctx.intent === "margin") {
    assert(ctx.value < 100, "Margin percentage cannot reach 100")
  }

  if (ctx.intent === "interest") {
    assert(ctx.target === null, "Interest cannot have target")
  }

  if (ctx.intent === "discount") {
    assert(ctx.target === null, "Discount cannot have target")
  }
}