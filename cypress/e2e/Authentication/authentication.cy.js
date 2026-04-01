/// <reference types="cypress" />

describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
  })

  it("Deve exibir a tela de login", () => {
    cy.contains("Entrar").should("be.visible")
    cy.contains("Email").should("be.visible")
    cy.contains("Senha").should("be.visible")
  })

  it("Deve autenticar paciente para credenciais mockadas válidas", () => {
    const validEmail = "teste@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/pacient")
    cy.contains("Meu Espaço Terapêutico").should("be.visible")
  })

  it("Deve exibir mensagem de erro para credenciais inválidas", () => {
    const invalidEmail = "asdhsakdsh@ksahdk.com"
    const invalidPassword = "wrongpassword"

    cy.get('input[name="email"]').type(invalidEmail)
    cy.get('input[name="password"]').type(invalidPassword)
    cy.get('button[type="submit"]').click()

    cy.contains("Email ou senha inválidos").should("be.visible")
  })

  it("Deve redirecionar para a página de registro ao clicar em 'Registrar-se'", () => {
    cy.contains("Registrar-se").click()
    cy.url().should("include", "/register")
    cy.contains("Criar Conta").should("be.visible")
  })

  it("Deve cadastrar um novo paciente e redirecionar para a página de login", () => {
    const newFirstName = "Novo"
    const newLastName = "Paciente"
    const newEmail = "novo@teste.com"
    const newPassword = "1234"

    cy.contains("Registrar-se").click()
    cy.get('input[name="firstName"]').type(newFirstName)
    cy.get('input[name="lastName"]').type(newLastName)
    cy.get('input[name="email"]').type(newEmail)
    cy.get('input[name="password"]').type(newPassword)
    cy.get('input[name="confirmPassword"]').type(newPassword)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains("2").click()
    cy.get('button[type="submit"]').click()

    cy.contains("Entrar").should("be.visible")
  })

  it("Deve cadastrar um novo terapêuta e redirecionar para a página de login", () => {
    const newFirstName = "Novo"
    const newLastName = "Terapêuta"
    const newEmail = "novo.terapeuta@teste.com"
    const newPassword = "1234"
    const newSpeciality = "Psicologia"
    const newCRP = "12345"

    cy.contains("Registrar-se").click()
    cy.contains("Terapeuta").click()
    cy.get('input[name="firstName"]').type(newFirstName)
    cy.get('input[name="lastName"]').type(newLastName)
    cy.get('input[name="email"]').type(newEmail)
    cy.get('input[name="password"]').type(newPassword)
    cy.get('input[name="confirmPassword"]').type(newPassword)
    cy.get('input[name="speciality"]').type(newSpeciality)
    cy.get('input[name="CRPNumber"]').type(newCRP)
    cy.get('button[type="submit"]').click()

    cy.contains("Entrar").should("be.visible")
  })

  it("Deve retornar mensagem de erro ao tentar cadastrar com email já existente", () => {
    const existingEmail = "teste@teste.com"
    const password = "1234"

    cy.contains("Registrar-se").click()
    cy.get('input[name="firstName"]').type("Teste")
    cy.get('input[name="lastName"]').type("Teste")
    cy.get('input[name="email"]').type(existingEmail)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(password)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains("2").click()
    cy.get('button[type="submit"]').click()

    cy.contains("Este email já está cadastrado").should("be.visible")
  })

  it("Deve retornar mensagem de erro ao cadastrar com senhas que não coincidem", () => {
    const newEmail = "novo@teste.com"
    const password = "1234"
    const confirmPassword = "4321"

    cy.contains("Registrar-se").click()
    cy.get('input[name="firstName"]').type("Teste")
    cy.get('input[name="lastName"]').type("Teste")
    cy.get('input[name="email"]').type(newEmail)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="confirmPassword"]').type(confirmPassword)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains("2").click()
    cy.get('button[type="submit"]').click()

    cy.contains("As senhas não coincidem").should("be.visible")
  })

  it("Deve fazer login com o novo paciente cadastrado", () => {
    const newFirstName = "Novo"
    const newLastName = "Paciente"
    const newEmail = "novo@teste.com"
    const newPassword = "1234"

    cy.contains("Registrar-se").click()
    cy.get('input[name="firstName"]').type(newFirstName)
    cy.get('input[name="lastName"]').type(newLastName)
    cy.get('input[name="email"]').type(newEmail)
    cy.get('input[name="password"]').type(newPassword)
    cy.get('input[name="confirmPassword"]').type(newPassword)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains("2").click()
    cy.get('button[type="submit"]').click()

    cy.get('input[name="email"]').type(newEmail)
    cy.get('input[name="password"]').type(newPassword)
    cy.get('button[type="submit"]').click()

    cy.url().should("include", "/pacient")
    cy.contains("Meu Espaço Terapêutico").should("be.visible")
  })
})
