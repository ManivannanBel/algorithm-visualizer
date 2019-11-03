import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getShortestPath} from '../Algorithms/dijkstra'
import {depthFirstSearch, getDFSPath} from '../Algorithms/depthFirstSearch'
import {breadthFristSearch, getBFSPath} from '../Algorithms/breadthFirstSearch'
import {bestFirstSearch, getGBFSPath} from '../Algorithms/bestFirstSearch'
import { aStarSearch, getAStarPath } from "../Algorithms/aStarSearch"
import { bidirectionalSearch, getBidirectionalShortestPath } from "../Algorithms/bidirectionalSearch";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './VisualizerComponent.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const START_POS_ROW = 10
const START_POS_COL = 7
const FINISH_POS_ROW = 11
const FINISH_POS_COL = 45 
const SLOW_SPEED = 60
const MEDIUM_SPEED = 30
const FAST_SPEED = 15

export class VisualizerComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             grid : [],
             mousePressed : false,
             mousePointerEvents : 'auto',
             selectedAlgorithm : '', 
             speed : 'medium',
             animationSpeed : 20
        }
        
        //Refs for all the nodes
        this.nodeRef = []
    }

      handleMouseClick = (row, col) => {
        if(!this.state.grid[row][col].isWall){
          const newGrid = this.buildWall(row, col)
          this.setState({grid : newGrid})
        }else{
          const newGrid = this.removeWall(row, col)
          this.setState({grid : newGrid})
        }
      }

      handleMouseDown = (row, col) => {
        console.log('mouse down')
        //if(this.state.algorithmRunning) return
        if(this.state.grid[row][col].isStart || this.state.grid[row][col].isFinish)
          return 
        if(!this.state.grid[row][col].isWall){
          const newGrid = this.buildWall(row, col)
          this.tempGrid = newGrid
          this.mousePressed = true
          this.nodeRef[row][col].current.toggleWall()
          //this.setState({/*grid : newGrid,*/ mousePressed : true})
        }else{
          const newGrid = this.removeWall(row, col)
          this.tempGrid = newGrid
          this.nodeRef[row][col].current.toggleReset()
          //this.setState({grid : newGrid})
        }
      }

      handleMouseEnter = (row, col) => {
        console.log('mouse enter')
        //if(this.state.algorithmRunning) return
        if(this.state.grid[row][col].isStart || this.state.grid[row][col].isFinish)
          return 
        if(this.mousePressed){
          if(!this.state.grid[row][col].isWall){
            const newGrid = this.buildWall(row, col)
            this.tempGrid = newGrid
            this.nodeRef[row][col].current.toggleWall()
            //this.setState({grid : newGrid})
          }else{
            /*const newGrid = this.removeWall(row, col)
            this.tempGrid = newGrid
            this.nodeRef[row][col].current.toggleReset()*/
            //this.setState({grid : newGrid})
          }
        }
      }
    
      handleMouseUp = () => {
        console.log('mouse up')
        this.mousePressed = false
        this.setState({grid : this.tempGrid/*, mousePressed : false*/})
      }

      buildWall = (row, col) => {
        const newGrid = this.state.grid
        const node = newGrid[row][col]
        const newNode = {
          ...node,
          isWall : true
        }
        newGrid[row][col] = newNode
        return newGrid
      }

      removeWall = (row, col) => {
        const newGrid = this.state.grid
        const node = newGrid[row][col]
        const newNode = {
          ...node,
          isWall : false
        }
        newGrid[row][col] = newNode
        return newGrid
      }

    componentDidMount() {
        const grid = []
        
        for(let row = 0 ; row < 20 ; row++){
            const columnRow = []
            const rowRef = []
            for(let column = 0 ; column < 50 ; column++){
                columnRow.push(this.createNode(row, column))
                rowRef.push(React.createRef())      
            }
            this.nodeRef.push(rowRef)
            grid.push(columnRow)
        }
        this.setState({grid : grid})
        //console.log(grid)
    }

    createNode = (row, col) => {
        const newNode = {
        row,
        col,
        isStart : row === START_POS_ROW && col === START_POS_COL,
        isFinish : row ===  FINISH_POS_ROW && col === FINISH_POS_COL,
        distance : Infinity,
        hCost : null,
        gCost : null,
        fCost : null,
        previousNode : null ,
        nextNode : null,
        isVisited : false,
        isVisitedFromOther : false,
        isWall : false,
        isPath : false
        }
        return newNode
    }

    clearVisitedNode = (removeWall) => {
      const newGrid = this.state.grid
      for(const row of newGrid){
        for(const node of row){
          const {row, col} = node
          if(node.isStart){
            this.resetStartNode(row, col, newGrid, node)  
          }else if(node.isFinish){
            this.resetFinishNode(row, col, newGrid, node)
          }else if(node.isWall){
            this.resetWallNode(row, col, newGrid, node, removeWall)
          }else{
            this.resetVisitedNode(row, col, newGrid, node)            
          } 
        }
      }
      this.setState({grid : newGrid})
      //console.log(this.state.grid)
    }

    resetStartNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        isVisitedFromOther : false,
        previousNode: null,
        nextNode : null,
        distance : Infinity,
        hCost : null,
        gCost : null,
        fCost : null,
      }
      grid[row][col] = newNode
      this.nodeRef[node.row][node.col].current.toggleStart();
    }

    resetFinishNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        isVisitedFromOther : false,
        previousNode: null,
        nextNode : null,
        distance : Infinity,
        hCost : null,
        gCost : null,
        fCost : null,
      }
      grid[row][col] = newNode
      this.nodeRef[node.row][node.col].current.toggleFinish();
    }

    resetWallNode = (row, col, grid, node, removeWall) => {
      if(removeWall){
        this.resetVisitedNode(row, col, grid, node)
      }else{
        const newNode = {
          ...node,
          isPath: false,
          isVisited: false,
          isVisitedFromOther : false,
          previousNode: null,
          nextNode : null,
          isWall : true,
          distance : Infinity,
          hCost : null,
        gCost : null,
        fCost : null,
        }
        grid[row][col] = newNode
      }
    }

    resetVisitedNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        isVisitedFromOther : false,
        previousNode: null,
        nextNode : null,
        isWall : false,
        distance : Infinity,
        hCost : null,
        gCost : null,
        fCost : null,
      }

      grid[row][col] = newNode
      this.nodeRef[node.row][node.col].current.toggleReset();
    }

    animateDijkstra = (visitedNodeInOrder, shortestPath) => {
        const grid = this.state.grid
        const {animationSpeed} = this.state
        for(let i = 0; i < visitedNodeInOrder.length; i++){
            grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
            if(i === visitedNodeInOrder.length - 1){
              setTimeout(() => {
                this.printShortestPath(shortestPath, grid)
              }, animationSpeed * i)
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i]
                this.nodeRef[node.row][node.col].current.toggleVisited();
            }, animationSpeed * i)
        }
    }

    printShortestPath = (shortestPath, grid) => {
      const {animationSpeed} = this.state
      if(shortestPath.length === 0){
        setTimeout(() => {
          this.setState({mousePointerEvents : 'auto'})
        }, animationSpeed)
        return
      }
      for(let i = 0; i < shortestPath.length; i++){
        setTimeout(() => {
          const node = shortestPath[i]
          //console.log(grid[node.row][node.col])
          grid[node.row][node.col] = node
          this.nodeRef[node.row][node.col].current.togglePath();
          if(i === shortestPath.length - 1){
            this.setState({grid : grid})
            setTimeout(() => {
              this.setState({mousePointerEvents : 'auto'})
            }, animationSpeed * i+1);
          }
        }, animationSpeed * i)
      }
      //console.log(this.state.algorithmRunning)
    }

    visualizeDijkstra = () => {
      //console.log(this.state.algorithmRunning)
      this.setState({mousePointerEvents : 'none'})
      //console.log(this.state.algorithmRunning)
      this.clearVisitedNode(false)

      setTimeout(() => {
        const {grid} = this.state
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        const visitedNodeInOrder = dijkstra(grid.slice(), startNode, finishNode)
        if(!visitedNodeInOrder) return
        const shortestPath = getShortestPath(finishNode)
        this.animateDijkstra(visitedNodeInOrder, shortestPath)
      }, 500);
        
    }

    animateDepthFirstSearch = (visitedNodeInOrder, DFSPath) => {
      const grid = this.state.grid
      const {animationSpeed} = this.state
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(DFSPath, grid)
          }, i * animationSpeed)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * animationSpeed)
      }
    }

    visualizeDepthFirstSearch = () => {
        this.setState({mousePointerEvents : 'none'})
        this.clearVisitedNode(false)

        setTimeout(()=>{
          const {grid} = this.state
          //console.log(grid)
          const startNode = grid[START_POS_ROW][START_POS_COL]
          const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
          //console.log(JSON.stringify(startNode)+" "+JSON.stringify(finishNode))
          const visitedNodeInOrder = depthFirstSearch(grid.slice(), startNode, finishNode)
          if(!visitedNodeInOrder) return
          const DFSPath = getDFSPath(finishNode)
          this.animateDepthFirstSearch(visitedNodeInOrder, DFSPath)  
        },500)    
    }

    animateBreadthFirstSearch = (visitedNodeInOrder, DFSPath) => {
      const grid = this.state.grid
      const {animationSpeed} = this.state
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(DFSPath, grid)
          }, i * animationSpeed)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * animationSpeed)
      }
    }


    visualizeBreadthFirstSearch = () => {
      this.setState({mousePointerEvents : 'none'})
      this.clearVisitedNode(false)

      setTimeout(() => {
        const {grid} = this.state
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        console.log(grid)
        const visitedNodeInOrder = breadthFristSearch(grid.slice(), startNode, finishNode)
        if(!visitedNodeInOrder) return
        //console.log(visitedNodeInOrder)
        const BFSPath = getBFSPath(finishNode)
        this.animateBreadthFirstSearch(visitedNodeInOrder, BFSPath)
      }, 500)
      
    }

    animateBestFirstSearch = (visitedNodeInOrder, GBFSPath) => {
      const grid = this.state.grid
      const {animationSpeed} = this.state
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(GBFSPath, grid)
          }, i * animationSpeed)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * animationSpeed)
      }
    }

    visualizeBestFirstSearch = () => {
      this.setState({mousePointerEvents : 'none'})
      this.clearVisitedNode(false)
      setTimeout(() => {
        const {grid} = this.state
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        //console.log(grid)
        const visitedNodeInOrder = bestFirstSearch(grid.slice(), startNode, finishNode)
        if(!visitedNodeInOrder) return
        //console.log(visitedNodeInOrder)
        const GBFSPath = getGBFSPath(finishNode)
        //console.log(GBFSPath)
        this.animateBestFirstSearch(visitedNodeInOrder, GBFSPath)
      }, 500)   
    }

    animateAStarSearch = (visitedNodeInOrder, AStarPath) => {
      const grid = this.state.grid
      const {animationSpeed} = this.state
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(AStarPath, grid)
          }, i * animationSpeed/1.5)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * animationSpeed/1.5)
      }
    }

    visualizeAStarSearch = () => {
      this.setState({mousePointerEvents : 'none'})
      this.clearVisitedNode(false)
      setTimeout(() => {
        const {grid} = this.state
        console.log(grid)
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        //console.log(grid)
        const visitedNodeInOrder = aStarSearch(grid.slice(), startNode, finishNode)
        if(!visitedNodeInOrder) return
        console.log(visitedNodeInOrder)
        const AStarPath = getAStarPath(finishNode)
        //console.log(GBFSPath)
        this.animateAStarSearch(visitedNodeInOrder, AStarPath)
      }, 500)
        
    }

    animateBidirectionalSearch = (visitedNodeInOrder, GBFSPath) => {
      const grid = this.state.grid
      const {animationSpeed} = this.state
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(GBFSPath, grid)
          }, i * animationSpeed/1.5)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * animationSpeed/1.5)
      }
    }

    visualizeBidirectionalSearch = () => {
      this.setState({mousePointerEvents : 'none'})
      this.clearVisitedNode(false)
      setTimeout(() => {
        const {grid} = this.state
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        //console.log(grid)
        const visitedNodeInOrder = bidirectionalSearch(grid.slice(), startNode, finishNode)
        //console.log(visitedNodeInOrder.pop())
        if(!visitedNodeInOrder) return
        console.log(visitedNodeInOrder.length)
        const middle1 = visitedNodeInOrder[visitedNodeInOrder.length - 1]
        const path = getBidirectionalShortestPath(middle1, finishNode)
        //console.log(middle1)
        console.log(path)
        this.animateBidirectionalSearch(visitedNodeInOrder, path)
      }, 500)   
    }

    visualizeSelectedAlgorithm = () => {
      const {selectedAlgorithm} = this.state;
      console.log(selectedAlgorithm)
      switch(selectedAlgorithm){
        case "Dijkstra Algorithm":
          this.visualizeDijkstra();
          break;
        case "Depth first search":
          this.visualizeDepthFirstSearch();
          break;
        case "Breadth frist search":
          this.visualizeBreadthFirstSearch();
          break;
        case "Greedy Best first search":
          this.visualizeBestFirstSearch();
          break;
        case "A* search":
          this.visualizeAStarSearch();
          break;
        case "Bidirectional BFS":
          this.visualizeBidirectionalSearch();
          break;
        default:
          window.alert("select an algorithm!");
      }

    }

    selectAlgorithm = (algorithm) => {
      //console.log(algorithm)
      this.setState({selectedAlgorithm : algorithm})
      //console.log(this.state.selectedAlgorithm)
    }

    selectSpeed = (speed) => {
      switch(speed){
        case "slow":
          this.setState({animationSpeed : SLOW_SPEED, speed : speed})
          break;
        case "medium":
          this.setState({animationSpeed : MEDIUM_SPEED, speed : speed})
          break;
        case "fast":
          this.setState({animationSpeed : FAST_SPEED, speed : speed})
          break;
      }
    }

    
    render() {
        const grid = this.state.grid
        //console.log(grid)
        //Building the grid with table and table data as Node component

        

        return (
          <div className='container-fluid'>
            <div>
            <Navbar bg="light">
            <Navbar.Brand href="#">Algorithm Visualizer</Navbar.Brand>
            <NavDropdown title="Select Algorithm" id="basic-nav-dropdown" style={{ pointerEvents : this.state.mousePointerEvents }}>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("Dijkstra Algorithm")}>Visualize Dijkstra</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("Depth first search")}>Visualize Depth Fisrt Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("Breadth frist search")}>Visualize Breadth Fisrt Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("Greedy Best first search")}>Visualize Best Fisrt Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("A* search")}>Visualize A* Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.selectAlgorithm("Bidirectional BFS")}>Visualize Bidirectional Search (BFS)</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => this.clearVisitedNode(true)} style={{ pointerEvents : this.state.mousePointerEvents }}>clear board</Nav.Link>
            <Nav.Link className="btn btn-danger" onClick={() => this.visualizeSelectedAlgorithm()} style={{ pointerEvents : this.state.mousePointerEvents }}>Visualize {this.state.selectedAlgorithm}</Nav.Link>
            <NavDropdown title={`Speed ${this.state.speed}`} style={{ pointerEvents : this.state.mousePointerEvents }}>
              <NavDropdown.Item onClick={() => this.selectSpeed("slow")}>slow</NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.selectSpeed("medium")}>medium</NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.selectSpeed("fast")}>fast</NavDropdown.Item>
            </NavDropdown>
            </Navbar>
            </div>
            <div className="grid" style={{ pointerEvents : this.state.mousePointerEvents }}>
              <table>
                <tbody>
                  {grid.map((row, rowId) => {
                    return (
                      <tr className="tr-height" key={rowId}>
                        {row.map((column, columnId) => (
                          <td key={columnId}>
                            <Node
                              row = {column.row}
                              col = {column.col}
                              isStart={column.isStart}
                              isFinish={column.isFinish}
                              isWall={column.isWall}
                              isPath={column.isPath}
                              isVisited={column.isVisited}
                              onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                              onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                              onMouseUp={() => this.handleMouseUp()}
                              
                              ref={this.nodeRef[column.row][column.col]}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}

export default VisualizerComponent
