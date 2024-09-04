import { translate } from 'translator.js'


export class Article {
    domAnswerArticle = null
    translateButton = null


    toolBarSelector = 'div.items-center.justify-start.rounded-xl.p-1.flex > div.flex.items-center'


    constructor(domAnswerArticle) {
        this.domAnswerArticle = domAnswerArticle

        this.generateTranslateButton()
        this.addTraslateButtonToToolbar()
    }

    addTraslateButtonToToolbar() {
        // Obtai toolbar from domAnswerArticle
        const messageToolBar = this.domAnswerArticle.querySelector(this.toolBarSelector)
        messageToolBar.appendChild(this.translateButton)
    }

    generateTranslateButton() {
        this.translateButton = document.createElement('button')
        this.translateButton.innerHTML = "Translate"
        this.translateButton.style.padding = "3px"
        this.translateButton.style.position = "relative"
        this.translateButton.style.justifyContent = "flex-end"
        this.translateButton.style.backgroundColor = "#2f2f2f"
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




