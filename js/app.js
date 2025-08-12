const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')

const updateUI = (data) =>{

    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-3">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>`

    imgSrc =null;
    if (weather.IsDayTime) {
        imgSrc = './img/DAY.jpg'
    }
    else {
        imgSrc = './img/NIGHT IMG.jpg'
    }
    time.setAttribute('src' , imgSrc);
}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
         cityDets,
         weather,
    };
};

form.addEventListener ('submit', (e)=>{
    e.preventDefault();
    // City means Input / Name = 'city'
    const city = form.city.value.trim();
    form.reset();

    updateCity(city)
    .then((data)=>{
        updateUI(data); 
    })
    .catch((err)=>{
        console.log('Error');
    });
});