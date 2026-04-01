/// <reference types="cypress" />

describe("Teste de criação de novo agendamento para paciente", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "dr.smith@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/therapist")

    cy.contains("Agendamentos").click()
    cy.url().should("include", "/therapist/appointments")
    cy.contains("Novo Agendamento").click()
  })

  it("Deve exibir o formulário de criação de novo agendamento", () => {
    cy.contains("Agendar Nova Sessão").should("be.visible")
    cy.contains("Paciente").should("be.visible")
    cy.contains("Data").should("be.visible")
    cy.contains("Hora").should("be.visible")
    cy.contains("Formato").should("be.visible")
    cy.contains("Local/Link").should("be.visible")
    cy.contains("Duração (minutos)").should("be.visible")
  })

  it("Deve criar um novo agendamento com dados válidos", () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    const dateString = futureDate.toISOString().split("T")[0]
    const timeString = "14:00"
    const format = "Online"
    const location = "https://meet.jit.si/test-session"
    const duration = 60

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('input[name="date"]').type(dateString)
    cy.get('input[name="time"]').type(timeString)
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').contains(format).click()
    cy.get('input[name="location"]').type(location)
    cy.get('input[name="duration"]').type(duration.toString())
    cy.get('button[type="submit"]').click()

    cy.contains("Sessão agendada com sucesso!").should("be.visible")
    cy.contains(futureDate.toLocaleDateString("pt-BR")).should("be.visible")
    cy.contains(timeString).should("be.visible")
    cy.contains(format).should("be.visible")
    cy.contains(location).should("be.visible")
  })

  it("Deve exibir mensagens de erro para dados inválidos", () => {
    cy.get('input[name="date"]').type("2020-01-01")
    cy.get('button[type="submit"]').click()
    cy.contains("A data não pode ser anterior à data atual.").should(
      "be.visible"
    )
  })

  it("Deve exibir mensagem de erro para paciente não selecionado", () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    const dateString = futureDate.toISOString().split("T")[0]
    const timeString = "14:00"
    const format = "Online"
    const location = "https://meet.jit.si/test-session"
    const duration = 60

    cy.get('input[name="date"]').type(dateString)
    cy.get('input[name="time"]').type(timeString)
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').contains(format).click()
    cy.get('input[name="location"]').type(location)
    cy.get('input[name="duration"]').type(duration.toString())
    cy.get('button[type="submit"]').click()
    cy.contains("Paciente é obrigatório").should("be.visible")
  })

  it("Deve exibir mensagem positiva ao exluir um agendamento futuro", () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    const dateString = futureDate.toISOString().split("T")[0]
    const timeString = "14:00"
    const format = "Online"
    const location = "https://meet.jit.si/test-session"
    const duration = 60

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('input[name="date"]').type(dateString)
    cy.get('input[name="time"]').type(timeString)
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').contains(format).click()
    cy.get('input[name="location"]').type(location)
    cy.get('input[name="duration"]').type(duration.toString())
    cy.get('button[type="submit"]').click()
    cy.contains("Sessão agendada com sucesso!").should("be.visible")

    cy.contains("Cancelar Sessão").click()
    cy.contains("Sessão cancelada com sucesso!").should("be.visible")
  })
})
