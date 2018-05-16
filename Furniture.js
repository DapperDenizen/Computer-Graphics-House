class furniture{
    constructor(nodes, mesh, shape, gridRef, position){
       this.nodes = nodes; // array of nodes it uses (doesnt need to be ordered)
       this.mesh = mesh;   //reference to mesh/object
       //2d array of 1s and 0s that represent the shape 
       //center will be at 2,2 (right middle if we make it larger)
       this.shape = shape;  

       this.gridRef = gridRef; // refrernce to the grid
       this.position = position;    // world position at shape position 2,2 or middle right
    }

    activateNodes(){
        //this is to tell the nodes we are on to be occupied
    }

    checkSittingOn(){
        //use the shape array to figure out the nodes we are sitting on

    }


    rotateShape(){
        //i sorta know how this works, check here for more info https://medium.com/front-end-hacking/matrix-rotation-%EF%B8%8F-6550397f16ab
        const flipMatrix = shape =>(
            shape[0].map((column,index) => (
            shape.map(row => row[index])
            ))

        );
    this.shape = flipMatrix;
    }

}