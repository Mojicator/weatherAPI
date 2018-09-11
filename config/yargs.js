const argv = require('yargs').options({
        direccion: {
            alias: 'd',
            desc: 'Direccion de la ciudad para obtener el clima',
            demand: true
        },
        unidad: {
            alias: 'u',
            desc: 'Unidad en la que se mostrara el clima. k|K : kelvin, c|C : metrico, f|F : imperial, defecto : imperial'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}