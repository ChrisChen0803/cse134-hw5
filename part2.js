class CurrentWeather extends HTMLElement{
    constructor(){
        super();
        this.icon = document.createElement('img');
		this.icon.alt = 'icon';
        this.short = document.createElement('span');
        this.temp = document.createElement('span');
        this.unit = document.createElement('span');
        this.probabilityOfPrecipitation = document.createElement('p');
        this.relativeHumidity = document.createElement('p');
        this.wind = document.createElement('p');
        this.error = document.createElement('p');
        console.log("1");
    }
    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'closed' });
        const newElement = document.createElement('section');
        newElement.id="current-weather"
        newElement.appendChild(this.icon);
        newElement.appendChild(this.short);
        newElement.appendChild(this.temp);
        newElement.appendChild(this.unit);
        newElement.appendChild(this.probabilityOfPrecipitation);
        newElement.appendChild(this.relativeHumidity);
        newElement.appendChild(this.wind);
        newElement.appendChild(this.error);
        this.getWeather();
        shadow.appendChild(newElement);
        const style = document.createElement('style');
        style.innerHTML = `section {
            position:relative;
            left:30%;
            width:40%;
            background-color:white;
            color:black;
        }`;
        
        shadow.appendChild(style);
    }
    async getWeather(){
        try{
            //fetch from api, this link is found by https://api.weather.gov/points/32.8328,-117.2713 (these are longitude and latitude of lajolla)
            const res = await fetch(
				'https://api.weather.gov/gridpoints/SGX/53,20/forecast',{method: 'GET',}
			);
            //Find the data we need to use from the things we fetch
			var data = await res.json();
            data = data.properties.periods[0];
            console.log(data);
            this.short.innerHTML = ` `+data.shortForecast;
            this.temp.innerHTML = ` `+data.temperature;
            this.unit.innerHTML = ` `+data.temperatureUnit;
            this.icon.src = data.icon;
            this.probabilityOfPrecipitation.innerHTML = `Probability of Precipitation: ` + data.probabilityOfPrecipitation.value + `%`;
            this.relativeHumidity.innerHTML = `relativeHumidity: `+data.relativeHumidity.value + `%`;
            this.wind.innerHTML = `Wind: ` + data.windSpeed + `, ` + data.windDirection;
            console.log(data.icon);
        }
        catch(e){
            console.log(111);
            this.error.innerHTML = 'Cannot fetch data from api';
        }
    }
}
customElements.define('current-weather', CurrentWeather);