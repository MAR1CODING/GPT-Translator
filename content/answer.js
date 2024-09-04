
class Answer {
    domAnswer = null
    domAnswerText = null
    translateButton = null


    toolBarSelector = 'div:nth-child(2) > div'


    constructor(domAnswer) {
        this.domAnswer = domAnswer
        this.domAnswerText = domAnswer.querySelector('div:nth-child(1)')

        console.log("Creating answer")
        this.generateTranslateButton()
        this.addTraslateButtonToToolbar()
    }

    addTraslateButtonToToolbar() {
        // Obtai toolbar from domAnswerArticle
        const messageToolBar = this.domAnswer.querySelector(this.toolBarSelector)
        messageToolBar.appendChild(this.translateButton)
    }

    generateTranslateButton() {
        console.log("Creating button")
        this.translateButton = document.createElement('button')
        this.translateButton.innerHTML = "Translate"
        this.translateButton.style.fontSize = "16px"
        this.translateButton.style.padding = "3px"
        this.translateButton.style.position = "relative"
        this.translateButton.style.justifyContent = "flex-end"
        this.translateButton.style.backgroundColor = "black"
        this.translateButton.style.padding = "8px 16px"
        this.translateButton.style.borderRadius = "12px"
        this.translateButton.style.color = "#b4b4b4"
    }

    async translateArticle(language) {
        const articleContent = this.getContent()

        const result = await translate(articleContent, {to: language})
        console.log(articleContent)
    }

    getContent() {
        return this.domAnswerArticle.textContent
    }
    
}
