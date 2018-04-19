class GridStuff{
// this is the grid creation class, it contains a grid made of nodes (found at the bottom).  
constructor(xGridWorldSize,yGridWorldSize,posX,posY,posZ){
//area the grid will take up (world height and world width)
this.xGridWorldSize = xGridWorldSize;
this.yGridWorldSize = yGridWorldSize;
//world position
this.pos = [posX,posY,posZ];
//the grid itself
this.grid = new Array();
//each squares mesurements
this.nodeRadius = 1;
this.nodeDiameter = this.nodeRadius*2;
//how many squares we'll need
this.xGridSize = Math.round(xGridWorldSize /this.nodeDiameter); //Y
this.yGridSize = Math.round(yGridWorldSize /this.nodeDiameter); //X
//creation of the grid
this.createGrid();

}

createGrid(){
    //bottom left corner of the grid area
var worldBottomLeft = [this.pos[0] - this.yGridWorldSize/2, this.pos[2]-this.xGridWorldSize/2];
var x = 0;
var y = 0;    
//nested loop for creating the grid
for(x =0; x< this.yGridSize; x++ ){
        for(y =0; y< this.xGridSize; y++ ){
            //world point is the world point the node will be placed on
            var worldPoint = [worldBottomLeft[0]+ (x*this.nodeDiameter +this.nodeRadius) ,worldBottomLeft[1]+ (y*this.nodeDiameter +this.nodeRadius)];
            this.grid.push(new Node(worldPoint[0],worldPoint[1],[x,y])); 
        }

    }

    //use the below command for debugging the grid, it prints out the entire array!
    //console.log(this.grid);
}

nodeFromWorldPoint(point){
    //finding the node from a world point
    //essentially this makes the world point equal to a rough number similar to the input grid position
var xPercent = ((point.x + this.yGridWorldSize / 2) / this.yGridWorldSize);
var yPercent = ((point.z + this.xGridWorldSize / 2) / this.xGridWorldSize);
xPercent = this.clampNumb(xPercent,0,1);
yPercent = this.clampNumb(yPercent,0,1);
var tempX = Math.round((this.yGridSize-1) *xPercent);
var tempY = Math.round((this.xGridSize-1) *yPercent);
 return this.getNode(tempX,tempY);
}
//this is used for testing!
giveMeSquares(){
    return this.grid;
}


//utility functions (mostly aquired from stack overflow)
clampNumb(numb,min, max) {
    //this clamps a number between a minimum and a maxiumum (used in the world point for making a percentage from 0-1)
    return Math.min(Math.max(numb, min), max);
  };

getNode(positionX, positionY){
    //search function (this can be much nicer)
    //looks for the grid node in the corresponding co-ordinates
    var temp = 0;
    var lookingFor = new Array ( positionX, positionY);
    for(temp = 0; temp < this.grid.length; temp++){
        if(this.grid[temp].gridPos[0] == lookingFor[0] && this.grid[temp].gridPos[1] == lookingFor[1] ){
            return this.grid[temp];
        }
    }
    console.log( "Error- Cannot find Node | problem in getNode()");

}

}
//Node class, these are the squares in the grid
class Node{
    constructor(xPos, yPos,gridPos){
        this.xPos = xPos;
        this.yPos = yPos;
        this.gridPos = gridPos;
        this.usable = this.checkUsable();
        this.occupied = false;

    }

    checkUsable(){
        //check if usable
        return true;
    }

    checkOccupied(){
        //check is furniture is already inside it
        return false;
    }

    //public returns, to be referenced from outside the Node
    getGridPos(){
        return [this.gridPos];
    }

    getXandY(){
        return [this.xPos,this.yPos];
    }

}