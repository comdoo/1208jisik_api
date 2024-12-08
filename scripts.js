const apiKey = '576a63ff0ce5460bab350212241410';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherInfo(data);
        } else {
            alert('도시를 찾을 수 없습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        alert('날씨 정보를 가져오는데 실패했습니다.');
    }
}

function updateWeatherInfo(data) {
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temp.textContent = `${data.current.temp_c}°C`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    condition.textContent = data.current.condition.text;
    feelsLike.textContent = `${data.current.feelslike_c}°C`;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        getWeatherData(cityInput.value);
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        getWeatherData(cityInput.value);
    }
});

// 페이지 로드시 서울의 날씨 표시
window.addEventListener('load', () => {
    getWeatherData('Seoul');
});
