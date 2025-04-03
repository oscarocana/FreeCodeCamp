let countyURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let educationLevelURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

let canvas = d3.select("#canvas")
let tooltip = d3.select("#tooltip")

let countyData
let educationData

let drawMap = () => {

    canvas.selectAll("path")
        .data(countyData)
        .enter()
        .append("path")
        .attr("d", d3.geoPath())
        .attr("class","county")
        .attr("fill", (d) => {
            let id = d["id"]
            let county = educationData.find((d) => {
                return d.fips === id
            })
            let percentage = county["bachelorsOrHigher"]
            if (percentage <= 10){
                return "red"
            }else if (percentage <= 20){
                return "orange"
            }else if (percentage <= 30){
                return "yellow"
            }else if (percentage <= 40){
                return "green"
            }else{
                return"darkgreen"
            }
        })
        .attr("data-fips", (d) => d["id"])
        .attr("data-education", (d) => { 
            let id = d["id"]
            let county = educationData.find((d) => {
                return d.fips === id
            })
            let percentage = county["bachelorsOrHigher"]
            return percentage

        })

        .on("mouseover", d=> {
            tooltip.transition()
            .style("opacity", "0.8")
            let id = d["id"]
            let county = educationData.find((d) => {
                return d.fips === id
            })

            tooltip.text(county["fips"])
            .attr("data-education", )
        })

        .on("mouseout", d=> {
            tooltip.transition()
            .style("opacity", "0")
        })
    }
    
d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            countyData = topojson.feature(data, data.objects.counties).features
            console.log(countyData)

            d3.json(educationLevelURL).then(
                (data,error) => {
                    if(error){
                        console.log(error)
                    }else{
                        educationData = data
                        console.log(educationData)
                        drawMap()
                    }
                }
            )
        }
    }
)

