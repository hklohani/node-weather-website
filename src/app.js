const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //change views to template,then we have to add this line and next one
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location  //dynamic directery
app.set('view engine', 'hbs'); //hbs handlebar by default it'll look up for views folder.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    //setup static directery to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Created by Himanshu',
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Created by Himanshu',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Himanshu',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = { /*this is default value */ }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: req.query.address,
                address: location,
                forecast: forecastData,
            })
        })

    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Created by Himanshu',
        errorMessage: 'Page Not Found ',
    })
})

app.listen(3000, () => {
    console.log('server is running at port 3000')
})