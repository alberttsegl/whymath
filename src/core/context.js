const INTERNAL = Symbol("internal")
const IMMUTABLE = Object.freeze

class Context {
  constructor(intent) {
    if (typeof intent !== "string" || intent.length === 0) {
      throw new TypeError("Invalid intent")
    }

    this[INTERNAL] = {
      intent,
      base: undefined,
      value: undefined,
      target: undefined,
      mode: undefined,
      currency: undefined,
      roundingMode: undefined,
      meta: Object.create(null),
      sealed: false
    }
  }

  assertMutable() {
    if (this[INTERNAL].sealed) {
      throw new Error("Context already sealed")
    }
  }

  setIntent(v) {
    this.assertMutable()
    if (typeof v !== "string") {
      throw new TypeError("Intent must be string")
    }
    this[INTERNAL].intent = v
    return this
  }

  setBase(v) {
    this.assertMutable()
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new TypeError("Base must be finite number")
    }
    this[INTERNAL].base = v
    return this
  }

  setValue(v) {
    this.assertMutable()
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new TypeError("Value must be finite number")
    }
    this[INTERNAL].value = v
    return this
  }

  setTarget(v) {
    this.assertMutable()
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new TypeError("Target must be finite number")
    }
    this[INTERNAL].target = v
    return this
  }

  setMode(v) {
    this.assertMutable()
    if (typeof v !== "string") {
      throw new TypeError("Mode must be string")
    }
    this[INTERNAL].mode = v
    return this
  }

  setCurrency(v) {
    this.assertMutable()
    if (typeof v !== "string") {
      throw new TypeError("Currency must be string")
    }
    this[INTERNAL].currency = v
    return this
  }

  setRoundingMode(v) {
    this.assertMutable()
    if (typeof v !== "string") {
      throw new TypeError("Rounding mode must be string")
    }
    this[INTERNAL].roundingMode = v
    return this
  }

  setMeta(key, value) {
    this.assertMutable()
    if (typeof key !== "string") {
      throw new TypeError("Meta key must be string")
    }
    this[INTERNAL].meta[key] = value
    return this
  }

  seal() {
    this[INTERNAL].sealed = true
    return this
  }

  snapshot() {
    return IMMUTABLE({
      intent: this[INTERNAL].intent,
      base: this[INTERNAL].base,
      value: this[INTERNAL].value,
      target: this[INTERNAL].target,
      mode: this[INTERNAL].mode,
      currency: this[INTERNAL].currency,
      roundingMode: this[INTERNAL].roundingMode,
      meta: IMMUTABLE({ ...this[INTERNAL].meta })
    })
  }
}

module.exports = Context