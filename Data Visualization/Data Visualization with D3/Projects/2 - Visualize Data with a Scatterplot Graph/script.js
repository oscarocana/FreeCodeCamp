let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
let req = new XMLHttpRequest()

let values = []

//stores scales for transformations 

let xScale
let yScale


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
    xScale = d3.scaleLinear()
        .range([padding, width - padding])
        .domain([d3.min(values, d => d["Year"]),d3.max(values, d => d["Year"])])
    
    yScale = d3.scaleTime()
        .range([padding, height - padding])
        .domain([d3.min(values, d => new Date(d["Seconds"]*1000)),
        d3.max(values, d => new Date(d["Seconds"]*1000))])
}

let drawDataPoint = () => {

    svg.selectAll("circle")
        .data(values)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("data-xvalue", d => d["Year"])
        .attr("data-yvalue", d => new Date(d["Seconds"] * 1000))
        .attr("cx", d => xScale(d["Year"]))
        .attr("cy", d => yScale(new Date(d["Seconds"] * 1000)))
}

let generateAxis = () => {
    
    let xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d'))

    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + (height - padding)+")")
    
    let yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat("%M:%S"))

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate(" + padding + ",0)")
}

req.open("GET", url, true)
req.onload = () => {
    values = JSON.parse(req.response) //converts and stores the response
    //values = data.data //extracts and stores the data array
    console.log(values)
    drawCanvas()
    generateScales()
    drawDataPoint()
    generateAxis()
}
req.send()
