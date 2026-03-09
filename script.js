const apiKey = "7594fffceba605cceba8713cb8fe1314"; 

async function getWeather() {
    const cityInput = document.getElementById("city");
    const resultDiv = document.getElementById("weatherResult");
    const city = cityInput.value;

    if (!city) {
        alert("Enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {

            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

            resultDiv.innerHTML = `
                <div class="weather-info">
                    <img src="${iconUrl}" alt="Weather Icon">
                    <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
                    <h2 class="city-name">${data.name}</h2>
                    <div class="details">
                        <div>
                            <p>Humidity</p>
                            <p><strong>${data.main.humidity}%</strong></p>
                        </div>
                        <div>
                            <p>Condition</p>
                            <p style="text-transform: capitalize;"><strong>${data.weather[0].description}</strong></p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: #ff4d4d;">City not found. Try again!</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: #ff4d4d;">Network Error. Check connection.</p>`;
    }
}

document.getElementById("city").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});