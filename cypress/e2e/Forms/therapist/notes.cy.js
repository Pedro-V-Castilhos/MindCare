/// <reference types="cypress" />

describe("Teste de Anotações de Sessão para Terapeuta", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/")
    const validEmail = "dr.smith@teste.com"
    const validPassword = "1234"

    cy.get('input[name="email"]').type(validEmail)
    cy.get('input[name="password"]').type(validPassword)
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/therapist")
    cy.contains("Anotações").click()
    cy.url().should("include", "/therapist/notes")
    cy.contains("Nova Anotação").click()
  })

  it("Deve exibir o formulário de registro de anotação de sessão", () => {
    cy.contains("Registrar Anotação de Sessão").should("be.visible")
    cy.contains("Paciente").should("be.visible")
    cy.contains("Sessão").should("be.visible")
    cy.contains("Conteúdo da Sessão").should("be.visible")
    cy.contains("Estado Emocional").should("be.visible")
    cy.contains("Tópicos Abordados").should("be.visible")
    cy.contains("Próximos Passos").scrollIntoView().should("be.visible")
    cy.contains("Próximos Passos").should("be.visible")
    cy.contains("Notas Privadas").should("be.visible")
  })

  it("Deve registrar uma nova anotação de sessão com dados válidos", () => {
    const content =
      "O paciente relatou melhorias significativas desde a última sessão."
    const emotionalState = "Melhorado"
    const topics = ["Técnicas de respiração", "Mindfulness"]
    const nextSteps =
      "Continuar com as técnicas de respiração e introduzir exercícios de mindfulness."
    const privateNotes =
      "Paciente parece estar respondendo bem ao tratamento, mas ainda apresenta ansiedade em situações sociais."

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').eq(0).click()
    cy.get('textarea[name="content"]').type(content)
    cy.get('input[name="mood"]').type(emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').type(topic)
      cy.get('input[name="topicsCovered"]').type("{enter}")
    })
    cy.get('textarea[name="nextSteps"]').type(nextSteps)
    cy.get('textarea[name="privateNotes"]').type(privateNotes)
    cy.get('button[type="submit"]').click()
    cy.contains("Anotação de sessão adicionada com sucesso!").should(
      "be.visible"
    )
  })

  it("Deve exibir mensagens de erro para dados inválidos", () => {
    cy.get('button[type="submit"]').click()
    cy.contains("Paciente é obrigatório").should("be.visible")
    cy.contains("Sessão é obrigatória").should("be.visible")
    cy.contains("Este campo é obrigatório").should("be.visible")
  })

  it("Deve exibir mensagem de erro para paciente ou sessão inválidos", () => {
    const content = "Conteúdo da sessão sem paciente ou sessão selecionados."
    cy.get('textarea[name="content"]').type(content)
    cy.get('button[type="submit"]').click()
    cy.contains("Paciente é obrigatório").scrollIntoView().should("be.visible")
    cy.contains("Sessão é obrigatória").should("be.visible")
  })

  it("Deve exibir mensagem de erro para mais de 5 tópicos abordados", () => {
    const content = "Conteúdo da sessão com muitos tópicos."
    const emotionalState = "Sem mudanças"
    const topics = [
      "Tópico 1",
      "Tópico 2",
      "Tópico 3",
      "Tópico 4",
      "Tópico 5",
      "Tópico 6",
    ]
    const nextSteps = "Próximos passos para muitos tópicos."
    const privateNotes = "Notas privadas para muitos tópicos."

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').eq(0).click()
    cy.get('textarea[name="content"]').type(content)
    cy.get('input[name="mood"]').type(emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').type(topic)
      cy.get('input[name="topicsCovered"]').type("{enter}")
    })
    cy.get('textarea[name="nextSteps"]').type(nextSteps)
    cy.get('textarea[name="privateNotes"]').type(privateNotes)
    cy.get('button[type="submit"]').click()
    cy.contains("Você pode adicionar no máximo 5 tópicos abordados").should(
      "be.visible"
    )
  })

  it("Deve exibir mensagem de exclusão positiva ao excluir uma anotação de sessão", () => {
    const content = "Anotação de sessão para testar exclusão positiva."
    const emotionalState = "Sem mudanças"
    const topics = ["Tópico de teste"]
    const nextSteps = "Próximos passos para teste de exclusão."
    const privateNotes = "Notas privadas para teste de exclusão."

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').eq(0).click()
    cy.get('textarea[name="content"]').type(content)
    cy.get('input[name="mood"]').type(emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').type(topic)
      cy.get('input[name="topicsCovered"]').type("{enter}")
    })
    cy.get('textarea[name="nextSteps"]').type(nextSteps)
    cy.get('textarea[name="privateNotes"]').type(privateNotes)
    cy.get('button[type="submit"]').click()
    cy.contains("Anotação de sessão adicionada com sucesso!").should(
      "be.visible"
    )
    cy.get('[data-testid="collapse-trigger"]').eq(1).click()
    cy.contains(content).scrollIntoView().should("be.visible")
    cy.contains("Excluir Anotação").click()
    cy.contains("Anotação excluída com sucesso!").should("be.visible")
    cy.contains(content).should("not.exist")
  })

  it("Deve exibir formulário de edição de anotação de sessão com dados preenchidos", () => {
    const content = "Anotação de sessão para testar edição."
    const emotionalState = "Sem mudanças"
    const topics = ["Tópico de teste para edição"]
    const nextSteps = "Próximos passos para teste de edição."
    const privateNotes = "Notas privadas para teste de edição."

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').eq(0).click()
    cy.get('textarea[name="content"]').type(content)
    cy.get('input[name="mood"]').type(emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').type(topic)
      cy.get('input[name="topicsCovered"]').type("{enter}")
    })
    cy.get('textarea[name="nextSteps"]').type(nextSteps)
    cy.get('textarea[name="privateNotes"]').type(privateNotes)
    cy.get('button[type="submit"]').click()
    cy.contains("Anotação de sessão adicionada com sucesso!").should(
      "be.visible"
    )
    cy.get('[data-testid="collapse-trigger"]').eq(1).click()
    cy.contains(content).scrollIntoView().should("be.visible")
    cy.contains("Editar Anotação").click()
    cy.get('textarea[name="content"]').should("have.value", content)
    cy.get('input[name="mood"]').should("have.value", emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').should("have.value", "")
      cy.contains(topic).should("be.visible")
    })
    cy.get('textarea[name="nextSteps"]')
      .scrollIntoView()
      .should("have.value", nextSteps)
    cy.get('textarea[name="privateNotes"]').should("have.value", privateNotes)
  })

  it("Deve exibir mensagem de atualização positiva ao editar uma anotação de sessão", () => {
    const content = "Anotação de sessão para testar atualização."
    const emotionalState = "Sem mudanças"
    const topics = ["Tópico de teste para atualização"]
    const nextSteps = "Próximos passos para teste de atualização."
    const privateNotes = "Notas privadas para teste de atualização."

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="option"]').contains("John Doe").click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="option"]').eq(0).click()
    cy.get('textarea[name="content"]').type(content)
    cy.get('input[name="mood"]').type(emotionalState)
    topics.forEach((topic) => {
      cy.get('input[name="topicsCovered"]').type(topic)
      cy.get('input[name="topicsCovered"]').type("{enter}")
    })
    cy.get('textarea[name="nextSteps"]').type(nextSteps)
    cy.get('textarea[name="privateNotes"]').type(privateNotes)
    cy.get('button[type="submit"]').click()
    cy.contains("Anotação de sessão adicionada com sucesso!").should(
      "be.visible"
    )
    cy.get('[data-testid="collapse-trigger"]').eq(1).click()
    cy.contains(content).scrollIntoView().should("be.visible")
    cy.contains("Editar Anotação").click()
    const updatedContent = "Anotação de sessão atualizada com sucesso."
    cy.get('textarea[name="content"]').clear().type(updatedContent)
    cy.get('button[type="submit"]').click()
    cy.contains("Anotação de sessão editada com sucesso!").should("be.visible")
    cy.contains(updatedContent).should("be.visible")
  })
})
