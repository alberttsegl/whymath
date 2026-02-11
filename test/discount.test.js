const intent = require("../src")

describe("discount intent", () => {
  test("percent discount", () => {
    const result = intent("discount")
      .from(200)
      .by(10)
      .percent()
      .apply()

    expect(result).toBe(180)
  })

  test("flat discount", () => {
    const result = intent("discount")
      .from(200)
      .by(50)
      .flat()
      .apply()

    expect(result).toBe(150)
  })

  test("reject negative discount", () => {
    expect(() =>
      intent("discount")
        .from(200)
        .by(-10)
        .percent()
        .apply()
    ).toThrow()
  })

  test("reject invalid base", () => {
    expect(() =>
      intent("discount")
        .from("seratus")
        .by(10)
        .percent()
        .apply()
    ).toThrow()
  })
})