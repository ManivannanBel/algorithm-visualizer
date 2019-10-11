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
           if (this.heapNode.length !== 0) {
             const minValue = this.heapNode.shift;
             const lastValue = this.heapNode.pop();
             this.heapNode.unshift(lastValue);
             this.heapifyDown(0);
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
           this.heapifyUp(this.heapNode.length - 1);
         };

         heapifyDown = index => {
           let parentIndex = index;
           //let parent = Object.assign(this.heapNode[parentIndex]);

           let parent = (this.heapNode[parentIndex]);

           while (this.hasLeftChild(parentIndex)) {
             let leftIndex = this.getLeftChildIndex(parentIndex);
             let rightIndex = leftIndex;
             if (this.hasRightChild(parentIndex)) {
               rightIndex = this.getRightChildIndex(parentIndex);
             }

             //let leftChild = Object.assign(this.getLeftChildData(leftIndex));
             //let rightChild = Object.assign(this.getRightChildData(rightIndex));

             let leftChild = (this.getLeftChildData(leftIndex));
             let rightChild = (this.getRightChildData(rightIndex));


             if (parent.distance > leftChild.distance) {
               this.heapNode[leftIndex] = parent;
               this.heapNode[parentIndex] = leftChild;
               parentIndex = leftIndex;
             } else if (parent.distance > rightChild.distance) {
               this.heapNode[rightIndex] = parent;
               this.heapNode[parentIndex] = rightChild;
               parentIndex = rightIndex;
             } else {
               break;
             }
           }
         };

         heapifyUp = index => {
           let currentIndex = index;
           while (this.hasParent(currentIndex)) {
             let parentIndex = this.getParentIndex(currentIndex);
             //let parent = Object.assign(this.getParentData(currentIndex));
             //let current = Object.assign(this.heapNode[currentIndex]);
             
             //console.log('parent= '+parentIndex +" child= "+ currentIndex)

             let parent = (this.heapNode[parentIndex]);
             let current = (this.heapNode[currentIndex]);

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
