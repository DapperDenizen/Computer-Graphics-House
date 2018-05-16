
//variables
    //grid
    var testgrid = new Grid(14,14,0,-5,0);
    //held items
    var heldItem;
    var holdY = 0;
    var holding = false;
    //mouse movements & raycast
    var movingX = 0;
    var movingY = 0;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

function FurnitureSetup(){
//generic box for testing
		//geometry
		var boxGeometry = new THREE.BoxBufferGeometry(2, 2, 2);
		//material
		var boxMaterial = new THREE.MeshPhongMaterial({
			color: 'sandybrown'
		});
		//mesh1
		var box1 = new THREE.Mesh(boxGeometry, boxMaterial);
		var boxY = -5 + 2 / 2;
		thing1.position.set(0, thingY, 0);
		//


		//FURNITURE TESTS
		var box1Shape = [
			[0,0,0,0],
			[0,1,0,0],
			[0,0,0,0],
			[0,0,0,0],
		];
		var box1 = new Furniture(thing1,box1Shape,grid,thing1.position);
		//



}