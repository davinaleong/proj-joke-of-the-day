console.log(`main.js loaded`)

const apiUrl = `https://davinas-cms.herokuapp.com/api/davdevs/jokes/random`
const dataElementAttr = `data-element`
const jokeContentEl = document.querySelector(`[${dataElementAttr}="joke-content"]`)
const jokeLoaderEl = document.querySelector(`[${dataElementAttr}="joke-loader"]`)
const jokeButtonEl = document.querySelector(`[${dataElementAttr}="joke-button"]`)

const contentAnimationClass = `dialog__content-animation`
const loaderAnimationClass = `dialog__loader-animation`

getRandomJoke(apiUrl)

async function getRandomJoke(url) {
    jokeContentEl.classList.remove(contentAnimationClass)
    jokeLoaderEl.classList.remove(loaderAnimationClass)

    try {
        const response = await fetch(url)
        const data = await response.json()
        const { joke } = data
        console.log(joke)

        let contentHtml = ``
        if (joke && joke.text) {
            const parts = joke.text.split("r/n/r/n")
            console.log(parts)
            parts.forEach(part => contentHtml += `<p>${part}</p>`)
            jokeContentEl.innerHTML = contentHtml

            jokeContentEl.classList.add(contentAnimationClass)
            setTimeout(function() {
                jokeLoaderEl.classList.add(loaderAnimationClass)
            }, 200)
        }
    } catch(error) {
        console.error(error)
    }
}