import {MinHeap} from './Helper/minHeap'

export function aStarSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false

    let openSet = []
    const closedSet = new Set()

    const visitedNodes = []

    startNode.gCost = 0
    startNode.distance = 0
    openSet.push(startNode)
    
    while(openSet.length !== 0){
        let currentNode = openSet.shift()
        for(let i = 0; i < openSet.length; i++){
            if(openSet[i].distance < currentNode.distance || openSet[i].distance === currentNode.distance){
                if(openSet[i].hurestic < currentNode.hurestic){
                    currentNode = openSet[i]
                }
            }
        }
        //currentNode.isVisited = true
        visitedNodes.push(currentNode)
        openSet = openSet.filter(node => node !== currentNode)
        closedSet.add(currentNode)

        if(currentNode === finishNode){
            return visitedNodes
        }

        const neighbours = getUnvisitedNeighbours(grid, currentNode)
        for(const neighbour of neighbours){
            if(neighbour.isWall || closedSet.has(neighbour)){
                continue
            }

            const tentativeCost = currentNode.gCost + 1
            if(tentativeCost < neighbour.gCost || !openSet.includes(neighbour)){
                neighbour.gCost = tentativeCost
                neighbour.hurestic = hurestics(currentNode, finishNode, 'manhattan_distance')
                neighbour.distance = neighbour.gCost + neighbour.hurestic
                neighbour.previousNode = currentNode

                if(!openSet.includes(neighbour)){
                    openSet.push(neighbour)
                }
            }

        }

    }
    
}

function getDistance(node, target){
    return manhattanDistance(node, target)
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

function getAllNodes(grid){
    const nodes = []
    for(let row of grid){
        for(let node of row){
            nodes.push(node)
        }
    }
    return nodes
}