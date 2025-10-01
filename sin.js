const OWM_KEY = "2ad9054b849b9db225d3ad1794621f5f"; 

async function getWeatherCached(city, maxAgeMs = 10 * 60 * 1000) {
  const key = `weather_${city.replace(/\s+/g,"_")}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const obj = JSON.parse(raw);
      if (Date.now() - obj.ts < maxAgeMs) return obj.data;
    }
  } catch (e) { /* ignore parse errors */ }

  
  const data = await fetchWeatherByCity(city);
  localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  return data;
}

async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

function renderWeather(data, container) {
  if (!data || !data.main) {
    container.innerHTML = "<div class='w-error'>Weather unavailable</div>";
    return;
  }
  const temp = Math.round(data.main.temp);
  const desc = (data.weather && data.weather[0] && data.weather[0].description) || '';
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  container.innerHTML = `
    <img src="${iconUrl}" alt="${desc}" />
    <div class="w-temp">${temp}°C</div>
    <div class="w-desc">${desc}</div>
    <div class="w-meta">Humidity: ${data.main.humidity}%</div>
    <div class="w-updated">Updated: ${new Date().toLocaleTimeString()}</div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const weatherContainer = document.getElementById("sin-weather");


  const city = "Singapore,SG";


  weatherContainer.innerHTML = '<div class="w-loading">Loading weather…</div>';

  try {
    const data = await getWeatherCached(city);
    renderWeather(data, weatherContainer);
 
    setInterval(async () => {
      try {
        const fresh = await fetchWeatherByCity(city);
        localStorage.setItem(`weather_${city.replace(/\s+/g,"_")}`, JSON.stringify({ data: fresh, ts: Date.now() }));
        renderWeather(fresh, weatherContainer);
      } catch (e) { /* ignore */ }
    }, 10 * 60 * 1000);
  } catch (err) {
    console.error(err);
    weatherContainer.innerHTML = '<div class="w-error">Weather unavailable</div>';
  }
});