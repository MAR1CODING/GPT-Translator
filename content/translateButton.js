



class TranslateButton {
    buttonWrapper = null
    button = null


    constructor(buttonWrapper) {
        this.buttonWrapper = buttonWrapper

        this.button = this.generateTranslateButton()
        this.buttonWrapper.appendChild(this.button)

    }


    generateTranslateButton(wrapper) {
        const button = document.createElement('button')
        button.innerHTML = "Translate"
        button.style.fontSize = "16px"
        button.style.padding = "3px"
        button.style.position = "relative"
        button.style.justifyContent = "flex-end"
        button.style.backgroundColor = "black"
        button.style.padding = "8px 16px"
        button.style.borderRadius = "12px"
        button.style.color = "#b4b4b4"
        return button
    }


    // Function to create and inject the dropdown menu
    async injectDropdownMenu() {
        const dropdownHTML = document.createElement('div')
        dropdownHTML.classList.add('dropdown-content')
        dropdownHTML.style.display = 'none'

        //const availableLanguages = await getAvailableLanguages()


        // Create a container for the dropdown
        const dropdownContainer = document.createElement('div');
        dropdownContainer.appendChild(dropdownHTML);
        dropdownContainer.style.position = 'absolute';
        dropdownContainer.style.zIndex = '1000';
        // Append the dropdown to the button wrapper
        this.buttonWrapper.appendChild(dropdownContainer);

        // Inject the CSS
        const style = document.createElement('style');
        style.textContent = `
            .dropdown-content {
                position: absolute;
                background-color: #2f2f2f;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1000;
                top: 100%;
                left: 0;
            }
            .dropdown-content a {
                color: #b4b4b4;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }
            .dropdown-content a:hover {
                background-color: #2f2f2f;
            }
        `;
        document.head.appendChild(style);
    }

}