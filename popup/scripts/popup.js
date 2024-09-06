// scripts/popup.js
import { getAvailableLanguages } from "./translator.js"


const selectedLanguageHTML = document.getElementById('selected-language')


const languagesSelector = document.getElementById('languages-selector')
const selectButton = document.getElementById('select-button')

async function setUpLanguagesSelector() {
    const availableLanguages = await getAvailableLanguages()

    if (!availableLanguages) {
        throw new Error("An error occourred obtaining available languages")
    }

    let language = await chrome.storage.local.get('language')

    console.log("Language: ", language)
    if (!language) {
        await chrome.storage.local.set({ 
            'language': 'es',
         })
        language = 'es'
    }

    availableLanguages.forEach(_language => {
        const option = document.createElement('option')
        option.value = _language["language"]
        option.innerHTML = _language["name"]

        if (_language["language"] === language['language']){
            selectedLanguageHTML.innerHTML = _language['name']
            option.selected = true
        }
        languagesSelector.appendChild(option)
    });
}


setUpLanguagesSelector()



async function selectLanguage() {
    const language = (await getAvailableLanguages())
    .find(_language => _language['language'] === languagesSelector.value)

    if (language) {
        await chrome.storage.local.set({ 'language': language['language'] })
        return language
    }
    return null
}


selectButton.addEventListener('click', async () => {
    let language = await selectLanguage()

    if(language) {
        selectedLanguageHTML.innerHTML = language['name']
    }

})

