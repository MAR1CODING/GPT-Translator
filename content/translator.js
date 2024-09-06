


const API_PROXY_URL = "https://gpt-translator-207295841696.us-central1.run.app"



let _availableLanguages = null

const getAvailableLanguages = async () => {
    if(_availableLanguages)
        return _availableLanguages
    
    _availableLanguages = await _getAvailableLanguages()
    return _availableLanguages
}


async function _getAvailableLanguages() {

    const data = {
        "action": "get-languages"
    }

    const response = await fetch(API_PROXY_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })



    if(!response.ok) throw new Error("Server response not valid")

    const languages = await response.json()

    return languages
}


async function translate(language, text) {

    if(!language || !text)
        throw new Error("No language or text provided")

    const data = {
        "action": "translate-text",
        "language": language,
        "content": text
    }

    console.log("Data: ", data)

    const response = await fetch(API_PROXY_URL, {
        method: "post",
        // mode: "no-cors",  // Bypass CORS
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const response_json = await response.json()
    console.log("Response json: ", response_json)

    const translated_text = response_json["translatedText"]
    // console.log("Translated text: ", translated_text)

    return translated_text
}

