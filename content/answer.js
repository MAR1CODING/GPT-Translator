
class Answer {
    error = false

    domAnswer = null
    translateButton = null

    contentSelector = 'div:nth-child(1)'
    domAnswerContent = null

    toolBarSelector = 'div:nth-child(2) > div.p-1'


    constructor(domAnswer) {
        this.domAnswer = domAnswer
        this.domAnswerContent = domAnswer.querySelector(this.contentSelector)

        const toolBarsObtained = this.domAnswer.querySelectorAll(this.toolBarSelector)
        if (!toolBarsObtained) {
            this.error = true
            return;
        }
        const toolBar = toolBarsObtained[toolBarsObtained.length-1];

        const buttonWrapper = document.createElement('div')
        toolBar.appendChild(buttonWrapper)

        this.translateButton = new TranslateButton(buttonWrapper)

        this.translateButton.button.addEventListener('click', async (event) => {
            // this.translateButton.injectDropdownMenu()
            const language = await chrome.storage.local.get('language')
            this.translateContent(language['language'])

        });
    }


    async translateContent(to_language) {
        // Clone the content
        const contentToTranslate = this.domAnswerContent.cloneNode(true);

        // Store code blocks
        const codeBlocks = [];
        contentToTranslate.querySelectorAll('pre').forEach((pre, index) => {
            codeBlocks.push(pre.outerHTML);
            pre.outerHTML = `<pre id="code-block-${index}"></pre>`;
        });

        // Get the HTML content without code blocks
        let htmlContent = contentToTranslate.innerHTML;

        // Translate the HTML content
        const translatedHTML = await translate(to_language, htmlContent);

        // Create a temporary element to hold the translated content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = translatedHTML;

        // Reinsert code blocks
        codeBlocks.forEach((codeBlock, index) => {
            const placeholder = tempElement.querySelector(`#code-block-${index}`);
            if (placeholder) {
                placeholder.outerHTML = codeBlock;
            }
        });

        // Create the translated content container
        const translatedContainer = document.createElement("div");
        translatedContainer.className = 'translated-content';
        translatedContainer.style.marginRight = "-100px";
        translatedContainer.style.width = "460px";
        translatedContainer.innerHTML = tempElement.innerHTML;

        // Remove any existing translated content
        const existingTranslation = this.domAnswerContent.querySelector('.translated-content');
        if (existingTranslation) {
            existingTranslation.remove();
        }

        // Adjust the original content
        const currentContent = this.domAnswerContent.querySelector('div');
        currentContent.style.marginLeft = "-100px";
        currentContent.style.width = "460px";

        // Append the new translated content
        this.domAnswerContent.appendChild(translatedContainer);

        // Adjust the layout
        this.domAnswerContent.style.display = "grid";
        this.domAnswerContent.style.gridTemplateColumns = "1fr 1fr";
        this.domAnswerContent.style.gap = "20px";
        this.domAnswerContent.style.marginTop = "60px";

        this.translateButton.buttonWrapper.innerHTML = "";
    }
}