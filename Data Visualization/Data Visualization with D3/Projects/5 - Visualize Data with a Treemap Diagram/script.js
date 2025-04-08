let VideoGameDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let VideoGameData 

let canvas = d3.select("#canvas")
let tooltip

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(VideoGameData, (node) => {
        return node.children
    }).sum((node) => {
        return node.value
    }).sort((node1, node2) => {
        return node2.value - node1.value
    })

    let createTreeMap = d3.treemap()
                        .size([1000,1000])

    createTreeMap(hierarchy)

    let leaves = hierarchy.leaves()
    console.log(hierarchy.leaves())

    let tile = canvas.selectAll("g")
        .data(leaves)
        .enter()
        .append("g")

    tile.append("rect")
        .attr("class","tile")
        .attr("fill",(d) => {
            let category = d["data"]["category"]
            if(category==="Wii"){
                return "#8B8B8B"
            }else if(category==="NES"){
                return "red"
            }else if(category==="GB"){
                return "#8A2BE2"
            }else if(category==="DS"){
                return "#FFD700"
            }else if(category==="X360"){
                "#A2C837"
            }else if(category==="PS3"){
                return "#686868"
            }else if(category==="PS2"){
                return "#003087"
            }else if(category==="SNES"){
                return "#800080"
            }else if(category==="GBA"){
                return "#8A2BE2"
            }else if(category==="PS4"){
                return "#1C1C1C"
            }else if(category==="3DS"){
                return "#FF4500"
            }else if(category==="N64"){
                return "#000080"
            }else if(category==="PS"){
                return "#808080"
            }else if(category==="XB"){
                return "#107C10"
            }else if(category==="PC"){
                return "#4682B4"
            }else if(category==="PSP"){
                return "#2F4F4F"
            }else{
                return "#52B043"
            }
        })
}

d3.json(VideoGameDataUrl).then(
        (data, error) => {
            if (error) {
                console.log(error);
        }else{
            VideoGameData = data
            console.log(VideoGameData)
            drawTreeMap()
            
        }
    }
)
