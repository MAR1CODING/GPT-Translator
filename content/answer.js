
class Answer {
    domAnswer = null
    translateButton = null

    contentSelector = 'div:nth-child(1)'
    domAnswerContent = null

    toolBarSelector = 'div:nth-child(2) > div'


    constructor(domAnswer) {
        this.domAnswer = domAnswer
        this.domAnswerContent = domAnswer.querySelector(this.contentSelector)

        const toolBar = this.domAnswer.querySelector(this.toolBarSelector)
        const buttonWrapper = document.createElement('div')
        toolBar.appendChild(buttonWrapper)
        
        this.translateButton = new TranslateButton(buttonWrapper)

        this.translateButton.button.addEventListener('click', async (event) => {
            // this.translateButton.injectDropdownMenu()
            const language = await chrome.storage.local.get('language')
            this.translateArticle(language['language'])
        })
    }

    async translateArticle(to_language) {
        const articleContent = this.getContent()

        const result = await translate(to_language , articleContent)

        console.log("dom answer: ", this.domAnswerContent)

        const translatedHTML = document.createElement("div")

        translatedHTML.innerHTML=`  
            <h3>Translated text</h3>
            <p style="height=500px">'${result}'</p>
        `

        this.domAnswerContent.appendChild(translatedHTML)

        this.translateButton.buttonWrapper.innerHTML = ""
    }

    getContent() {
        return this.domAnswerContent.innerHTML
    }

}
