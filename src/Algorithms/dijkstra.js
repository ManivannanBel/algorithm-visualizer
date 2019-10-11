import {MinHeap} from './Helper/minHeap'

export function dijkstra(grid, startNode, finishNode) {
    
    if(!startNode || !finishNode || startNode === finishNode)
        return false

    const visitedNodeOrder = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)

    const heap = new MinHeap(unvisitedNodes)
    
    //console.log('min '+JSON.stringify(heap.getMin()))

    while (/*unvisitedNodes.length !== 0*/!heap.isEmpty()) {
        //sortUnvistedNodesByDistance(unvisitedNodes)
        //const closestNode = unvisitedNodes.shift()
        
        const closestNode = heap.extractMin()
        console.log(closestNode)
        closestNode.isVisited = true;
        //If the node is wall then ignore it
        if(closestNode.isWall) continue
        //If the start node is fully surrounded by wall
        if(closestNode.distance === Infinity) return visitedNodeOrder
        //If the node is visited then add it to the visited list
        visitedNodeOrder.push(closestNode)
        //If target node is found
        if(closestNode === finishNode){
            return visitedNodeOrder
        }
        //Update the distance and parent of the neighbouring nodes
        updateUnvisitedNeighbours(closestNode, grid)
    }
}

function sortUnvistedNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbours(node, grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid)
    for(const neighbour of unvisitedNeighbours){
        neighbour.distance = node.distance + 1
        neighbour.previousNode = node
    }
}

function getUnvisitedNeighbours(node, grid){
    const  neighbours = []
    const {row, col} = node
    if(row > 0) neighbours.push(grid[row - 1][col])
    if(col > 0) neighbours.push(grid[row][col - 1])
    if(row < grid.length - 1) neighbours.push(grid[row + 1][col])
    if(col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
    return neighbours.filter((neighbour) => (neighbour.isVisited === false))
    /*console.log(neighbours.map((node) => console.log('['+node.row+" "+node.col+']'+' '+node.isVisited))+'neighbors of '+ node.row +" "+ node.col +"= ")
    return neighbours*/
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

export function getShortestPath(finishNode){
    const shortestPath = []
     
    //if there is no path
     if(finishNode.previousNode === null)
        return shortestPath

    var currentNode = finishNode
    while(currentNode != null){
        currentNode = { ...currentNode, isPath : true}
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode
    }
    return shortestPath
}