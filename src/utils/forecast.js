const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=cb864547bc664295871151715212006&q=' + latitude + ',' + longitude + '&aqi=no';

    request({ url, json: true }, (error, { body }) => {
        if (error) callback('unable to connect with internet...', undefined);
        else if (body.error) callback('Unable to find location', undefined)
        else callback(undefined, `${body.current.condition.text}. it's currently ${body.current.temp_c} degrees but feels like ${body.current.feelslike_c} degrees out and Humidity is ${body.current.humidity} `)
    })
}

module.exports = forecast