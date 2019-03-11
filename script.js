let button  = document.querySelector('.button');

let getUserInput = ()=>{
    let inputValue = document.querySelector('.location').value;
    return inputValue;
}

let getUrl = (inputValue , isWeather)=>{
    let url;
    if(isWeather)
        url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=db1009179eb731b93dc7e9166280e38a`;
    else
        url = `https://api.giphy.com/v1/gifs/translate?api_key=9w3lwrwhQJLif1J4M0kKXnXTu4BFg1sX&s=${inputValue}`;
    return url;
}

let DisplayWeatherInfo = (response)=>{
    let weatherDescription = response.weather[0].description;
    let  temperature = response.main.temp;
    let descriptionElement = document.querySelector('.Description');
    //let tempElement = document.querySelector('.tempData');
    descriptionElement.innerHTML = `${weatherDescription}(${temperature} Celsius)`;
    //tempElement.innerHTML = `${temperature} Celsius`;
}

let DisplayRelatedImage = (response)=>{
    let img = document.querySelector('img');
    console.log(img);
    url = response.data.images.original.url;
    img.src = url;
}

let asyncAwait = async (Weatherurl)=>{
    let weatherResponse;
    let giphyResponse
    try{
        WeatherResponse = await fetch(Weatherurl , {mode:'cors'});
        WeatherResponse = await WeatherResponse.json();
        giphyUrl = getUrl(WeatherResponse.weather[0].description , 0);
        console.log(giphyUrl);
        giphyResponse = await fetch(giphyUrl , {mode:'cors'});
        giphyResponse = await giphyResponse.json();
        console.log(giphyResponse);
    }catch(error){
        alert(error);
    }
    DisplayWeatherInfo(WeatherResponse);
    DisplayRelatedImage(giphyResponse);
}

let getWeatherData = ()=>{
    inputValue = getUserInput();
    if(!inputValue){
        alert("Fill the Input");
        return;
    }
    weatherApiUrl = getUrl(inputValue , 1); 
    asyncAwait(weatherApiUrl).catch((error)=>console.log(error));
}

button.addEventListener('click' , getWeatherData);

//let url = `https://api.giphy.com/v1/gifs/translate?api_key=9w3lwrwhQJLif1J4M0kKXnXTu4BFg1sX&s=${userInput}`;

