/// <reference types="cypress" />

describe("Teste de inserção de progresso terapêutico para paciente", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "teste@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/pacient")
    cy.contains("Meu Progresso").click()
    cy.url().should("include", "/pacient/progress")
    cy.contains("Registrar Progresso").click()
  })

  it("Deve exibir o formulário de registro de progresso terapêutico", () => {
    cy.contains("Registrar Progresso Diário").should("be.visible")
    cy.contains("Humor").should("be.visible")
    cy.contains("Ansiedade").should("be.visible")
    cy.contains("Qualidade do Sono").should("be.visible")
    cy.contains("Nível de Energia").should("be.visible")
    cy.contains("Observações").should("be.visible")
  })

  it("Deve registrar o progresso terapêutico com dados válidos", () => {
    const mood = 3
    const anxiety = 2
    const sleepQuality = 4
    const energyLevel = 3
    const notes = "Hoje me senti um pouco melhor do que ontem."

    cy.get('[role="slider"]')
      .first()
      .focus()
      .type("{rightarrow}{leftarrow}{rightarrow}")
    cy.get('[role="slider"]').eq(1).focus().type("{leftarrow}{leftarrow}")
    cy.get('[role="slider"]')
      .eq(2)
      .focus()
      .type("{rightarrow}{leftarrow}{leftarrow}{leftarrow}")
    cy.get('[role="slider"]')
      .eq(3)
      .focus()
      .type("{rightarrow}{leftarrow}{leftarrow}")

    cy.get('textarea[name="notes"]').type(notes)
    cy.get('button[type="submit"]').click()
    cy.contains("Mood diário registrado com sucesso!").should("be.visible")
  })
})
