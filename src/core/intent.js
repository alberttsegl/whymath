const IntentBuilder = require("./intentBuilder")
const engine = require("./engine")
const Context = require("./context")

function normalizeIntent(input) {
  if (typeof input === "string") {
    return input.trim().toLowerCase()
  }

  if (typeof input === "object" && input !== null) {
    if (typeof input.name === "string") {
      return input.name.trim().toLowerCase()
    }
  }

  throw new TypeError("Invalid intent identifier")
}

function intent(identifier) {
  const name = normalizeIntent(identifier)

  if (!engine.has(name)) {
    throw new Error(`Unknown intent: ${name}`)
  }

  const context = new Context(name)
  return new IntentBuilder(context, engine)
}

intent.define = function (map) {
  if (typeof map !== "object" || map === null) {
    throw new TypeError("Intent definition must be object")
  }

  Object.keys(map).forEach(key => {
    engine.register(key.toLowerCase(), map[key])
  })
}

module.exports = intent