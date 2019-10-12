import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getShortestPath} from '../Algorithms/dijkstra'
import {depthFirstSearch, getDFSPath} from '../Algorithms/depthFirstSearch'
import {breadthFristSearch, getBFSPath} from '../Algorithms/breadthFirstSearch'
import {bestFirstSearch, getGBFSPath} from '../Algorithms/bestFirstSearch'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './VisualizerComponent.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const START_POS_ROW = 10
const START_POS_COL = 5
const FINISH_POS_ROW = 10
const FINISH_POS_COL = 45

export class VisualizerComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             grid : [],
             mousePressed : false,
             mousePointerEvents : 'auto'
        }
        
        //Refs for all the nodes
        this.nodeRef = []
    }

      handleMouseDown = (row, col) => {
        //if(this.state.algorithmRunning) return
        if(!this.state.grid[row][col].isWall){
          const newGrid = this.buildWall(row, col)
          this.setState({grid : newGrid, mousePressed : true})
        }else{
          const newGrid = this.removeWall(row, col)
          this.setState({grid : newGrid})
        }
      }

      handleMouseEnter = (row, col) => {
        //if(this.state.algorithmRunning) return
        if(this.state.mousePressed){
          if(!this.state.grid[row][col].isWall){
            const newGrid = this.buildWall(row, col)
            this.setState({grid : newGrid, mousePressed : true})
          }else{
            const newGrid = this.removeWall(row, col)
            this.setState({grid : newGrid})
          }
        }
      }
    
      handleMouseUp = () => {
        this.setState({mousePressed : false})
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
        //distanceFromTarget : (Math.abs(row - FINISH_POS_ROW) + Math.abs(col - FINISH_POS_COL)),
        previousNode : null ,
        isVisited : false,
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
      console.log(this.state.grid)
    }

    resetStartNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        previousNode: null,
        distance : Infinity
      }
      grid[row][col] = newNode
      this.nodeRef[node.row][node.col].current.toggleStart();
    }

    resetFinishNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        previousNode: null,
        distance : Infinity
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
          previousNode: null,
          isWall : true,
          distance : Infinity
        }
        grid[row][col] = newNode
      }
    }

    resetVisitedNode = (row, col, grid, node) => {
      const newNode = {
        ...node,
        isPath: false,
        isVisited: false,
        previousNode: null,
        isWall : false,
        distance : Infinity
      }

      grid[row][col] = newNode
      this.nodeRef[node.row][node.col].current.toggleReset();
    }

    animateDijkstra = (visitedNodeInOrder, shortestPath) => {
        const grid = this.state.grid
        for(let i = 0; i < visitedNodeInOrder.length; i++){
            grid[visitedNodeInOrder[i].row][visitedNodeInOrder[i].col] = visitedNodeInOrder[i]
            if(i === visitedNodeInOrder.length - 1){
              setTimeout(() => {
                this.printShortestPath(shortestPath, grid)
              }, 10 * i)
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i]
                this.nodeRef[node.row][node.col].current.toggleVisited();
            }, 10 * i)
        }
    }

    printShortestPath = (shortestPath, grid) => {
      for(let i = 0; i < shortestPath.length; i++){
        setTimeout(() => {
          const node = shortestPath[i]
          grid[node.row][node.col] = node
          this.nodeRef[node.row][node.col].current.togglePath();
          if(i == shortestPath.length - 1){
            this.setState({grid : grid})
            setTimeout(() => {
              this.setState({mousePointerEvents : 'auto'})
            }, 30 * i+1);
          }
        }, 30 * i)
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
        const shortestPath = getShortestPath(finishNode)
        this.animateDijkstra(visitedNodeInOrder, shortestPath)
      }, 500);
        
    }

    animateDepthFirstSearch = (visitedNodeInOrder, DFSPath) => {
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(DFSPath)
          }, i * 30)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * 30)
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
          const DFSPath = getDFSPath(finishNode)
          this.animateDepthFirstSearch(visitedNodeInOrder, DFSPath)  
        },500)

         
    }

    animateBreadthFirstSearch = (visitedNodeInOrder, DFSPath) => {
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(DFSPath)
          }, i * 30)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * 30)
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
        //console.log(visitedNodeInOrder)
        const BFSPath = getBFSPath(finishNode)
        this.animateBreadthFirstSearch(visitedNodeInOrder, BFSPath)
      }, 500)
      
    }

    animateBestFirstSearch = (visitedNodeInOrder, GBFSPath) => {
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(GBFSPath)
          }, i * 30)
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * 30)
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
        //console.log(visitedNodeInOrder)
        const GBFSPath = getGBFSPath(finishNode)
        //console.log(GBFSPath)
        this.animateBestFirstSearch(visitedNodeInOrder, GBFSPath)
      }, 500)
        
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
            <NavDropdown.Item href="" onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.visualizeDepthFirstSearch()}>Visualize Depth Fisrt Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.visualizeBreadthFirstSearch()}>Visualize Breadth Fisrt Search</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => this.visualizeBestFirstSearch()}>Visualize Best Fisrt Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => this.clearVisitedNode(true)} style={{ pointerEvents : this.state.mousePointerEvents }}>clear board</Nav.Link>
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