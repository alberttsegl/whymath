const validateCommon = require("../validators/common")
const validatePercentage = require("../validators/percentage")
const intents = {
  discount: require("../intents/discount"),
  margin: require("../intents/margin"),
  interest: require("../intents/interest")
}

class Engine {
  static create(intentName) {
    if (!intents[intentName]) {
      throw new Error("WhymathError: Unknown intent")
    }

    const ctx = {
      intent: intentName,
      base: null,
      value: null,
      target: null,
      mode: null
    }

    const builder = {
      from(v) {
        ctx.base = v
        return builder
      },
      by(v) {
        ctx.value = v
        return builder
      },
      target(v) {
        ctx.target = v
        return builder
      },
      percent() {
        ctx.mode = "percent"
        return builder
      },
      flat() {
        ctx.mode = "flat"
        return builder
      },
      apply() {
        validateCommon(ctx)
        if (ctx.mode === "percent") {
          validatePercentage(ctx)
        }
        return intents[ctx.intent].apply(ctx)
      }
    }

    return builder
  }
}

module.exports = Engine