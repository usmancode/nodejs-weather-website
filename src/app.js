const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const port = process.env.PORT || 3001


//setup path for express directory
const dir_path = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(dir_path))


//setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        devloper: 'Usman Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        devloper: 'Usman Khan'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        devloper: 'Usman Khan'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Address not provided"
        })
    }

    geocode(req.query.address, (error, { location, longitude, latitude } = {}) => {
        if (error) {
            return res.send({ error })

        }
        forecast(longitude, latitude, (error, { temprature, weather_descriptions, feelslike, observation_time } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                observation_time: observation_time,
                weather_descriptions: weather_descriptions,
                temprature: temprature,
                feelslike: feelslike




            })
            // console.log(location) 
            // console.log("observation_time: "+observation_time)
            // console.log(weather_descriptions+', Temprature:'+temprature+' FeelsLike:'+feelslike)

        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send("search is not provided")
    }
    console.log(req.query)
    const query = req.query
    res.send(query)

})




// console.log(dir_path)
// app.get('',(req,res)=>{
// res.send("<h1>hello this is home page</h1>")

// })
// const dir_path_help=path.join(__dirname,'../public','help.html')
// console.log(dir_path_help)
// app.use(express.static(dir_path_help))

// app.get('/help',(req,res)=>{

//     res.send({
//         name:"usman",
//         age:25,
//         address:"Deoria"
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>this is a about page</h1>")
// })
app.get('/help/*', (req, res) => {
    res.render('error', {
        error: "404 content not avilable",
        devloper: 'Usman Khan'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        error: "404 Page not found",
        devloper: 'Usman Khan'
    })
})

app.listen(port, () => {

    console.log("server is running on port " + port)
})