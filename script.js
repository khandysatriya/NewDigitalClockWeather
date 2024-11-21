function updateClockAndDate() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = now.toDateString();
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('date').textContent = date;
}

document.addEventListener('DOMContentLoaded', () => {
    updateClockAndDate();
    setInterval(updateClockAndDate, 1000);   
});

const apiKey = '547d32b37753a5593e4ae5a4337f7f08';
const weatherElement = document.getElementById('weather');
const citySelect = document.getElementById('city-select');

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { main, weather, sys, name } = data;
                const sunrise = new Date(sys.sunrise *1000).toLocaleTimeString();
                const sunset = new Date(sys.sunset *1000).toLocaleTimeString();
                
                weatherElement.innerHTML = `
                    <h3>Weather in ${name}</h3>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Condition: ${weather[0].description}</p>
                    <p>Sunrise: ${sunrise}</p>
                    <p>Sunset: ${sunset}</p>
                `;
            } else {
                weatherElement.innerHTML = `<p>Could not fetch data for ${city}.</p>`;
            }
        })
        .catch(error => {
            weatherElement.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            console.error(error);
        });
}

citySelect.addEventListener(`change`, () => {
    fetchWeather(citySelect.value);
});

fetchWeather(citySelect.value);

const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
weatherElement.innerHTML = `
    <h3>Weather in ${name}</h3>
    <img src="${weatherIcon}" alt="${weather[0].description}">
    <p>Temperatur: ${main.temp}°C</p>
    <p>Condition: ${weather[0].description}</p>
`;

setInterval(() => fetchWeather(citySelect.value), 10 * 60 * 1000);

const images = [
    'hot.jpg',
    'cold.jpg',
    'cloudy.jpg',
    'rainy.jpg'
];
let currentIndex = 0;


function changeBackground() {
    document.body.style.backgroundImage = 'url(${images[currentIndex]})';
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackgound, 3000);

changeBackground();