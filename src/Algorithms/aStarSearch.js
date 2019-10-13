import {MinHeap} from './Helper/minHeap'

export function aStarSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false
    
    const visitedNodes = []

    
    startNode.generatedDistance = 0;
    startNode.hurestic = hurestics(startNode, finishNode, 'manhattan_distance')
    startNode.distance = startNode.hurestic;
    const minHeap = new MinHeap([])
    const openSet = new Set()
    minHeap.insert(startNode)
    openSet.add(startNode)
    while(!minHeap.isEmpty()){
        const currentNode = minHeap.extractMin()
        openSet.delete(currentNode)
        //if(currentNode.distance === Infinity) return visitedNodes
        if(currentNode.isWall) continue
        if(currentNode.isVisited) continue
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        if(currentNode === finishNode)
            return visitedNodes
        //updateNeighbours(grid, currentNode, finishNode, minHeap, openSet)
        const neighbours = getUnvisitedNeighbours(grid, currentNode)
        for(const neighbour of neighbours){
            const tentativeScore = currentNode.generatedDistance + 1
            if(tentativeScore < neighbour.generatedDistance){
                neighbour.previousNode = currentNode
                neighbour.generatedDistance = tentativeScore
                neighbour.hurestic = hurestics(neighbour, finishNode, 'manhattan_distance')
                neighbour.distance = neighbour.generatedDistance + neighbour.hurestic
                if(!openSet.has(neighbour)){
                    openSet.add(neighbour)
                    minHeap.insert(neighbour)
                }
            }
        }
    }
    return visitedNodes
}

function hurestics(node, targetNode, huresticFunction){
    if(huresticFunction === 'manhattan_distance'){
        return manhattanDistance(node, targetNode)
    }else if(huresticFunction === 'diagonal_distance'){
        return diagonalDistance(node, targetNode)
    }else{
        return euclideanDistance(node, targetNode)
    }
}

function manhattanDistance(node, targetNode){
    return Math.abs(node.row - targetNode.row) + Math.abs(node.col - targetNode.col)
}

function diagonalDistance(node, targetNode){
    return Math.max(Math.abs(node.row - targetNode.row), Math.abs(node.col - targetNode.col))
}

function euclideanDistance(node, targetNode){
    return Math.sqrt(Math.pow((node.row - targetNode.row), 2) + Math.pow((node.col - targetNode.col), 2))
}

function updateNeighbours(grid, node, targetNode, minHeap, openSet){
    const unvisitedNeighbours = getUnvisitedNeighbours(grid, node)
    for(let neighbour of unvisitedNeighbours){
        neighbour.generatedDistance = node.generatedDistance + 1
        neighbour.hurestic = hurestics(neighbour, targetNode, 'manhattan_distance')
        neighbour.distance = (neighbour.generatedDistance + neighbour.hurestic)
        neighbour.previousNode = node
        //if(!minHeap.isEmpty() && (minHeap.getMin()).hurestic < neighbour.hurestic) continue
        if(!openSet.has(neighbour))
            minHeap.insert(neighbour)
    }
}

function getUnvisitedNeighbours(grid, node){
    const neighbours = []
    const {row, col} = node

    if(row > 0) neighbours.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
   
    return neighbours.filter(neighbour => !neighbour.isVisited)
}

export function getAStarPath(finishNode){
    const aStarPath = []
    
    //if there is no path
    if(finishNode.previousNode === null)
        return aStarPath

    var currentNode = finishNode
    while(currentNode !== null){
        currentNode = { ...currentNode, isPath : true}
        aStarPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    }
    return aStarPath
}