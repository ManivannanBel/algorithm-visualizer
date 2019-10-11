export class MinHeap {
    
        constructor(elements) {
           this.heapNode = [];
           console.log(this.heapNode)
           for(let element of elements){
               
               this.insert(element)
           }
         }

         getLeftChildIndex = parentIndex => {
           return parentIndex * 2 + 1;
         };

         getRightChildIndex = parentIndex => {
           return parentIndex * 2 + 2;
         };

         getParentIndex = childIndex => {
           // if(childIndex === 0) return - 1
           return Math.floor((childIndex - 1) / 2);
         };

         hasLeftChild = parentIndex => {
           return this.getLeftChildIndex(parentIndex) < this.heapNode.length;
         };

         hasRightChild = parentIndex => {
           return this.getRightChildIndex(parentIndex) < this.heapNode.length;
         };

         hasParent = childIndex => {
           return this.getParentIndex(childIndex) >= 0;
         };

         getLeftChildData = parentIndex => {
           return this.heapNode[this.getLeftChildIndex(parentIndex)];
         };

         getRightChildData = parentIndex => {
           return this.heapNode[this.getRightChildIndex(parentIndex)];
         };

         getParentData = childIndex => {
           return this.heapNode[this.getParentIndex(childIndex)];
         };

         extractMin = () => {
            
           if(this.heapNode.length === 1){
               return this.heapNode.shift();
           }
           if (this.heapNode.length !== 0) {
             //console.log(this.heapNode.slice())
             const minValue = this.heapNode.shift();
             const lastValue = this.heapNode.pop();
             this.heapNode.unshift(lastValue);
             this.heapifyDown();
             return minValue;
           }
         };

         getMin = () => {
           if (this.heapNode.length !== 0) {
             return this.heapNode[0];
           }
         };

         insert = node => {
           this.heapNode.push(node);
          // console.log(this.heapNode)
           //console.log(node)
           this.heapifyUp();
         };

         heapifyDown = () => {
           let index = 0
           while(this.hasLeftChild(index)){
               let smallerChildIndex = this.getLeftChildIndex(index)
               if(this.hasRightChild(index) && this.getLeftChildData(index).distance > this.getRightChildData(index).distance){
                   smallerChildIndex = this.getRightChildIndex(index)
               }

               let currentData =Object.assign(this.heapNode[index])
               let smallestChildData = Object.assign(this.heapNode[smallerChildIndex])

               if(currentData.distance < smallestChildData.distance){
                    break;
               }else{
                    this.heapNode[smallerChildIndex] = currentData
                    this.heapNode[index] = smallestChildData
               }
               index = smallerChildIndex
           }
         };

         heapifyUp = () => {
           let currentIndex = this.heapNode.length - 1;
           while (this.hasParent(currentIndex)) {
             let parentIndex = this.getParentIndex(currentIndex);
             //let parent = Object.assign(this.getParentData(currentIndex));
             //let current = Object.assign(this.heapNode[currentIndex]);
             
             //console.log('parent= '+parentIndex +" child= "+ currentIndex)

             let parent = (this.heapNode[parentIndex]);
             let current = (this.heapNode[currentIndex]);
             //console.log('parentI= '+parentIndex +" childI= "+ currentIndex)
             //console.log('parent= '+(parent) +" child= "+(current))
             if (current.distance < parent.distance) {
               this.heapNode[parentIndex] = current;
               this.heapNode[currentIndex] = parent;
               currentIndex = parentIndex;
             } else {
               break;
             }
           }
         };

         isEmpty = () => {
            return this.heapNode.length === 0
         }
}
