const btn = document.getElementById("btn")
const loading = document.getElementById("loading")

btn.addEventListener("click", getWeather)

function getWeather(){

loading.style.display = "block"

const delhi = fetch(
"https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true"
)

const mumbai = fetch(
"https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.87&current_weather=true"
)

const bangalore = fetch(
"https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current_weather=true"
)

Promise.all([delhi,mumbai,bangalore])

.then(responses => Promise.all(responses.map(r => r.json())))

.then(data => {

loading.style.display = "none"

const [delhiData,mumbaiData,bangaloreData] = data

updateCard("delhi", delhiData)
updateCard("mumbai", mumbaiData)
updateCard("bangalore", bangaloreData)

})

.catch(error => {

loading.style.display = "none"

document.querySelectorAll(".weather").forEach(el=>{
el.innerText="Error loading weather"
})

console.log(error)

})

}

function updateCard(city,data){

const temp = data.current_weather.temperature
const code = data.current_weather.weathercode

const emoji = getWeatherEmoji(code)

document.querySelector(`#${city} .weather`).innerHTML =
`${emoji} ${temp}°C`

}

function getWeatherEmoji(code){

if(code === 0) return "☀️"
if(code <= 3) return "⛅"
if(code <= 48) return "☁️"
if(code <= 67) return "🌧"
if(code <= 77) return "❄️"
if(code <= 82) return "🌧"
if(code <= 95) return "⛈"

return "🌍"

}