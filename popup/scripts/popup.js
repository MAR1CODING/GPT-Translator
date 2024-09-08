// scripts/popup.js
import { getAvailableLanguages } from "./translator.js";

const selectedLanguageHTML = document.getElementById('selected-language');
const languageInput = document.getElementById('language-input');
const languagesList = document.getElementById('languages-list');

let availableLanguages;
let currentLanguage;

async function setUpLanguagesList(languages) {
    if (!languages || languages.length === 0) {
        throw new Error("No available languages provided");
    }

    languagesList.innerHTML = "";

    languages.forEach(lang => {
        const item = document.createElement('li');
        item.textContent = lang.name;

        item.addEventListener('click', () => selectLanguage(lang.language));

        languagesList.appendChild(item);
    });
}

async function initializeLanguage() {
    availableLanguages = await getAvailableLanguages();
    const storedLanguage = await chrome.storage.local.get('language');

    currentLanguage = storedLanguage.language || 'es';

    if (!storedLanguage.language) {
        await chrome.storage.local.set({
            language: 'es',
            name: 'Spanish'
        });
    }

    const current = availableLanguages.find(lang => lang.language === currentLanguage);

    if (!current) {
        throw new Error(`Language ${currentLanguage} not found in available languages`);
    }

    selectedLanguageHTML.textContent = current.name;
    await setUpLanguagesList(availableLanguages);
}

languageInput.addEventListener('input', (event) => {
    if (!availableLanguages) return;

    const filteredLanguages = availableLanguages.filter(lang =>
        lang.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUpLanguagesList(filteredLanguages);
});

async function selectLanguage(languageId) {
    const language = availableLanguages.find(lang => lang.language === languageId);

    if (language) {
        await chrome.storage.local.set(language);
        selectedLanguageHTML.textContent = language.name;
        languageInput.value = "";
        await setUpLanguagesList(availableLanguages);
        return language;
    }

    console.error(`Language ${languageId} not found`);
    return null;
}

initializeLanguage();