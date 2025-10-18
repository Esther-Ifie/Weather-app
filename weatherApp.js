const button = document.getElementById("SearchButton");
button.addEventListener("click", getWeather);

async function getWeather() {
  const input = document.getElementById("input").value;

  if (!input.trim()) {
    alert("Please enter a city name");
    return;
  }

  const data = document.getElementById("stateContainer");
  data.innerHTML = "<p>Loading...</p>";

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
  } catch (error) {
    console.error(error);
    data.innerHTML = "<p>City not found</p>";
  }
}