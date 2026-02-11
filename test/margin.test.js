const intent = require("../src")

describe("margin intent", () => {
  test("valid margin calculation", () => {
    const result = intent("margin")
      .from(600)
      .target(20)
      .percent()
      .apply()

    expect(result).toBe(480)
  })

  test("reject margin over 100%", () => {
    expect(() =>
      intent("margin")
        .from(600)
        .target(150)
        .percent()
        .apply()
    ).toThrow()
  })

  test("reject flat mode", () => {
    expect(() =>
      intent("margin")
        .from(600)
        .target(20)
        .flat()
        .apply()
    ).toThrow()
  })

  test("reject missing target", () => {
    expect(() =>
      intent("margin")
        .from(600)
        .percent()
        .apply()
    ).toThrow()
  })
})