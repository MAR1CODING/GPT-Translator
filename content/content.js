

if (window.location.href.includes('chatgpt.com')) {
    setInterval(() => main(), 3000)
}


var articles = [];
var answer_ids = []


const answerSelector = "article > div >  div > div:nth-child(2) > div"
const toolBarSelector = "div:nth-child(2) > div"


function main() {

    // Obtains last Message
    const answers = document.querySelectorAll(answerSelector)


    answers.forEach(answerHTML => {
        if(answerHTML.id && answer_ids.includes(answerHTML.id))
            return

        let answer = new Answer(answerHTML)

        if(answer.error)
            return

        answerHTML.id = "answer"+answer_ids.length-1
        answer_ids.push(answerHTML.id)
        articles.push(answer)
    })


}