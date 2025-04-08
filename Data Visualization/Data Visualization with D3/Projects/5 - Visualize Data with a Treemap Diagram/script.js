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
