const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGhrbG9oYW5pIiwiYSI6ImNrcTVocXpsbzBia3kydm10d2xyZWM5YmEifQ.d6OZSmb1_Gm30la3_qoA6g&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) callback('unable to connect with internet...', undefined);
        else if (body.features.length === 0) callback('unable to find location,try another location...', undefined);
        else callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name,
        })
    })

}
module.exports = geocode