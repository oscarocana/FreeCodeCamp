let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let educationLevelURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let canvas = d3.select("#canvas")

let countyData = topojson.feature(d3.json(countyURL), d3.json(countyURL).objects.counties)
let educationData = d3.json(educationLevelURL)

let drawMap = () => {
}

console.log(countyData)
