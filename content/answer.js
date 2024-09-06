
class Answer {
    error = false

    domAnswer = null
    translateButton = null

    contentSelector = 'div:nth-child(1)'
    domAnswerContent = null

    toolBarSelector = 'div:nth-child(2) > div'


    constructor(domAnswer) {
        this.domAnswer = domAnswer
        this.domAnswerContent = domAnswer.querySelector(this.contentSelector)

        const toolBar = this.domAnswer.querySelector(this.toolBarSelector)
        if(!toolBar){ 
            this.error = true
            return;
        }
        const buttonWrapper = document.createElement('div')
        toolBar.appendChild(buttonWrapper)
        
        this.translateButton = new TranslateButton(buttonWrapper)

        this.translateButton.button.addEventListener('click', async (event) => {
            // this.translateButton.injectDropdownMenu()
            const language = await chrome.storage.local.get('language')
            this.translateContent(language['language'])

        })
    }

    async translateContent(to_language) {
        console.log("To language: ", to_language)
        const articleContent = this.domAnswerContent.innerHTML

        const result = await translate(to_language , articleContent)

        const translatedHTML = document.createElement("div")
        translatedHTML.style.marginRight="-100px"
        translatedHTML.style.width="460px"

        translatedHTML.innerHTML+='<div>'+result+'</div>'

        const currentContent = this.domAnswerContent.querySelector('div')
        
        currentContent.style.marginLeft ="-100px"
        currentContent.style.width ="460px"



        this.domAnswerContent.appendChild(translatedHTML)

        this.domAnswerContent.style.display="grid"
        this.domAnswerContent.style.gridTemplateColumns="1fr 1fr"
        this.domAnswerContent.style.gap="20px"
        this.domAnswerContent.style.marginTop="60px"

        this.translateButton.buttonWrapper.innerHTML = ""
    }


}
