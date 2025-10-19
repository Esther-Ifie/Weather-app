const button = document.getElementById("SearchButton");
button.addEventListener('click', getWeather);

async function getWeather() {
    const input = document.getElementById("input").value;
    
    if(!input.trim()) {
        alert("Please enter a city name");
        return;
    }
    
    const data = document.getElementById("stateContainer");
    data.innerHTML = "<p>Loading weather data...</p>";
    
    const url = `https://api.weatherapi.com/v1/current.json?key=4c16c4bdeceb4e9e934161626240305&q=${input}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        
        data.innerHTML = `
            <p id="state">Country: ${result.location.country}</p>
            <p id="state">City: ${result.location.name}</p>
            <p id="state">Region: ${result.location.region}</p>
            <h3>${result.current.condition.text}</h3>
            <p class="temp">Temp: ${result.current.temp_c}°C</p>
            <p class="temp">Feels like: ${result.current.feelslike_c}°C</p>
            <p class="temp">Humidity: ${result.current.humidity}%</p>
        `;
        
        const Container = document.getElementById("Container");
        if (result.current.condition.text == "Sunny") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/564x/e5/f3/69/e5f369adf7bdc742eb18bde59095cac3.jpg)";
        }
        else if(result.current.condition.text == "Overcast") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/564x/5e/1e/9b/5e1e9b82e1701ea8f8f9f1f608429d77.jpg)";
        }
        else if(result.current.condition.text == "Clear") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/564x/12/5a/1b/125a1b8b5abbaffbc7bc45b34cae9e86.jpg)";
        }
        else if(result.current.condition.text == "Light rain" || 
                result.current.condition.text == "Moderate rain" || 
                result.current.condition.text == "Heavy rain" ||
                result.current.condition.text == "Patchy light rain with thunder" ||
                result.current.condition.text == "Light drizzle") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/564x/a9/87/72/a98772846d7cb84b02e01048d5003eae.jpg)";
        }
        else if(result.current.condition.text == "Partly cloudy" || 
                result.current.condition.text == "cloudy") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/564x/cd/e7/b4/cde7b463ea1e716a26f190bf66af974f.jpg)";
        }
        else if(result.current.condition.text == "Mist") {
            Container.style.backgroundImage = "url(https://i.pinimg.com/736x/ea/90/24/ea9024e0924c21ef690ca90349836893.jpg)";
        }
        
        Container.style.transitionDuration = "0.5s";
        Container.style.transitionTimingFunction = "ease-in-out";
        
    } catch (error) {
        console.error(error);
        data.innerHTML = "<p>City not found. Try another name.</p>";
    }
}