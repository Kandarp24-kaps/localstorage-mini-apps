const btn = document.getElementById("btn")
const newsContainer = document.getElementById("news")
const loading = document.getElementById("loading")
const topicSelect = document.getElementById("topic")

btn.addEventListener("click", getNews)

// load news automatically when page opens
document.addEventListener("DOMContentLoaded", getNews)

async function getNews(){

loading.style.display="block"
newsContainer.innerHTML=""

try{

const topic = topicSelect.value

const url = `https://hn.algolia.com/api/v1/search?query=${topic}`

const res = await fetch(url)

const data = await res.json()

console.log(data)

loading.style.display="none"

showNews(data.hits)

}
catch(error){

loading.style.display="none"

newsContainer.innerHTML="Failed to load news"

}

}

function showNews(articles){

articles.slice(0,10).forEach(article => {

if(!article.title && !article.story_title) return

const title = article.title || article.story_title

const div = document.createElement("div")

div.className="card"

div.innerHTML=`
<h3>${title}</h3>
<p>Author: ${article.author}</p>
<a href="${article.url || '#'}" target="_blank">Read</a>
`

newsContainer.appendChild(div)

})

}