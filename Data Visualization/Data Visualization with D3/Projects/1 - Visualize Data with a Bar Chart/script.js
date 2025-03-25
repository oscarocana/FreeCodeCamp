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
        .domain([0, d3.max(values, d => d[1])])
        .range([0,height - 2*padding])

    xScale = d3.scaleLinear()
        .domain([0, values.length - 1])
        .range([padding, width - padding])

    let dateArray = values.map((d) => new Date(d[0]))
    
    xAxisScale = d3.scaleTime()
        .domain([d3.min(dateArray), d3.max(dateArray)])
        .range([padding, width - padding])
    
    yAxisScale =d3.scaleLinear()
        .domain([0, d3.max(values, d => d[1])])
        .range([height - padding, padding])
    
}

let drawBars = () => {

    let tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("opacity","0")


    svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width",((width-2*padding) / values.length))
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("height", (d) => heightScale(d[1]))
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => height - heightScale(d[1]) - padding)
    .on("mouseover", d => {
        
        tooltip.attr("data-date",d[0])
        
        tooltip.transition()
        .style("opacity", "0.8")
        .style("left", (d3.event.pageX) + "px")

        tooltip.html(d[0]+"<br />"+"$"+d[1]+ " Billion")
        
        
    })

    .on("mouseout", d => {
        tooltip.transition()
        .style("opacity","0")
    
    })

}

let generateAxis = () => {

    let xAxis = d3.axisBottom(xAxisScale)
    let yAxis = d3.axisLeft(yAxisScale)
       
    svg.append("g")
        .call(xAxis)
        .attr("id", "x-axis")
        .attr("transform", "translate(0, "+ (height-padding) + ")")
    
        svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis")
        .attr("transform", "translate( " + padding +", 0)")
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
