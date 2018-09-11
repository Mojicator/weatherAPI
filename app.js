const argv = require('./config/yargs').argv;
const axios = require('./config/axios');

//console.log(argv.direccion);

let getInfo = async(direccion) => {

    try {
        let coords = await axios.getLatLng(direccion);
        let weather = await axios.getWeather(coords.lat, coords.lng, argv.unidad);

        return {
            country: coords.formatted_address,
            lat: coords.lat,
            lng: coords.lng,
            weather
        }
    } catch (error) {
        return `${error}. No se pudo obtener el clima de ${direccion}`;
    }

}

getInfo(argv.direccion)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));