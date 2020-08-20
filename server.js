const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const fetch = require("node-fetch")


const app = express()


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))


//variables de uso interno de la app

var temperatura = ""
var descr = ""
var iconWeather = ""
var mensaje = ""
var ciudad = ""


app.get("/", (req, res) => {
    res.render("index", {
        temp: temperatura,
        description: descr,
        icon: iconWeather,
        mensaje: mensaje,
        city: ciudad
    })
})

app.post("/", async(req, res) => {
    let dataCity = req.body.dataInput
    ciudad = dataCity
    let api = 'http://api.openweathermap.org/data/2.5/weather?q=' + dataCity + '&units=metric&appid=c65cc7e9d91e73d27b992770f36e4d57'
    try {
        mensaje = ""
        await fetch(api)
            .then(res => res.json())
            .then(data => {
                temperatura = data.main.temp + "°"
                descr = data.weather[0].description
                iconWeather = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'

            })
    } catch {
        mensaje = "Something went wrong, try it again!"
        temperatura = ""
        descr = ""
        iconWeather = ""
    }
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, () => { console.log("server runnig ok on port 3000") })