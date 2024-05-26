document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    fetchWeather(document.getElementById('cityInput').value);
});

document.getElementById('unitSwitch').addEventListener('change', function () {
    toggleTemperatureUnits();
});

document.getElementById('currentLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            fetchWeather(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeather(city) {
    
    const url = 'https://c4b94c14171e48f89f0347d2ae5c09bf.api.mockbin.io/'

    fetch(url)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            updateWeatherUI(null, 'Could not fetch weather data.');
        });
}

function updateWeatherUI(data, error = '') {
    const weatherResult = document.getElementById('weatherResult');
    if (error) {
        weatherResult.innerHTML = `<p>${error}</p>`;
    } else if (data && data.location) {
        const iconUrl = 'https:' + data.current.condition.icon;
        weatherResult.innerHTML = `
            <h2>${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
            <img class="weather-icon" src="${iconUrl}" alt="Weather icon" />
            <h3 class="info">${data.current.condition.text}</h3>
            <p id="tempC", class="temperature">${data.current.temp_c} °C</p>
            <p id="tempF", class = "temperature", style="display:none">${data.current.temp_f} °F</p>
            <p class="info">Wind Speed: ${data.current.wind_kph} km/h</p>
            <p class="info">Humidity: ${data.current.humidity}%</p>
            <p class = "info">UV Index: ${data.current.uv}</p>
            <p class = "info">Last Updated: ${data.current.last_updated}</p>
        `;
        document.querySelector('.options').style.display = 'block';
    } else {
        weatherResult.innerHTML = '<p>City not found. Please try another search.</p>';
    }
}

function toggleTemperatureUnits() {
    const tempC = document.getElementById('tempC');
    const tempF = document.getElementById('tempF');
    if (tempC.style.display === 'none') {
        tempC.style.display = 'block';
        tempF.style.display = 'none';
    } else {
        tempC.style.display = 'none';
        tempF.style.display = 'block';
    }
}
