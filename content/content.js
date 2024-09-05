

if(window.location.href.includes('chatgpt.com')) {
    setTimeout(() => main(), 1000)
}


var articles = [];



function main() {

    // Obtains last Message
    const answers = document.querySelectorAll("article > div >  div > div:nth-child(2) > div")

    answers.forEach(answer => {
        articles.push(new Answer(answer))
    })


/* 

    const messages = document.querySelectorAll('div.items-center.justify-start.rounded-xl.p-1.flex > div.flex.items-center');
    //const oldmessages = document.querySelectorAll('div.items-center.justify-start.rounded-xl.p-1.z-10.-mt-1.bg-token-main-surface-primary.md:absolute.md:border.md:border-token-border-light.md:sr-only > div.flex.items-center');
    const lastMessage = messages[messages.length-1]


    // Creating button wrapper and button
    const buttonWrapper = document.createElement('span')
    const newButton = document.createElement('button')
    


    // Adding the styles for the wrapper
    buttonWrapper.style.width = "100%";
    buttonWrapper.style.display = "grid"
    buttonWrapper.style.placeItems = "center end";

    // Adding text to the button
    newButton.innerHTML = "Translate"

    // Adding the styles for the button
    newButton.style.padding = "3px"
    newButton.style.position = "relative"
    newButton.style.justifyContent = "flex-end";
    newButton.style.backgroundColor = "#2f2f2f"
    newButton.style.color = "#b4b4b4";
    newButton.style.border = "2px black"
    newButton.style.borderRadius = "4px"
    newButton.style.cursor = "pointer"

    // Add click event listener to the button
    newButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown();
    });

    function observeMessages() {
        const chatContainer = document.querySelector('div[data-chat-container-selector]'); // Replace with the actual selector for the chat container
        if (!chatContainer) return;
    
        const observer = new MutationObserver(() => {
            const messages = document.querySelectorAll('div.items-center.justify-start.rounded-xl.p-1.flex > div.flex.items-center');
            messages.forEach((message) => {
                if (!message.querySelector('.translate-button')) {
                    addButtonToMessage(message);
                }
            });
        });
    
        observer.observe(chatContainer, { childList: true, subtree: true });
    }
    // Adding a CSS arrow to the button
    const arrow = document.createElement('span');
    
    arrow.style.borderColor = "#b4b4b4"; 
    arrow.style.borderWidth = "0 2px 2px 0";
    arrow.style.display = "inline-block";

    arrow.style.padding = "3px";
    arrow.style.marginLeft = "4px";  // Moves the arrow closer to the text (left)
    arrow.style.marginBottom = "4px";  // Moves the arrow up

    arrow.style.transform = "rotate(45deg)";
    arrow.style.WebkitTransform = "rotate(45deg)";

// Append the arrow to the button
    newButton.appendChild(arrow);

    // Adding elements to the website dom
    buttonWrapper.appendChild(newButton)
    lastMessage.appendChild(buttonWrapper)
    //oldmessages.appendChild(buttonWrapper)
    //oldmessages.appendChild(newButton)
    injectDropdownMenu(buttonWrapper) */

}
/* 

// Make these functions global
window.toggleDropdown = function() {
    console.log("Toggle dropdown called");
    const dropdown = document.getElementById('languageDropdown');
    if (!dropdown) {
        console.error("Dropdown element not found");
        return;
    }
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    console.log("Dropdown display:", dropdown.style.display);
}

window.selectLanguage = function(language) {
    console.log("Selected language:", language);
    const dropdown = document.getElementById("languageDropdown");
    if (dropdown) {
        dropdown.style.display = "none";
    } else {
        console.error("Dropdown element not found");
    }
}

// Function to toggle the dropdown
//function toggleDropdown() {
  //  const dropdown = document.getElementById('languageDropdown');
    //dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
//}

// Function to handle language selection
//function selectLanguage(language) {
    //  console.log("Selected language: " + language);
    // Here you can add the logic to handle the language selection
    //  document.getElementById("languageDropdown").style.display = "none";
//}

// Close the dropdown if clicked outside of it
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('languageDropdown');
    const translateButton = event.target.closest('button');
    if (!translateButton && dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    }
});

function addButtonToMessage(message) {
    const buttonWrapper = document.createElement('span');
    const newButton = document.createElement('button');
    
    // Create the SVG element
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("xmlns", svgNamespace);
    svg.setAttribute("height", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24px");
    svg.setAttribute("fill", "#000"); // Changed to black to match button text color
    
    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("d", "m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z");
    
    svg.appendChild(path);
    
    // Styling the button
    newButton.innerHTML = 'Translate '; // Remove the arrow, we'll add the SVG instead
    newButton.appendChild(svg); // Add the SVG to the button
    newButton.style.padding = '3px';
    newButton.style.position = 'relative';
    newButton.style.backgroundColor = '#F7F7F8';
    newButton.style.border = '2px solid gray';
    newButton.style.borderRadius = '4px';
    newButton.style.color = '#000'; // Black text color
    newButton.style.display = 'none'; // Initially hide the button
    newButton.style.display = 'flex'; // Use flex to align text and SVG
    newButton.style.alignItems = 'center'; // Center items vertically
    newButton.style.gap = '4px'; // Add some space between text and SVG
    newButton.classList.add('translate-button');

    // Add click event listener to the button
    newButton.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleDropdown(buttonWrapper);
    });

    // Adding elements to the website DOM
    buttonWrapper.appendChild(newButton);
    message.appendChild(buttonWrapper);
    injectDropdownMenu(buttonWrapper);

    // Attach the hover event to the message
    addHoverButton(message);
} */