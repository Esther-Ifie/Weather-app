const button = document.getElementById("SearchButton");
button.addEventListener('click', getWeather);

async function getWeather() {
    const input = document.getElementById("input").value;
    
    if(!input.trim()) {
        alert("Please enter a city name");
        return;
    }
    
    const url = `https://api.weatherapi.com/v1/current.json?key=4c16c4bdeceb4e9e934161626240305&q=${input}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}