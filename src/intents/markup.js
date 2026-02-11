function markup(ctx) {
  if (ctx.intent !== "markup") {
    throw new Error("Invalid intent context")
  }

  const base = ctx.base
  const value = ctx.value
  const mode = ctx.mode

  if (typeof base !== "number" || !Number.isFinite(base)) {
    throw new Error("Invalid base value")
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Invalid markup value")
  }

  if (mode === "percent") {
    const result = base + (base * value / 100)
    return Number.isFinite(result) ? result : NaN
  }

  if (mode === "flat") {
    const result = base + value
    return Number.isFinite(result) ? result : NaN
  }

  throw new Error("Unsupported markup mode")
}

module.exports = markup