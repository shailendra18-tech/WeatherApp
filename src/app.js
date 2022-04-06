const express = require('express'); // require keyword is used to include express module
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../utilis/weatherData');

const port = process.env.PORT || 3000;  //whatever is in the environment variable PORT, or 3000 if there is nothing there

const publicStaticDirPath = path.join(__dirname,'../public') //gives the path starting from the system to public folder(foalder which contains static files like media, html, images etc)

const viewsPath = path.join(__dirname, '../templates/views'); // gives path of views

const partialsPath = path.join(__dirname, '../templates/partials');//gives path of partials 

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath)); 

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App'
    })//responsible for fetching the data 
})

app.get('/weather', (req,res) =>{
    const address = req.query.address //query is string after the ? in url
    if(!address){
        return res.send({
            error: "You must enter address in search text box"
        })
    }
    weatherData(address, (error, {temperature, description, cityName} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature, 
            description,
            cityName
        })
    })
})

app.get("*", (req,res) =>{
    res.render('404', {
        title: "page not found"
    })
})

app.listen(port, ()=>{
    console.log("Server is running on port", port);
})
