console.log(`main.js loaded`)

const apiUrl = `https://davinas-cms.herokuapp.com/api/davdevs/jokes/random`
const dataElementAttr = `data-element`
const disabledAttr = `disabled`
const jokeContentEl = document.querySelector(`[${dataElementAttr}="joke-content"]`)
const jokeLoaderEl = document.querySelector(`[${dataElementAttr}="joke-loader"]`)
const jokeButtonEl = document.querySelector(`[${dataElementAttr}="joke-button"]`)

const contentAnimationClass = `dialog__content-animation`
const loaderAnimationClass = `dialog__loader-animation`

getRandomJoke(apiUrl)

jokeButtonEl.addEventListener(`click`, function(event) {
    getRandomJoke(apiUrl)
})

async function getRandomJoke(url) {
    jokeContentEl.classList.remove(contentAnimationClass)
    jokeLoaderEl.classList.remove(loaderAnimationClass)
    jokeButtonEl.setAttribute(disabledAttr, true)

    try {
        const response = await fetch(url)
        const data = await response.json()
        const { joke } = data
        console.log(joke)

        let contentHtml = ``
        if (joke && joke.text) {
            const parts = joke.text.split(/\r\n\r\n/)
            console.log(parts)
            parts.forEach(part => contentHtml += `<p>${part}</p>`)
            jokeContentEl.innerHTML = contentHtml

            jokeContentEl.classList.add(contentAnimationClass)
            setTimeout(function() {
                jokeLoaderEl.classList.add(loaderAnimationClass)
                jokeButtonEl.removeAttribute(disabledAttr)
            }, 200)
        }
    } catch(error) {
        console.error(error)
    }
}