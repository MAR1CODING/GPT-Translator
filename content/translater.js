


const API_PROXY_URL = "https://us-central1-gpt-translator-434515.cloudfunctions.net/app"




export async function getAvailableLanguages() {

    const url = API_PROXY_URL+"/"

    fetch(API_PROXY_URL, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return text
}


export async function translate(language, text) {

    if(!language || !text)
        throw new Error("No language or text provided")

    const data = {
        language: language,
        text: text
    }

    const response = await fetch(API_PROXY_URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const response_json = await response.json()

    const translated_text = response_json["translated_text"]

    return translated_text
}