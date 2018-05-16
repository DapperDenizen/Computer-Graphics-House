class Furniture {
    constructor(mesh, shape, gridRef, position) {
        this.nodes = []; // array of nodes it uses (doesnt need to be ordered)
        this.mesh = mesh; //reference to mesh/object
        this.gridRef = gridRef; // refrernce to the grid
        this.position = position; // world position at shape position 2,2 or middle right

        //Shape
        //2d array of 1s and 0s that represent the shape 
        //  xxxx
        //  xoxx    <- 'o' is the centre
        //  xxxx
        //  xxxx
        //centre will be at 2,2 (right middle if we make it larger)
        this.shape = shape;
        this.checkSittingOn();
    }

    activateNodes(newNodes) {
        //this is to tell the nodes we are on to be occupied
        //console.log(newNodes);


    }

    checkSittingOn() {
        //use the shape array to figure out the nodes we are sitting on
        //
        var rowColLength = 4;
        //
        var nodeMap = this.gridRef.getNeighbours(this.gridRef.nodeFromWorldPoint(this.position));
        var newNodes = [];
        for (var x = 0; x < rowColLength; x++) {
            for (var y = 0; y < rowColLength; y++) {
                if (this.shape[x][y] == 1) {
                    if(nodeMap.occupied == false){
                    newNodes.push(nodeMap[x][y]);
                    }else if(nodeMap.occupied == true){
                        console.log("ERROR- two objects collided");
                    }
                }

            }
        }
        this.activateNodes(newNodes);
    }


    rotateShape() {
        //i sorta know how this works, check here for more info https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab
        const flipMatrix = shape => (
            shape[0].map((column, index) => (
                shape.map(row => row[index])
            ))

        );
        this.shape = flipMatrix;
    }

}