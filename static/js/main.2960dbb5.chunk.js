(this["webpackJsonpalgorithm-visualizer"]=this["webpackJsonpalgorithm-visualizer"]||[]).push([[0],{53:function(e,t,r){e.exports=r(87)},58:function(e,t,r){},59:function(e,t,r){},60:function(e,t,r){},64:function(e,t,r){},87:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),o=r(12),a=r.n(o),s=(r(58),r(59),r(9)),l=r(20),c=r(27),u=r(31),h=r(28),f=r(32),d=(r(60),function(e){function t(e){var r;return Object(l.a)(this,t),(r=Object(u.a)(this,Object(h.a)(t).call(this,e))).toggleVisited=function(){r.ref.current.className="node visited-node"},r.togglePath=function(){r.ref.current.className="node path-node"},r.toggleReset=function(){r.ref.current.className="node "},r.toggleStart=function(){r.ref.current.className="node start-node"},r.toggleFinish=function(){r.ref.current.className="node finish-node"},r.toggleWall=function(){r.ref.current.className="node wall-node"},r.state={extraclassName:""},r.ref=i.a.createRef(),r}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.row,r=e.col,n=e.isStart,o=e.isFinish,a=e.isVisited,s=e.isWall,l=e.isPath,c=e.onMouseDown,u=e.onMouseEnter,h=e.onMouseUp,f=l?"path-node":n?"start-node":o?"finish-node":s?"wall-node":a?"visited-node":"";return i.a.createElement("div",{ref:this.ref,"data-toggle":"tooltip","data-placement":"top",title:"".concat(t," ").concat(r),id:"node-".concat(t,"-").concat(r),className:"node ".concat(f),onMouseDown:function(){return c(t,r)},onMouseEnter:function(){return u(t,r)},onMouseUp:function(){return h()}})}}]),t}(n.Component)),g=function e(t){var r=this;Object(l.a)(this,e),this.getLeftChildIndex=function(e){return 2*e+1},this.getRightChildIndex=function(e){return 2*e+2},this.getParentIndex=function(e){return Math.floor((e-1)/2)},this.hasLeftChild=function(e){return r.getLeftChildIndex(e)<r.heapNode.length},this.hasRightChild=function(e){return r.getRightChildIndex(e)<r.heapNode.length},this.hasParent=function(e){return r.getParentIndex(e)>=0},this.getLeftChildData=function(e){return r.heapNode[r.getLeftChildIndex(e)]},this.getRightChildData=function(e){return r.heapNode[r.getRightChildIndex(e)]},this.getParentData=function(e){return r.heapNode[r.getParentIndex(e)]},this.extractMin=function(){if(1===r.heapNode.length)return r.heapNode.shift();if(0!==r.heapNode.length){var e=r.heapNode.shift(),t=r.heapNode.pop();return r.heapNode.unshift(t),r.heapifyDown(),e}},this.getMin=function(){if(0!==r.heapNode.length)return r.heapNode[0]},this.insert=function(e){r.heapNode.push(e),r.heapifyUp()},this.heapifyDown=function(){for(var e=0;r.hasLeftChild(e);){var t=r.getLeftChildIndex(e);r.hasRightChild(e)&&r.getLeftChildData(e).distance>r.getRightChildData(e).distance&&(t=r.getRightChildIndex(e));var n=r.heapNode[e],i=r.heapNode[t];if(n.distance<i.distance)break;r.heapNode[t]=n,r.heapNode[e]=i,e=t}},this.heapifyUp=function(){for(var e=r.heapNode.length-1;r.hasParent(e);){var t=r.getParentIndex(e),n=r.heapNode[t],i=r.heapNode[e];if(!(i.distance<n.distance))break;r.heapNode[t]=i,r.heapNode[e]=n,e=t}},this.isEmpty=function(){return 0===r.heapNode.length},this.heapNode=[];var n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var c=a.value;this.insert(c)}}catch(u){i=!0,o=u}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}};function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}new g([]);function m(e,t,r){if(!t||!r||t===r)return!1;var n=[];t.distance=0;for(var i=function(e){var t=[],r=!0,n=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(r=(o=a.next()).done);r=!0){var s=o.value,l=!0,c=!1,u=void 0;try{for(var h,f=s[Symbol.iterator]();!(l=(h=f.next()).done);l=!0){var d=h.value;t.push(d)}}catch(g){c=!0,u=g}finally{try{l||null==f.return||f.return()}finally{if(c)throw u}}}}catch(g){n=!0,i=g}finally{try{r||null==a.return||a.return()}finally{if(n)throw i}}return t}(e);0!==i.length;){y(i);var o=i.shift();if(console.log(o),o.distance===1/0)return n;if(!o.isVisited&&(o.isVisited=!0,!o.isWall)){if(n.push(o),o===r)return n;b(o,e)}}}function y(e){e.sort((function(e,t){return e.distance-t.distance}))}function b(e,t){var r=function(e,t){var r=[],n=e.row,i=e.col;n>0&&r.push(t[n-1][i]);n<t.length-1&&r.push(t[n+1][i]);i>0&&r.push(t[n][i-1]);i<t[0].length-1&&r.push(t[n][i+1]);return r.filter((function(e){return!1===e.isVisited}))}(e,t),n=!0,i=!1,o=void 0;try{for(var a,s=r[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value;l.distance=e.distance+1,l.previousNode=e}}catch(c){i=!0,o=c}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}}function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=!1;function P(e,t){var r=[],n=t.row,i=t.col;return O?(n>0&&r.push(e[n-1][i]),n<e.length-1&&r.push(e[n+1][i]),i>0&&r.push(e[n][i-1]),i<e[0].length-1?r.push(e[n][i+1]):O=!1):(i>0&&r.push(e[n][i-1]),i<e[0].length-1&&r.push(e[n][i+1]),n>0&&r.push(e[n-1][i]),n<e.length-1?r.push(e[n+1][i]):O=!0),r.filter((function(e){return!e.isVisited}))}function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function E(e,t){var r=[],n=t.row,i=t.col;return n>0&&r.push(e[n-1][i]),n<e.length-1&&r.push(e[n+1][i]),i>0&&r.push(e[n][i-1]),i<e[0].length-1&&r.push(e[n][i+1]),r.filter((function(e){return!e.isVisited}))}function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function V(e,t,r){if(!t||!r||t===r)return!1;!function(e,t){var r=t.row,n=t.col,i=!0,o=!1,a=void 0;try{for(var s,l=e[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var c=s.value,u=!0,h=!1,f=void 0;try{for(var d,g=c[Symbol.iterator]();!(u=(d=g.next()).done);u=!0){var p=d.value,v=Math.abs(p.row-r)+Math.abs(p.col-n);e[p.row][p.col].distance=v}}catch(m){h=!0,f=m}finally{try{u||null==g.return||g.return()}finally{if(h)throw f}}}}catch(m){o=!0,a=m}finally{try{i||null==l.return||l.return()}finally{if(o)throw a}}}(e,r);var n=[],i=new g([]);for(i.insert(t);!i.isEmpty();){var o=i.extractMin();if(!o.isWall&&!o.isVisited){if(o.isVisited=!0,n.push(o),o===r)return n;D(e,o,i)}}return n}function D(e,t,r){var n=function(e,t){var r=[],n=t.row,i=t.col;n>0&&r.push(e[n-1][i]);n<e.length-1&&r.push(e[n+1][i]);i>0&&r.push(e[n][i-1]);i<e[0].length-1&&r.push(e[n][i+1]);return r.filter((function(e){return!e.isVisited}))}(e,t),i=!0,o=!1,a=void 0;try{for(var s,l=n[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var c=s.value;c.previousNode=t,r.insert(c)}}catch(u){o=!0,a=u}finally{try{i||null==l.return||l.return()}finally{if(o)throw a}}}r(61);function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function M(e,t,r){return"manhattan_distance"===r?x(e,t):"diagonal_distance"===r?function(e,t){return Math.max(Math.abs(e.row-t.row),Math.abs(e.col-t.col))}(e,t):function(e,t){return Math.sqrt(Math.pow(e.row-t.row,2)+Math.pow(e.col-t.col,2))}(e,t)}function x(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)}function B(e,t){var r=[],n=t.row,i=t.col;return n>0&&r.push(e[n-1][i]),n<e.length-1&&r.push(e[n+1][i]),i>0&&r.push(e[n][i-1]),i<e[0].length-1&&r.push(e[n][i+1]),r.filter((function(e){return!e.isWall}))}function R(e,t,r){var n=[],i=t.row,o=t.col;return i>0&&n.push(e[i-1][o]),i<e.length-1&&n.push(e[i+1][o]),o>0&&n.push(e[i][o-1]),o<e[0].length-1&&n.push(e[i][o+1]),"from_start"===r?n.filter((function(e){return!e.isVisited&&!e.isWall})):n.filter((function(e){return!e.isVisitedFromOther&&!e.isWall}))}function I(e,t,r,n,i,o,a){var s=[];return function e(t,r,n,i,o,a,s,l){if(r>n||i>o)return;if(s){for(var c=0;c<t.length;c++)for(var u=0;u<t[0].length;u++)if(0===c||0===u||c===t.length-1||u===t[0].length-1){var h=t[c][u];if(h.isStart||h.isFinish)continue;h.isWall=!0,l.push(h)}s=!1}if("horizontal"===a){for(var f=[],d=r;d<=n;d+=2)f.push(d);for(var g=[],p=i-1;p<=o+1;p+=2)g.push(p);for(var v=Math.floor(Math.random()*f.length),m=Math.floor(Math.random()*g.length),y=f[v],b=g[m],w=0;w<t.length;w++)for(var S=0;S<t[0].length;S++)if(w===y&&S!==b&&S>=i-1&&S<=o+1){var O=t[w][S];if(O.isStart||O.isFinish)continue;O.isWall=!0,l.push(O)}e(t,r,y-2,i,o,y-2-r>o-i?a:"vertical",s,l),e(t,y+2,n,i,o,n-(y+2)>o-i?a:"vertical",s,l)}else{for(var P=[],N=i;N<=o;N+=2)P.push(N);for(var j=[],E=r-1;E<=n+1;E+=2)j.push(E);for(var C=Math.floor(Math.random()*P.length),k=Math.floor(Math.random()*j.length),V=P[C],D=j[k],F=0;F<t.length;F++)for(var W=0;W<t[0].length;W++)if(W===V&&F!==D&&F>=r-1&&F<=n+1){var M=t[F][W];if(M.isStart||M.isFinish)continue;M.isWall=!0,l.push(M)}e(t,r,n,i,V-2,n-r>V-2-i?"horizontal":a,s,l),e(t,r,n,V+2,o,n-r>o-(V+2)?"horizontal":a,s,l)}}(e,t,r,n,i,o,a,s),console.log(s),console.log(e),s}var A=[];var z=r(41),T=r(40),_=r(8);r(64),r(43);function G(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?G(r,!0).forEach((function(t){Object(s.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):G(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var U=10,J=7,q=11,H=45,$=60,K=30,Q=15,X=function(e){function t(e){var r;return Object(l.a)(this,t),(r=Object(u.a)(this,Object(h.a)(t).call(this,e))).handleMouseClick=function(e,t){if(r.state.grid[e][t].isWall){var n=r.removeWall(e,t);r.setState({grid:n})}else{var i=r.buildWall(e,t);r.setState({grid:i})}},r.handleMouseDown=function(e,t){if(console.log("mouse down"),!r.state.grid[e][t].isStart&&!r.state.grid[e][t].isFinish)if(r.state.grid[e][t].isWall){var n=r.removeWall(e,t);r.tempGrid=n,r.nodeRef[e][t].current.toggleReset()}else{var i=r.buildWall(e,t);r.tempGrid=i,r.mousePressed=!0,r.nodeRef[e][t].current.toggleWall()}},r.handleMouseEnter=function(e,t){if(console.log("mouse enter"),!r.state.grid[e][t].isStart&&!r.state.grid[e][t].isFinish&&r.mousePressed&&!r.state.grid[e][t].isWall){var n=r.buildWall(e,t);r.tempGrid=n,r.nodeRef[e][t].current.toggleWall()}},r.handleMouseUp=function(){console.log("mouse up"),r.mousePressed=!1,r.setState({grid:r.tempGrid})},r.buildWall=function(e,t){var n=r.state.grid,i=L({},n[e][t],{isWall:!0});return n[e][t]=i,n},r.removeWall=function(e,t){var n=r.state.grid,i=L({},n[e][t],{isWall:!1});return n[e][t]=i,n},r.createNode=function(e,t){return{row:e,col:t,isStart:e===U&&t===J,isFinish:e===q&&t===H,distance:1/0,hCost:null,gCost:null,fCost:null,previousNode:null,nextNode:null,isVisited:!1,isVisitedFromOther:!1,isWall:!1,isPath:!1}},r.clearVisitedNode=function(e){var t=r.state.grid,n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var l=a.value,c=!0,u=!1,h=void 0;try{for(var f,d=l[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var g=f.value,p=g.row,v=g.col;g.isStart?r.resetStartNode(p,v,t,g):g.isFinish?r.resetFinishNode(p,v,t,g):g.isWall?r.resetWallNode(p,v,t,g,e):r.resetVisitedNode(p,v,t,g)}}catch(m){u=!0,h=m}finally{try{c||null==d.return||d.return()}finally{if(u)throw h}}}}catch(m){i=!0,o=m}finally{try{n||null==s.return||s.return()}finally{if(i)throw o}}r.setState({grid:t})},r.resetStartNode=function(e,t,n,i){var o=L({},i,{isPath:!1,isVisited:!1,isVisitedFromOther:!1,previousNode:null,nextNode:null,distance:1/0,hCost:null,gCost:null,fCost:null});n[e][t]=o,r.nodeRef[i.row][i.col].current.toggleStart()},r.resetFinishNode=function(e,t,n,i){var o=L({},i,{isPath:!1,isVisited:!1,isVisitedFromOther:!1,previousNode:null,nextNode:null,distance:1/0,hCost:null,gCost:null,fCost:null});n[e][t]=o,r.nodeRef[i.row][i.col].current.toggleFinish()},r.resetWallNode=function(e,t,n,i,o){if(o)r.resetVisitedNode(e,t,n,i);else{var a=L({},i,{isPath:!1,isVisited:!1,isVisitedFromOther:!1,previousNode:null,nextNode:null,isWall:!0,distance:1/0,hCost:null,gCost:null,fCost:null});n[e][t]=a}},r.resetVisitedNode=function(e,t,n,i){var o=L({},i,{isPath:!1,isVisited:!1,isVisitedFromOther:!1,previousNode:null,nextNode:null,isWall:!1,distance:1/0,hCost:null,gCost:null,fCost:null});n[e][t]=o,r.nodeRef[i.row][i.col].current.toggleReset()},r.animateDijkstra=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),i*o),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),i*o)},a=0;a<e.length;a++)o(a)},r.printShortestPath=function(e,t){var n=r.state.animationSpeed;if(0!==e.length)for(var i=function(i){setTimeout((function(){var o=e[i];t[o.row][o.col]=o,r.nodeRef[o.row][o.col].current.togglePath(),i===e.length-1&&(r.setState({grid:t}),setTimeout((function(){r.setState({mousePointerEvents:"auto"})}),n*i+1))}),n*i)},o=0;o<e.length;o++)i(o);else setTimeout((function(){r.setState({mousePointerEvents:"auto"})}),n)},r.visualizeDijkstra=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid,t=e[U][J],n=e[q][H],i=m(e.slice(),t,n);if(i){var o=function(e){var t=[];if(null===e.previousNode)return t;for(var r=e;null!=r;)r=v({},r,{isPath:!0}),t.unshift(r),r=r.previousNode;return t}(n);r.animateDijkstra(i,o)}}),100)},r.animateDepthFirstSearch=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),o*i),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),o*i)},a=0;a<e.length;a++)o(a)},r.visualizeDepthFirstSearch=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid,t=e[U][J],n=e[q][H],i=function(e,t,r){if(!t||!r||t===r)return!1;for(var n=[],i=[t];0!==i.length;){var o=i.pop();if(!o.isWall&&!o.isVisited){if(o.isVisited=!0,n.push(o),o===r)return n;var a=P(e,o),s=!0,l=!1,c=void 0;try{for(var u,h=a[Symbol.iterator]();!(s=(u=h.next()).done);s=!0){var f=u.value;f.previousNode=o,i.push(f)}}catch(d){l=!0,c=d}finally{try{s||null==h.return||h.return()}finally{if(l)throw c}}}}return n}(e.slice(),t,n);if(i){var o=function(e){var t=[];if(null===e.previousNode)return t;for(var r=e;null!==r;)r=S({},r,{isPath:!0}),t.unshift(r),r=r.previousNode;return t}(n);r.animateDepthFirstSearch(i,o)}}),100)},r.animateBreadthFirstSearch=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),o*i),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),o*i)},a=0;a<e.length;a++)o(a)},r.visualizeBreadthFirstSearch=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid,t=e[U][J],n=e[q][H];console.log(e);var i=function(e,t,r){if(!t||!r||t===r)return!1;for(var n=[],i=[t];0!==i.length;){var o=i.shift();if(!o.isWall&&!o.isVisited){if(o.isVisited=!0,n.push(o),o===r)return n;var a=E(e,o),s=!0,l=!1,c=void 0;try{for(var u,h=a[Symbol.iterator]();!(s=(u=h.next()).done);s=!0){var f=u.value;f.previousNode=o,i.push(f)}}catch(d){l=!0,c=d}finally{try{s||null==h.return||h.return()}finally{if(l)throw c}}}}return n}(e.slice(),t,n);if(i){var o=function(e){var t=[];if(null===e.previousNode)return t;for(var r=e;null!==r;)r=j({},r,{isPath:!0}),t.unshift(r),r=r.previousNode;return t}(n);r.animateBreadthFirstSearch(i,o)}}),100)},r.animateBestFirstSearch=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),o*i),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),o*i)},a=0;a<e.length;a++)o(a)},r.visualizeBestFirstSearch=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid,t=e[U][J],n=e[q][H],i=V(e.slice(),t,n);if(i){var o=function(e){var t=[];if(null===e.previousNode)return t;for(var r=e;null!==r;)r=k({},r,{isPath:!0}),t.unshift(r),r=r.previousNode;return t}(n);r.animateBestFirstSearch(i,o)}}),100)},r.animateAStarSearch=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),o*i/1.5),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),o*i/1.5)},a=0;a<e.length;a++)o(a)},r.visualizeAStarSearch=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid;console.log(e);var t=e[U][J],n=e[q][H],i=function(e,t,r){if(!t||!r||t===r)return!1;var n=[],i=[],o=new Set;for(t.fCost=0,t.gCost=0,t.hCost=x(t,r),n.push(t);0!==n.length;){for(var a=0,s=0;s<n.length;s++)n[s].fCost<n[a].fCost&&(a=s);console.log(a);var l=n.splice(a,1)[0];if(console.log(l),o.add(l),i.push(l),l===r)return i;for(var c=B(e,l),u=0,h=c.length;u<h;++u){var f=c[u];if(!o.has(f)){var d=l.gCost+1;n.includes(f)?(console.log("before "+f.gCost+" new "+d),d<f.gCost&&(f.gCost=d,f.hCost=M(f,r,"manhattan_distance"),f.fCost=f.gCost+f.hCost,f.previousNode=l,console.log("after "+f.gCost))):(f.gCost=d,f.hCost=M(f,r,"manhattan_distance"),f.fCost=f.gCost+f.hCost,f.previousNode=l,n.push(f))}}}}(e.slice(),t,n);if(i){console.log(i);var o=function(e){var t=[];if(null===e.previousNode)return t;for(var r=e;null!==r;)r=W({},r,{isPath:!0}),t.unshift(r),r=r.previousNode;return t}(n);r.animateAStarSearch(i,o)}}),100)},r.animateBidirectionalSearch=function(e,t){for(var n=r.state.grid,i=r.state.animationSpeed,o=function(o){n[e[o].row][e[o].col]=e[o],o===e.length-1&&setTimeout((function(){r.printShortestPath(t,n)}),o*i/1.5),setTimeout((function(){var t=e[o];r.nodeRef[t.row][t.col].current.toggleVisited()}),o*i/1.5)},a=0;a<e.length;a++)o(a)},r.visualizeBidirectionalSearch=function(){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!1),setTimeout((function(){var e=r.state.grid,t=e[U][J],n=e[q][H],i=function(e,t,r){if(!t||!r||t===r)return!1;for(var n=[],i=[t],o=[r];0!==i.length&&0!==o.length;){var a=i.shift(),s=o.shift();if(s.isVisited)return console.log(s),n.push(s),n;if(a.isVisitedFromOther)return console.log(a),n.push(a),n;if(a===s)return n;if(!a.isVisited||!s.isVisitedFromOther)if(a.isVisited){s.isVisitedFromOther=!0,n.push(s);var l=R(e,s,"from_finish"),c=!0,u=!1,h=void 0;try{for(var f,d=l[Symbol.iterator]();!(c=(f=d.next()).done);c=!0){var g=f.value;g.nextNode=s,o.push(g)}}catch(I){u=!0,h=I}finally{try{c||null==d.return||d.return()}finally{if(u)throw h}}}else if(s.isVisitedFromOther){a.isVisited=!0,n.push(a);var p=R(e,a,"from_start"),v=!0,m=!1,y=void 0;try{for(var b,w=p[Symbol.iterator]();!(v=(b=w.next()).done);v=!0){var S=b.value;S.previousNode=a,i.push(S)}}catch(I){m=!0,y=I}finally{try{v||null==w.return||w.return()}finally{if(m)throw y}}}else{s.isVisitedFromOther=!0,n.push(s);var O=R(e,s,"from_finish"),P=!0,N=!1,j=void 0;try{for(var E,C=O[Symbol.iterator]();!(P=(E=C.next()).done);P=!0){var k=E.value;k.nextNode=s,o.push(k)}}catch(I){N=!0,j=I}finally{try{P||null==C.return||C.return()}finally{if(N)throw j}}a.isVisited=!0,n.push(a);var V=R(e,a,"from_start"),D=!0,F=!1,W=void 0;try{for(var M,x=V[Symbol.iterator]();!(D=(M=x.next()).done);D=!0){var B=M.value;B.previousNode=a,i.push(B)}}catch(I){F=!0,W=I}finally{try{D||null==x.return||x.return()}finally{if(F)throw W}}}}return n}(e.slice(),t,n);if(i){console.log(i.length);var o=function(e,t){for(var r=[],n=[],i=e.nextNode;null!==e;)e.isPath=!0,r.unshift(e),e=e.previousNode;for(;null!==i;)i.isPath=!0,n.push(i),i=i.nextNode;return r.concat(n)}(i[i.length-1]);console.log(o),r.animateBidirectionalSearch(i,o)}}),100)},r.visualizeSelectedAlgorithm=function(){var e=r.state.selectedAlgorithm;switch(console.log(e),e){case"Dijkstra Algorithm":r.visualizeDijkstra();break;case"Depth first search":r.visualizeDepthFirstSearch();break;case"Breadth frist search":r.visualizeBreadthFirstSearch();break;case"Greedy Best first search":r.visualizeBestFirstSearch();break;case"A* search":r.visualizeAStarSearch();break;case"Bidirectional BFS":r.visualizeBidirectionalSearch();break;default:window.alert("select an algorithm!")}},r.selectAlgorithm=function(e){var t="";switch(e){case"Dijkstra Algorithm":t="Dijkstra's algorithm is a weighted graph search algorithm used to find the sortest path between nodes in a graph";break;case"Depth first search":t="Depth Fisrt Search is an unweighted graph search algorithm used for traversing or searching in a graph. It does not guarantee the shortest path";break;case"Breadth frist search":t="Breadth Fisrt Search is an unweighted graph search algorithm used for traversing or searching in a graph. It guarantees the shortest path";break;case"Greedy Best first search":t="Greedy Best first search is weighted and informed graph search algorithm, It does not guarantee the shortest path";break;case"A* search":t="A* search is a weighted and informed grapth search algorithm which arguably the best graph search algorithm. It guarantees the shortest path and mush faster than Dijkstra's";break;case"Bidirectional BFS":t="Bidirectional BFS is an unweighted graph search algorithm which gives the shortest path between the two nodes"}r.setState({selectedAlgorithm:e,description:t})},r.selectSpeed=function(e){switch(e){case"slow":r.setState({animationSpeed:$,speed:e});break;case"medium":r.setState({animationSpeed:K,speed:e});break;case"fast":r.setState({animationSpeed:Q,speed:e})}},r.generateWalls=function(e){r.setState({mousePointerEvents:"none"}),r.clearVisitedNode(!0),setTimeout((function(){var t=r.state.grid,n=[];switch(e){case"recursive_division_horizontal":n=I(t,2,t.length-3,2,t[0].length-3,"horizontal",!0);break;case"recursive_division_vertical":n=I(t,2,t.length-3,2,t[0].length-3,"vertical",!0);break;case"random":n=function(e,t,r){for(var n=0;n<e.length;n++)for(var i=0;i<e[0].length;i++){var o=Math.random(),a=e[n][i];a.isStart||a.isFinish||o<.3&&(a.isWall=!0,A.push(a))}return A}(t)}r.animateWalls(n)}),500)},r.animateWalls=function(e){for(var t=r.state.grid,n=function(n){setTimeout((function(){var i=e[n],o=i.row,a=i.col;r.nodeRef[o][a].current.toggleWall(),t[o][a].isWall=!0,n===e.length-1&&setTimeout((function(){console.log("last"),r.setState({mousePointerEvents:"auto",grid:t})}),10)}),10*n)},i=0;i<e.length;i++)n(i)},r.state={grid:[],mousePressed:!1,mousePointerEvents:"auto",selectedAlgorithm:"",speed:"fast",animationSpeed:15,description:"Select any path finding algorithm and play!!!"},r.nodeRef=[],r}return Object(f.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){for(var e=[],t=0;t<21;t++){for(var r=[],n=[],o=0;o<51;o++)r.push(this.createNode(t,o)),n.push(i.a.createRef());this.nodeRef.push(n),e.push(r)}this.setState({grid:e})}},{key:"render",value:function(){var e=this,t=this.state.grid;return i.a.createElement("div",{className:"container-fluid"},i.a.createElement("div",null,i.a.createElement(T.a,{bg:"light"},i.a.createElement(T.a.Brand,{href:"#"},"Algorithm Visualizer"),i.a.createElement(_.a,{title:"Select Algorithm",id:"basic-nav-dropdown",style:{pointerEvents:this.state.mousePointerEvents}},i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("Dijkstra Algorithm")}},"Dijkstra"),i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("Depth first search")}},"Depth Fisrt Search"),i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("Breadth frist search")}},"Breadth Fisrt Search"),i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("Greedy Best first search")}},"Greedy Best Fisrt Search"),i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("A* search")}},"A* Search"),i.a.createElement(_.a.Item,{href:"",onClick:function(){return e.selectAlgorithm("Bidirectional BFS")}},"Bidirectional Search (BFS)")),i.a.createElement(_.a,{title:"Generate Maze",style:{pointerEvents:this.state.mousePointerEvents}},i.a.createElement(_.a.Item,{onClick:function(){return e.generateWalls("recursive_division_horizontal")}},"Horizontal Recursive Division"),i.a.createElement(_.a.Item,{onClick:function(){return e.generateWalls("recursive_division_vertical")}},"Vertical Recursive Division"),i.a.createElement(_.a.Item,{onClick:function(){return e.generateWalls("random")}},"Random Maze")),i.a.createElement(z.a.Link,{onClick:function(){return e.clearVisitedNode(!0)},style:{pointerEvents:this.state.mousePointerEvents}},"Clear Board"),i.a.createElement(z.a.Link,{className:"btn btn-danger",onClick:function(){return e.visualizeSelectedAlgorithm()},style:{pointerEvents:this.state.mousePointerEvents}},"Visualize ",this.state.selectedAlgorithm),i.a.createElement(_.a,{title:"Speed: ".concat(this.state.speed),style:{pointerEvents:this.state.mousePointerEvents}},i.a.createElement(_.a.Item,{onClick:function(){return e.selectSpeed("fast")}},"Fast"),i.a.createElement(_.a.Item,{onClick:function(){return e.selectSpeed("medium")}},"Medium"),i.a.createElement(_.a.Item,{onClick:function(){return e.selectSpeed("slow")}},"Slow")))),i.a.createElement("div",null,i.a.createElement("p",{className:"container description"},this.state.description)),i.a.createElement("div",{className:"grid",style:{pointerEvents:this.state.mousePointerEvents}},i.a.createElement("table",null,i.a.createElement("tbody",null,t.map((function(t,r){return i.a.createElement("tr",{className:"tr-height",key:r},t.map((function(t,r){return i.a.createElement("td",{key:r},i.a.createElement(d,{row:t.row,col:t.col,isStart:t.isStart,isFinish:t.isFinish,isWall:t.isWall,isPath:t.isPath,isVisited:t.isVisited,onMouseDown:function(t,r){return e.handleMouseDown(t,r)},onMouseEnter:function(t,r){return e.handleMouseEnter(t,r)},onMouseUp:function(){return e.handleMouseUp()},ref:e.nodeRef[t.row][t.col]}))})))}))))))}}]),t}(n.Component);var Y=function(){return i.a.createElement("div",{className:"App"},i.a.createElement(X,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(i.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[53,1,2]]]);
//# sourceMappingURL=main.2960dbb5.chunk.js.map