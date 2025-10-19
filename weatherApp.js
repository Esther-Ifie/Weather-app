// Clean, single implementation for weatherApp.js

const button = document.getElementById("SearchButton");
const data = document.getElementById("stateContainer");
const Container = document.getElementById("Container");

if (button) {
  button.addEventListener("click", getWeather);
}

async function getWeather() {
  const inputEl = document.getElementById("input");
  const input = inputEl ? inputEl.value.trim() : "";

  if (!input) {
    alert("Please enter a city name");
    return;
  }

  if (data) data.innerHTML = "<p>Loading weather data...</p>";

  const apiKey = "4c16c4bdeceb4e9e934161626240305";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    input
  )}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const result = await response.json();

    if (!result || !result.location || !result.current) {
      throw new Error("Unexpected API response");
    }

    if (data) {
      data.innerHTML = `
        <p id="state">Country: ${result.location.country}</p>
        <p id="state">City: ${result.location.name}</p>
        <p id="state">Region: ${result.location.region}</p>
        <h3>${result.current.condition.text}</h3>
        <p class="temp">Temp: ${result.current.temp_c}°C</p>
        <p class="temp">Feels like: ${result.current.feelslike_c}°C</p>
        <p class="temp">Humidity: ${result.current.humidity}%</p>
      `;
    }

    // Map common condition keywords to background images (case-insensitive)
    const condition = result.current.condition.text.toLowerCase();
    const backgrounds = [
      { keys: ["sunny", "clear"], url: "https://i.pinimg.com/564x/e5/f3/69/e5f369adf7bdc742eb18bde59095cac3.jpg" },
      { keys: ["overcast", "cloudy", "partly cloudy"], url: "https://i.pinimg.com/564x/cd/e7/b4/cde7b463ea1e716a26f190bf66af974f.jpg" },
      { keys: ["light rain", "moderate rain", "heavy rain", "patchy light rain with thunder", "light drizzle"], url: "https://i.pinimg.com/564x/a9/87/72/a98772846d7cb84b02e01048d5003eae.jpg" },
      { keys: ["mist"], url: "https://i.pinimg.com/736x/ea/90/24/ea9024e0924c21ef690ca90349836893.jpg" }
    ];

    if (Container) {
      let matched = false;
      for (const bg of backgrounds) {
        for (const k of bg.keys) {
          if (condition.includes(k)) {
            Container.style.backgroundImage = `url(${bg.url})`;
            matched = true;
            break;
          }
        }
        if (matched) break;
      }
      // Default background if no match
      if (!matched) {
        Container.style.backgroundImage = "";
      }

      // Smooth instant-ish transition
      Container.style.transitionDuration = ".2s";
      Container.style.transitionTimingFunction = "ease-in-out";
    }
  } catch (error) {
    console.error(error);
    if (data) data.innerHTML = "<p>City not found or an error occurred. Please try again.</p>";
  }
}
