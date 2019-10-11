
export class MinHeap{
    constructor(elements){
        this.heapNode = []
    }

    getLeftChildIndex = (parentIndex) => {
        return (parentIndex * 2) + 1
    }

    getRightChildIndex = (parentIndex) => {
        return (parentIndex * 2) + 2
    }

    getParentIndex = (childIndex) => {
        return (childIndex - 1) / 2
    }

    getLeftChildData = (parentIndex) => {
        return this.heapNode[this.getLeftChildIndex(parentIndex)]
    }

    getRightChildData = (parentIndex) => {
        return this.heapNode[this.getLeftRightIndex(parentIndex)]
    }

    getParentData = (childIndex) => {
        return this.heapNode[this.getParentIndex(childIndex)]
    }

    extractMin = () => {
        if(this.heapNode.length !== 0){
            const minValue = this.heapNode.shift
            const lastValue = this.heapNode.pop()
            this.heapNode.unshift(lastValue)
            this.heapifyDown(0)
        }
    }

    peek = () => {
        if(this.heapNode.length !== 0){
            return this.heapNode[0]
        }
    }

    insert = (node) => {
        this.heapNode.push(node)
        this.heapifyUp(this.heapNode.length - 1)
    }

    heapifyDown = (index) => {

    }

    heapifyUp = (index) => {

    }
} 