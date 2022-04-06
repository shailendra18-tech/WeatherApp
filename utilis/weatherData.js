//calling the api to get the data from openweather website
const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    //constructing url
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) +'&units=metric'+ '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body}) =>{
        //returning error or data
        if(error){
            callback("Cant't fetch the data from open weather map api", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("unable to find required data, try for another place", undefined);
        } else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;