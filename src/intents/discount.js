const { round } = require("../utils/number")

module.exports = {
  apply(ctx) {
    const result = ctx.base - ctx.base * (ctx.value / 100)
    return round(result, 2)
  }
}