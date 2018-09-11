const axios = require('axios');

//Google API
const apiKeyGoogle = 'AIzaSyChu7_zPzxvPdwqZ1nBckvU92ozgGMTbmU';
//Openweathermap API
const apiKeyWeather = '5b9ee2befecb778a58894c14e18ae9d0';

let getLatLng = async(address) => {
    let encodedUrl = encodeURI(address);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=${apiKeyGoogle}`);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No hay informacion de la ciudad ${address}`);
    }
    //console.log(resp.status);
    //console.log(JSON.stringify(resp.data.results.formatted_address, undefined, 2));
    let location = resp.data.results[0];
    let coords = location.geometry.location;
    let formattedAddress = location.formatted_address;
    //console.log(formattedAddress, coords.lat, coords.lng);

    return {
        formatted_address: formattedAddress,
        lat: coords.lat,
        lng: coords.lng
    }
}

let getWeather = async(lat, lng, unit) => {
    let resp = '';
    let unidad = '';
    switch (unit) {
        case 'f':
        case 'F':
            unidad = 'imperial';
            break;
        case 'c':
        case 'C':
            unidad = 'metric';
            break;
        case 'k':
        case 'K':
            unidad = 'kelvin';
            break;
        default:
            unidad = 'kelvin';
            break;
    }
    //console.log(unidad);
    if (unidad !== 'kelvin') {
        resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${unidad}&appid=${apiKeyWeather}`);
    } else {
        resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKeyWeather}`);
    }
    return resp.data.main.temp;
}

module.exports = {
    getLatLng,
    getWeather
}