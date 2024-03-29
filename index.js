//fetching the crypto info
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
    .then((res) => {
        if (!res.ok) {
            // this will trigger the .catch() to run is status is not ok
            throw Error('this is an error');
        }
        return res.json();
    })
    .then((data) => {
        displayCrypto(data);
        console.log(data);
    })
    .catch((err) => {
        // Handle Error, change background, change text, ect.

        const crypto = document.querySelector('.crypto');
        crypto.textContent = 'Not available at this time';

        console.log(err);
    });

function displayCrypto(data) {
    const cryptoDiv = document.querySelector('.crypto');
    const nameContainer = document.querySelector('.name-container');

    const cryptoImage = document.createElement('img');
    cryptoImage.src = data.image.small;
    cryptoImage.className = 'crypto-image';

    const cryptoName = document.createElement('h3');
    cryptoName.textContent = data.name;
    cryptoName.className = 'crypto-name';

    nameContainer.appendChild(cryptoImage);
    nameContainer.appendChild(cryptoName);

    //current
    const currentMarketPrice = document.createElement('p');
    currentMarketPrice.className = 'current-market-price';
    currentMarketPrice.textContent = `Current: $${data.market_data.current_price.usd}`;

    //low
    const lowMarketPrice = document.createElement('p');
    lowMarketPrice.className = 'low-market-price';
    lowMarketPrice.textContent = `24hr low: $${data.market_data.low_24h.usd}`;

    //high
    const highMarketPrice = document.createElement('p');
    highMarketPrice.className = 'high-market-price';
    highMarketPrice.textContent = `24hr high: $${data.market_data.high_24h.usd}`;

    cryptoDiv.appendChild(currentMarketPrice);
    cryptoDiv.appendChild(lowMarketPrice);
    cryptoDiv.appendChild(highMarketPrice);
}

function getCurrentTime() {
    const currentTime = document.querySelector('.current-time');

    const time = new Date().toLocaleTimeString(undefined, {
        timeStyle: 'short',
    });

    currentTime.textContent = time;
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`
    )
        .then((res) => {
            if (!res.ok) {
                throw Error('weather data not available');
            }
            return res.json();
        })

        .then((data) => {
            console.log(data);
            displayWeather(data);
        })
        .catch((err) => console.log(err));
});

function displayWeather(data) {
    const weatherContainer = document.querySelector('.weather');
    const tempContainer = document.querySelector('.temp-container');

    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon';
    weatherIcon.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const currentTemp = document.createElement('p');
    currentTemp.className = 'current-temp';
    currentTemp.textContent = `${Math.floor(data.main.temp)} °F`;

    tempContainer.appendChild(weatherIcon);
    tempContainer.appendChild(currentTemp);

    const currentCity = document.createElement('p');
    currentCity.className = 'current-city';
    currentCity.textContent = data.name;

    weatherContainer.appendChild(currentCity);
}
