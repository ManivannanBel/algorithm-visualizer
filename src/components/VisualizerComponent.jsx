import React, { Component } from 'react'
import Node from './Node/Node'
import {dijkstra, getShortestPath} from '../Algorithms/dijkstra'
import {depthFirstSearch, getDFSPath} from '../Algorithms/depthFirstSearch'

import './VisualizerComponent.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const START_POS_ROW = 10
const START_POS_COL = 5
const FINISH_POS_ROW = 10
const FINISH_POS_COL = 49

export class VisualizerComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             grid : [],
             mousePressed : false
        }

        //Refs for all the nodes
        this.nodeRef = []
    }

      handleMouseDown = (row, col) => {
        if(!this.state.grid[row][col].isWall){
          const newGrid = this.buildWall(row, col)
          this.setState({grid : newGrid, mousePressed : true})
        }else{
          const newGrid = this.removeWall(row, col)
          this.setState({grid : newGrid})
        }
      }

      handleMouseEnter = (row, col) => {
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
    }

    createNode = (row, col) => {
        const newNode = {
        row,
        col,
        isStart : row === START_POS_ROW && col === START_POS_COL,
        isFinish : row ===  FINISH_POS_ROW && col === FINISH_POS_COL,
        distance : Infinity,
        previousNode : null ,
        isVisited : false,
        isWall : false,
        isPath : false
        }
        return newNode
    }

    animateDijkstra = (visitedNodeInOrder, shortestPath) => {
        
        for(let i = 0; i < visitedNodeInOrder.length; i++){
            if(i === visitedNodeInOrder.length - 1){
              setTimeout(() => {
                this.printShortestPath(shortestPath)
              }, 10 * i)
            }
            setTimeout(() => {
                const node = visitedNodeInOrder[i]
                this.nodeRef[node.row][node.col].current.toggleVisited();
            }, 10 * i)
        }
    }

    printShortestPath = (shortestPath) => {
      for(let i = 0; i < shortestPath.length; i++){
        setTimeout(() => {
          const node = shortestPath[i]
          this.nodeRef[node.row][node.col].current.togglePath();
        }, 30 * i)
      }
    }

    visualizeDijkstra = () => {
        const {grid} = this.state
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        const visitedNodeInOrder = dijkstra(grid.slice(), startNode, finishNode)
        const shortestPath = getShortestPath(finishNode)
        this.animateDijkstra(visitedNodeInOrder, shortestPath)
    }

    animateDepthFirstSearch = (visitedNodeInOrder, DFSPath) => {
      for(let i = 0; i < visitedNodeInOrder.length; i++){
        if(i === visitedNodeInOrder.length - 1){
          setTimeout(() => {
            this.printShortestPath(DFSPath)
          }, i * 30)
          break
        }
        setTimeout(() => {
          const node = visitedNodeInOrder[i]
          this.nodeRef[node.row][node.col].current.toggleVisited()
        }, i * 30)
      }
    }

    visualizeDepthFirstSearch = () => {
        const grid = this.state.grid
        //console.log(grid)
        const startNode = grid[START_POS_ROW][START_POS_COL]
        const finishNode = grid[FINISH_POS_ROW][FINISH_POS_COL]
        //console.log(JSON.stringify(startNode)+" "+JSON.stringify(finishNode))
        const visitedNodeInOrder = depthFirstSearch(grid, startNode, finishNode)
        const DFSPath = getDFSPath(finishNode)
        this.animateDepthFirstSearch(visitedNodeInOrder, DFSPath)
        
    }

    
    render() {
        const grid = this.state.grid

        //Building the grid with table and table data as Node component
        return (
          <div>
            <button onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra
            </button>
            <button onClick={() => this.visualizeDepthFirstSearch()}>
              Visualize Depth Fisrt Search
            </button>
            <div className="grid">
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
