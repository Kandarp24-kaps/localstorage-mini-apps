
async function planTrip(){

const destination = document.getElementById("destination").value
const days = document.getElementById("days").value
const budget = document.getElementById("budget").value
const interests = document.getElementById("interests").value

const loading = document.getElementById("loading")
const result = document.getElementById("result")

loading.style.display="block"
result.innerHTML=""

const prompt = `
You are a professional travel planner.

Create a simple and structured travel plan.

Destination: ${destination}
Trip Duration: ${days} days
Budget: ${budget}
Interests: ${interests}

Instructions:
1. Give a  short overview of the destination.
2. Provide a day-wise  itinerary.
3. Suggest activities.
4. Provide useful travel tips.

Format your answer clearly using headings and bullet points.
`

try{

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
contents:[
{
parts:[{text:prompt}]
}
]
})
}
)

const data = await response.json()

loading.style.display="none"

const travelPlan = data.candidates[0].content.parts[0].text

result.innerHTML = `
<div class="plan-card">
<h3>🗺️ Your Travel Plan</h3>
<div class="plan-content">${travelPlan.replace(/\n/g,"<br>")}</div>
</div>

`

}
catch(error){

loading.style.display="none"
result.innerHTML="<p style='color:red;'>⚠️ Error generating travel plan.</p>"

}

}