/// <reference types="cypress" />

describe("Teste de Navegação do Terapeuta", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "dr.smith@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/therapist")
  })

  it("Deve exiibir o dashboard do terapeuta", () => {
    cy.contains("Sessões totais").should("be.visible")
    cy.contains("Pacientes").should("be.visible")
    cy.contains("Próxima Sessão").should("be.visible")
  })

  it("Deve navegar para a lista de agendamentos", () => {
    cy.contains("Agendamentos").click()
    cy.url().should("include", "/therapist/appointments")
    cy.contains("Próximas Sessões").should("be.visible")
  })

  it("Deve navegar para a página de progresso do paciente", () => {
    cy.contains("Progresso").click()
    cy.url().should("include", "/therapist/progress")
    cy.contains("Acompanhamento de Progresso").should("be.visible")
  })

  it("Deve navegar para a página de anotações de sessão", () => {
    cy.contains("Anotações").click()
    cy.url().should("include", "/therapist/notes")
    cy.contains("Anotações de Sessão").should("be.visible")
  })

  it("Deve navegar para a página de documentos do paciente", () => {
    cy.contains("Documentos").click()
    cy.url().should("include", "/therapist/documents")
    cy.contains("Documentos").should("be.visible")
  })
})
