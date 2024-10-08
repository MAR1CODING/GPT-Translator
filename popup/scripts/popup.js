import { getAvailableLanguages } from "./translator.js";

let selectedLanguageHTML
let languageInput
let languagesList
let dropdownButton
let myDropdown

let availableLanguages;
let currentLanguage;


const donateButton = document.getElementById('donateButton')

const extensionHTML = document.getElementById('extension')
const warningHTML = document.getElementById('warning')


// Initialize the language when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeExtension);


// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn') && !myDropdown?.contains(event.target) && !languageInput?.contains(event.target)) {
        if (myDropdown?.style?.display === 'block') {
            myDropdown.style.display = 'none'; // Hide the dropdown
            languageInput.style.display = 'none'; // Hide the search bar
        }
    }
}


// Redirects user to donate page when donateButton clicked
donateButton.addEventListener('click', () => {
    const extensionId = chrome.runtime.id; // Get the extension's ID dynamically
    const url = `chrome-extension://${extensionId}/donate/donate.html`; // Path to the new page
    chrome.tabs.create({ url });
});



function initializeExtension() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        let activeTabURL = tabs[0].url;

        console.log("ActiveUrl: ", activeTabURL)
        
        if(activeTabURL.includes("chatgpt.com")) {
            // Show extension
            extensionHTML.style.display = "block"
            warningHTML.style.display = "none"

            // get all required elements
            selectedLanguageHTML = document.getElementById('selected-language');
            languageInput = document.getElementById('language-input');
            languagesList = document.getElementById('languages-list');
            dropdownButton = document.getElementById('dropdownButton');
            myDropdown = document.getElementById('myDropdown');

            // initialize the 
            await initializeLanguage()

            languageInput.addEventListener('input', filterFunction);
            dropdownButton.addEventListener('click', toggleDropdown);
            selectedLanguageHTML.addEventListener('click', toggleDropdown);
            dropdownButton.querySelector("svg").addEventListener('click', toggleDropdown);

            let currentLanguage;
            dropdownButton.addEventListener('mouseover', (event) => {
                currentLanguage = selectedLanguageHTML.textContent
                selectedLanguageHTML.textContent = "Choose Language"
            });

            dropdownButton.addEventListener('mouseout', (event) => {
                selectedLanguageHTML.textContent = currentLanguage
                
            });
        }
    });
}


async function setUpLanguagesList(languages) {
    if (!languages || languages.length === 0) {
        throw new Error("No available languages provided");
    }

    languagesList.innerHTML = "";

    languages.forEach(lang => {
        const item = document.createElement('li');
        item.textContent = lang.name;
        item.addEventListener('click', () => selectLanguage(lang.language));
        myDropdown.classList.remove('show');
        languagesList.appendChild(item);
    });
}

async function initializeLanguage() {
    selectedLanguageHTML.textContent = "Loading..."
    languageInput.style.display = 'none'; // Hide the search bar initially
    myDropdown.style.display ='none' ; 
    myDropdown.classList.remove("show");

    try {
        availableLanguages = await getAvailableLanguages();
        const storedLanguage = await chrome.storage.local.get('language');

        currentLanguage = storedLanguage.language || null;

        if (!currentLanguage) {
            selectedLanguageHTML.textContent = "Search";
        } else {
            const current = availableLanguages.find(lang => lang.language === currentLanguage);
            if (current) {
                selectedLanguageHTML.textContent = current.name;
            } else {
                selectedLanguageHTML.textContent = "Search";
            }
        }

        await setUpLanguagesList(availableLanguages);
    } catch (err) {
        console.log("Error: ", err)
    }
}

async function selectLanguage(languageId) {
    const language = availableLanguages.find(lang => lang.language === languageId);

    if (language) {
        await chrome.storage.local.set(language);
        selectedLanguageHTML.textContent = language.name;
        languageInput.value = "";
        languageInput.style.display = 'none'; // Hide the search bar
        myDropdown.style.display ='none';
        myDropdown.classList.remove("show");
        return language;
    }

    console.error(`Language ${languageId} not found`);
    return null;
   }


function filterFunction() {
    const filter = languageInput.value.toUpperCase();
    const listItems = languagesList.getElementsByTagName("li");
    
    for (let i = 0; i < listItems.length; i++) {
        const txtValue = listItems[i].textContent || listItems[i].innerText;
        if (txtValue.toUpperCase().startsWith(filter)) {
            listItems[i].style.display = "";
        } else {
            listItems[i].style.display = "none";
        }
    }
}

function toggleDropdown(event) {
    event.preventDefault()
    
    if (myDropdown.style.display === 'block') {
        myDropdown.style.display = 'none'; // Hide dropdown
        languageInput.style.display = 'none'; // Hide search bar
    } else {
        myDropdown.style.display = 'block'; // Show dropdown
        languageInput.style.display = 'block'; // Show search bar
        languageInput.focus();
    }
}

