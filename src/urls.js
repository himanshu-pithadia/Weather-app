const countriesurl = 'https://countriesnow.space/api/v0.1/countries/iso';
const citiesurl = 'https://countriesnow.space/api/v0.1/countries/cities';
const latlonurl = (country,city)=>{
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=1b406323cee048d25d336edd789610e4`
}

const weatherurl = (lat,lon)=>{
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b406323cee048d25d336edd789610e4&units=metric`
}

export {countriesurl,citiesurl,latlonurl,weatherurl}