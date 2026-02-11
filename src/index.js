const Engine = require("./core/engine")

function intent(name) {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("WhymathError: Intent name must be a non-empty string")
  }

  return Engine.create(name.trim())
}

intent.process = function (input) {
  if (typeof input === "string") {
    const parts = input.trim().split(/\s+/)
    if (parts.length < 2) {
      throw new Error("WhymathError: Invalid expression")
    }

    const intentName = parts[0]
    const engine = Engine.create(intentName)

    let i = 1
    while (i < parts.length) {
      const token = parts[i]

      if (token === "from") {
        engine.from(Number(parts[i + 1]))
        i += 2
        continue
      }

      if (token === "by") {
        engine.by(Number(parts[i + 1]))
        i += 2
        continue
      }

      if (token === "target") {
        engine.target(Number(parts[i + 1]))
        i += 2
        continue
      }

      if (token.endsWith("%")) {
        engine.by(Number(token.replace("%", ""))).percent()
        i += 1
        continue
      }

      if (token === "percent") {
        engine.percent()
        i += 1
        continue
      }

      if (token === "flat") {
        engine.flat()
        i += 1
        continue
      }

      throw new Error("WhymathError: Unknown token " + token)
    }

    return engine.apply()
  }

  throw new Error("WhymathError: Unsupported input type")
}

module.exports = intent