// Stores the url of the JSON file and creates a new request
let url ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
let req = new XMLHttpRequest()

//Variables to store the data and the required values
let data
let values = []

//stores scales for transformations 
let heightScale
let widthScale
let xScale
let xAxisScale
let yAxisScale

//Sets the size of the canvas
let width = 850
let height = 650
let padding = 50


let svg = d3.select("svg")

//creates the canvas
let drawCanvas = () => {
    svg.attr("width", width)
    svg.attr("height", height)
}

let generateScales = () => {
    heightScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    
}

let drawBars = () => {

}

let generateAxis = () => {

}

req.open("GET", url, true)
req.onload = () => {
    data = JSON.parse(req.response) //converts and stores the response
    values = data.data //extracts and stores the data array
    console.log(values)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxis()
}
req.send()
