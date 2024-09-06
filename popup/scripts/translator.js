


const API_PROXY_URL = "https://gpt-translator-207295841696.us-central1.run.app"



let _availableLanguages = null

export const getAvailableLanguages = async () => {
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
