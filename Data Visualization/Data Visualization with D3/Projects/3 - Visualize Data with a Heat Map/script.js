let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
let req = new XMLHttpRequest

let baseTemp
let values = []

let minYear
let maxYear

let xScale 
let yScale

let width = 1400
let height = 800
let padding = 50

let svg = d3.select("#canvas")
svg.attr("width", width)
svg.attr("height", height)

let legend = d3.select("#legend")
    legend.attr("width", width)
    legend.attr("height", 250)

let generateScales = () =>{
    xScale = d3.scaleLinear()
        .range([padding, width - padding+1])
        .domain([minYear = d3.min(values, d => d.year), maxYear = d3.max(values, d => d.year) + 1])

    yScale = d3.scaleTime()
        .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
        .range([padding, height - padding])
    }

let drawMap = () => {
    svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("class","cell")
        .attr("fill", (d) => {
            variance = d["variance"]
                if (variance <= -2) {
                    return "blue"
                }else if(variance <= -1){
                    return "lightBlue"
                }else if(variance <= 0){
                    return "beige"
                }else if(variance <= 1){
                    return "orange"
                }else{
                    return "red"
                }
            
        })
        .attr("data-year", (d) => d["year"])
        .attr("data-month", (d) => d["month"]-1)
        .attr("data-temp", (d) => d["variance"])
        .attr("height", (height-2*padding) / 12)
        .attr("width", ((width - 2*padding) / (maxYear- minYear)))
        .attr("y", d => yScale(new Date(0, d["month"] - 1, 0, 0, 0, 0, 0)))
        .attr("x", d => xScale(d["year"]))
        
}

let drawAxes = () => {
    let xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"))

    svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0, " + (height - padding) +")")
        .attr("id", "x-axis")
    
    let yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat("%B"))

    svg.append("g")
        .call(yAxis)
        .attr("transform", "translate("+ padding + ",0)")
        .attr("id", "y-axis")
}

req.open("GET", url, true)
req.onload = () => {
    let data = JSON.parse(req.responseText)
    baseTemp = data.baseTemperature
    values = data["monthlyVariance"]
    generateScales()
    drawMap()
    drawAxes()
}
req.send()
