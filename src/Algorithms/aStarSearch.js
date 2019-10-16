import {MinHeap} from './Helper/minHeap'
import Heap from 'heap'

export function aStarSearch(grid, startNode, finishNode){

    if(!startNode || !finishNode || startNode === finishNode)
        return false

    let openList = new Heap(function(nodeA, nodeB) {
        return nodeA.fCost - nodeB.fCost;
    })

    const visitedNodes = []
    
    const openSet = new Set()
    const closedSet = new Set()

    startNode.fCost = 0
    startNode.gCost = 0

    openList.push(startNode)
    openSet.add(startNode)

    while(!openList.empty()){

        const currentNode = openList.pop()
        openSet.delete(currentNode)
        closedSet.add(currentNode)

        visitedNodes.push(currentNode)

        if(currentNode === finishNode){
            return visitedNodes
        }

        const neighbours = getNeighbours(grid, currentNode)
        for(let i = 0, l = neighbours.length; i < l ; ++i){
            const neighbour = neighbours[i]
            
            if(closedSet.has(neighbour))
                continue
            
            let ng = currentNode.gCost + getDistance(currentNode, neighbour)

            if(!openSet.has(neighbour) || ng < neighbour.gCost){
                neighbour.gCost = ng
                neighbour.hCost = hurestics(currentNode, neighbour, 'manhattan_distance')
                neighbour.fCost = neighbour.gCost + neighbour.hCost
                neighbour.previousNode = currentNode

                if(!openSet.has(neighbour)){
                    openList.push(neighbour)
                    openSet.add(neighbour)
                }else{
                    openList.updateItem(neighbour)
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


function getNeighbours(grid, node){
    const neighbours = []
    const {row, col} = node

    if(row > 0) neighbours.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
    
    return neighbours.filter(neighbour => !neighbour.isWall)
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