const { round } = require("../utils/number")

module.exports = {
  apply(ctx) {
    const cost = ctx.base
    const price = ctx.target
    const margin = ((price - cost) / price) * 100
    return round(margin, 2)
  }
}