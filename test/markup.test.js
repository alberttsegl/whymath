const intent = require("../src")

describe("markup intent", () => {
  test("percent markup", () => {
    const result = intent("markup")
      .from(500)
      .by(20)
      .percent()
      .apply()

    expect(result).toBe(600)
  })

  test("flat markup", () => {
    const result = intent("markup")
      .from(500)
      .by(100)
      .flat()
      .apply()

    expect(result).toBe(600)
  })

  test("reject negative markup", () => {
    expect(() =>
      intent("markup")
        .from(500)
        .by(-20)
        .percent()
        .apply()
    ).toThrow()
  })

  test("reject missing mode", () => {
    expect(() =>
      intent("markup")
        .from(500)
        .by(20)
        .apply()
    ).toThrow()
  })
})