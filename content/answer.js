
 class Answer {
    domAnswer = null;
    domAnswerlText = null;
    translateButton = null;


    toolBarSelector = 'div:nth-child(2) > div ';

    constructor(domAnswer) {

        
        this.domAnswer = domAnswer;
        this.domAnswerText = domAnswer.querySelector('div:nth-child(1)')

        console.log('HELLOOOOOOOO')

        this.generateTranslateButton()
        this.addTranslateButtonToToolbar()
    }

    addTranslateButtonToToolbar() {
        // Obtai toolbar from domAnswerArticle
        const messageToolBar = this.domAnswer.querySelector(this.toolBarSelector)
        /*
        articles.filter(article => {
            article.search
            })
   
            const messageToolBar = this.domAnswerArticle.querySelector(this.toolBarSelector)
         */
         messageToolBar.appendChild(this.translateButton)
    }

    

    generateTranslateButton() {

        
        this.translateButton = document.createElement('button')
        this.translateButton.classList.add('translate-button')
        this.translateButton.innerHTML = "T"
        
        this.translateButton.style.position = "relative"
        this.translateButton.style.display = "inline-flex"; 
       
        this.translateButton.style.alignItems = "center";
        this.translateButton.style.color = "#b4b4b4"

        const arrow = document.createElement('span');

        arrow.style.display = "inline-flex"; 
    
        arrow.style.borderColor = "#7e7e7e"; 
        arrow.style.borderWidth = "0 2px 2px 0";
        arrow.style.display = "inline-block";

        arrow.style.padding = "3px";
        /* arrow.style.marginLeft = "100px"; 
        arrow.style.marginRight = "10px"; // Moves the arrow closer to the text (left)
        arrow.style.marginBottom = "5px";  // Moves the arrow up
 */
        arrow.style.transform = "rotate(45deg)";
        arrow.style.WebkitTransform = "rotate(45deg)";


        // Select the element (e.g., a <span>)
        var spanElement = document.createElement('span');

        spanElement.innerHTML = "ranslate";
         // Position absolutely within the button
       
        
        spanElement.style.color = "#b4b4b4"; // Ensure the text color is visible
        spanElement.style.padding = "3px";
        spanElement.style.overflow = 'hidden';
        spanElement.style.fontSize = '0.875rem'; // Equivalent to text-sm in Tailwind
        spanElement.style.transition = 'opacity 0.3s ease'; // Smooth transition
        
 
        this.translateButton.addEventListener('mouseenter', () => {

            spanElement.style.opacity = '1'; // Show text on hover
            spanElement.style.width = 'auto'; // Adjust width to fit the content
            
        });
        
        this.translateButton.addEventListener('mouseleave', () => {
            
            spanElement.style.opacity = '0'; // Hide text when not hovering
            spanElement.style.width = '0'; // Hide element
            
        });

        this.translateButton.appendChild(spanElement)


        // Append the arrow to the button
        this.translateButton.appendChild(arrow);

        const wrapper = document.createElement('span')
        
        //wrapper.style.position = "relative";
        wrapper.style.display = "inline-block"; // Ensure it wraps around the content
        wrapper.style.padding = "5px";
        wrapper.style.borderRadius = "4px";
       
        while (this.translateButton.firstChild) {
            wrapper.appendChild(this.translateButton.firstChild);
        }
        this.translateButton.appendChild(wrapper);
        

        this.translateButton.addEventListener('mouseenter', () => {

            wrapper.style.backgroundColor = '#2f2f2f'; // Show text on hover
            wrapper.style.width = 'auto'; // Adjust width to fit the content
        });
        this.translateButton.addEventListener('mouseleave', () => {

            wrapper.style.backgroundColor = ''; // Show text on hover
            wrapper.style.width = '0px'; // Adjust width to fit the content
        });

        

        

    }

    async translateArticle(language) {
        const articleContent = this.getContent()

        const result = await translate(articleContent, {to: language})
        console.log(articleContent)
    }

    getContent() {
        return this.domAnswerText.textContent
    }
    
    
    
}




