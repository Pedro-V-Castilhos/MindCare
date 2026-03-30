/// <reference types="cypress" />

describe("Canary Test", () => {
  it("Deve retornar True para True", () => {
    const result = true
    const isTrue = result === true

    expect(isTrue).to.equal(true)
  })
})
