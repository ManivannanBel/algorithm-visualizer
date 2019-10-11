import {MinHeap} from './Helper/minHeap'

export function bestFirstSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false
    
    UpdateDistance(grid, finishNode)
    console.log(grid)

    const visitedNodesInOrder = []
    startNode.distance = 0
    const minHeap = new MinHeap([])
    minHeap.insert(startNode)
    while(!minHeap.isEmpty()){
        const currentNode = minHeap.extractMin()
        if(currentNode.isVisited) continue
        currentNode.isVisited = true
        visitedNodesInOrder.push(currentNode)
        if(currentNode === finishNode)
            return visitedNodesInOrder
        updateNeighbours(grid, currentNode, minHeap)
    }
    return visitedNodesInOrder
}

function updateNeighbours(grid, node, minHeap){
    const unvisitedNeighbours = getUnvisitedNeighbours(grid, node)
    for(let neighbour of unvisitedNeighbours){
        //neighbour.distance = node.distance + 1
        neighbour.previousNode = node
        minHeap.insert(neighbour)
    }
}

function getUnvisitedNeighbours(grid, node){
    const neighbours = []
    const {row, col} = node

    if(row > 0) neighbours.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(col < grid.length - 1) neighbours.push(grid[row][col + 1])

    return neighbours.filter(neighbour => !neighbour.isVisited)
}

function UpdateDistance (grid, finishNode){
    const {row, col} = finishNode
    for(let gridRow of grid){
        for(let node of gridRow){
            if(node.isFinish) continue
            const distanceFromTarget = Math.abs(node.row - row) + Math.abs(node.col - col)
            const newNode = {
                ...node,
                distance : distanceFromTarget
            }
            grid[node.row][node.col] = newNode
        }
    }
}

export function getGBFSPath(finishNode){
    const BFSPath = []
    
    //if there is no path
    if(finishNode.previousNode === null)
        return BFSPath

    var currentNode = finishNode
    while(currentNode !== null){
        BFSPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return BFSPath
}