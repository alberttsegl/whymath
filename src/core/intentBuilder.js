const INTERNAL = Symbol("builder")

class IntentBuilder {
  constructor(context, engine) {
    if (!context || !engine) {
      throw new Error("Builder requires context and engine")
    }

    this[INTERNAL] = {
      context,
      engine,
      calls: Object.create(null),
      applied: false
    }
  }

  guard(method) {
    if (this[INTERNAL].applied) {
      throw new Error("Builder already applied")
    }

    if (this[INTERNAL].calls[method]) {
      throw new Error(`Method ${method} already used`)
    }

    this[INTERNAL].calls[method] = true
  }

  from(value) {
    this.guard("from")
    this[INTERNAL].context.setBase(value)
    return this
  }

  by(value) {
    this.guard("by")
    this[INTERNAL].context.setValue(value)
    return this
  }

  target(value) {
    this.guard("target")
    this[INTERNAL].context.setTarget(value)
    return this
  }

  percent() {
    this.guard("percent")
    this[INTERNAL].context.setMode("percent")
    return this
  }

  flat() {
    this.guard("flat")
    this[INTERNAL].context.setMode("flat")
    return this
  }

  currency(code) {
    this.guard("currency")
    this[INTERNAL].context.setCurrency(code)
    return this
  }

  rounding(mode) {
    this.guard("rounding")
    this[INTERNAL].context.setRoundingMode(mode)
    return this
  }

  meta(key, value) {
    this[INTERNAL].context.setMeta(key, value)
    return this
  }

  apply() {
    if (this[INTERNAL].applied) {
      throw new Error("Apply already called")
    }

    this[INTERNAL].applied = true
    this[INTERNAL].context.seal()
    return this[INTERNAL].engine.execute(this[INTERNAL].context)
  }
}

module.exports = IntentBuilder