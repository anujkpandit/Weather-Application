// API KEY
const API_KEY = "0b4c995c904cc61691dd699ff5a75706";
// // DOM ELEMENTS 
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("getWeather");
const weatherInfo = document.getElementById("weatherData");

// GRAB FUNCTION TRIGGER
searchButton.addEventListener("click", getWeatherData);

// GET WEATHER DATA
async function getWeatherData(){
    const city = cityInput.value.trim();
    if(!city){
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        if(data.cod === "404"){
            weatherInfo.innerHTML = "Cannot find city";
            return;
        }

        weatherInfo.innerHTML = `
            <div class="weather-data">
                <h2>The weather in ${data.name}: </h2>
                <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}"></p>
                <p><strong>Temperature: </strong>${data.main.temp} °C</p>
                <p><strong>Weather:</strong>${data.weather[0].description}</p>
                <p><strong>Humidity:</strong>${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong>${data.wind.speed} m/s</p>
            </div>
        `;
        
    } catch (error) {
        console.error("Error fetching weather data:",error);

        weatherInfo.innerHTML = "An error occured while fetching weather data, please try again";
    };
};
