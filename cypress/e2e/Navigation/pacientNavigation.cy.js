/// <reference types="cypress" />

describe("Teste de Navegação do Paciente", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "teste@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/pacient")
  })

  it("Deve exibir o dashboard do paciente", () => {
    cy.contains("Meu Espaço Terapêutico").should("be.visible")
    cy.contains("Próxima Sessão").should("be.visible")
    cy.contains("Dicas para Aproveitar ao Máximo sua Terapia").should(
      "be.visible"
    )
  })

  it("Deve navegar para a página de agendamento de sessão", () => {
    cy.contains("Agendamentos").click()
    cy.url().should("include", "/pacient/appointments")
    cy.contains("Próximas Sessões").should("be.visible")
  })

  it("Deve navegar para a página de progresso terapêutico", () => {
    cy.contains("Meu Progresso").click()
    cy.url().should("include", "/pacient/progress")
    cy.contains("Acompanhamento de Progresso").should("be.visible")
  })

  it("Deve navegar para a página de anotações de sessão", () => {
    cy.contains("Anotações").click()
    cy.url().should("include", "/pacient/notes")
    cy.contains("Anotações de Sessão").should("be.visible")
  })

  it("Deve navegar para a página de documentos", () => {
    cy.contains("Documentos").click()
    cy.url().should("include", "/pacient/documents")
    cy.contains("Documentos").should("be.visible")
  })
})
