let VideoGameDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let VideoGameData 

let canvas = d3.select("#canvas")
let tooltip

let drawTreeMap = () => {

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
