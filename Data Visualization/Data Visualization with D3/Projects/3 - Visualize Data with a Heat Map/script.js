let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
let req = new XMLHttpRequest

let baseTemp
let values = []

let xScale 
let yScale

let width = 800
let height = 800
let padding = 50

let svg = d3.select("#canvas")
svg.attr("width", width)
svg.attr("height", height)

let generateScales = () =>{
    xScale = d3.scaleLinear()
        .range([padding, width - padding])

    yScale = d3.scaleTime()
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
                    return "paleYellow"
                }else if(variance <= 1){
                    return "orange"
                }else{
                    return "red"
                }
            
        })
}

let drawAxes = () => {
    let xAxis = d3.axisBottom(xScale)
    svg.append("g")
        .call(xAxis)
        .attr("transform", "translate(0, " + (height - padding) +")")
        .attr("id", "x-axis")
    
    let yAxis = d3.axisLeft(yScale)
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
