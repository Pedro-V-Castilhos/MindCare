/// <reference types="cypress" />
import "cypress-file-upload"

describe("Teste de Navegação do Paciente", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "teste@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/pacient")
    cy.contains("Documentos").click()
    cy.url().should("include", "/pacient/documents")
    cy.contains("Adicionar Documento").click()
  })

  it("Deve exibir o formulário de adição de documento", () => {
    cy.contains("Fazer Upload de Documento").should("be.visible")
    cy.contains("Nome do Documento").should("be.visible")
    cy.contains("Tipo do Documento").should("be.visible")
    cy.contains("Arquivo").should("be.visible")
  })

  it("Deve adicionar um novo documento com dados válidos", () => {
    const documentName = "Relatório Médico"
    const documentType = "Relatório"
    const filePath = "Consulta_2026-03-01.txt"

    cy.get('input[name="name"]').type(documentName)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains(documentType).click()
    cy.get('input[type="file"]').attachFile(filePath)
    cy.get('button[type="submit"]').click()
    cy.contains("Documento adicionado com sucesso!").should("be.visible")
    cy.contains(documentName).should("be.visible")
    cy.contains(documentType).should("be.visible")
  })

  it("Deve exibir mensagens de erro para dados inválidos", () => {
    cy.get('button[type="submit"]').click()
    cy.contains("Nome do documento é obrigatório").should("be.visible")
    cy.contains("Arquivo é obrigatório").should("be.visible")
  })

  it("Deve exibir mensagem de erro para tipo de documento inválido", () => {
    const documentName = "Documento Desconecido"
    const filePath = "example.json"
    cy.get('input[name="name"]').type(documentName)
    cy.get('[role="combobox"]').click()
    cy.get('[role="option"]').contains("Outro").click()
    cy.get('input[type="file"]').attachFile(filePath)
    cy.get('button[type="submit"]').click()
    cy.contains("Tipo de documento inválido").should("be.visible")
  })

  it("Deve exibir mensagem ao excluir um documento", () => {
    const documentName = "Consulta_2026-03-01.txt"
    cy.contains(documentName).should("be.visible")
    cy.contains("Cancelar").click()
    cy.get('[data-testid="delete-document-button"]').click()
    cy.contains("Documento excluído com sucesso!").should("be.visible")
    cy.contains(documentName).should("not.exist")
    cy.contains("Documento excluído com sucesso!").should("be.visible")
  })
})
