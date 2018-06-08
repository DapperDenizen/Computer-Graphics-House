var objs = [];
var doors = [];
var sun;
var sunSpeed = 0.01;
var jimRaycaster;
var jimMouse;
var g;
var scale = 10;
var isUsingTexture_JimDoor = false;
var isInfinity_JimDoor = false;


var zoom = 10;

//inst the gui
function guiStart()
{
	var paramater = 
	{
		sunSpeed: 0.01,
		zoom:1
	};
	var gui = new dat.GUI();

	gui.add({ Orbit_Control:function(){ window.location.href = "index - orbitControl.html"; }},'Orbit_Control');
	gui.add({ FPS:function(){ window.location.href = "index - FPS.html"; }},'FPS');
	gui.add({ Infinity_Mode:function(){ window.location.href = "index - infinity.html"; }},'Infinity_Mode');

	gui.add( paramater, 'sunSpeed', 0, 0.1 ).onChange( function () {
		sunSpeed = paramater.sunSpeed;
	} );

	gui.open();
}

//this function start the Jim Door
function startJimDoor()
{
	jimRaycaster = new THREE.Raycaster();
	jimMouse = new THREE.Vector2();

	guiStart();
	makeSun();
}

//this function make the door
function jimDoor(posX, posY, isClockwise, isStartHos, isLeft)
{
	var door = new THREE.Group();
	var doorObj;
	door.isClockwise = isClockwise;
	
	if(isStartHos)
	{
		var x;
		if(isLeft){x = 2;}else{x=-2}
		doorObj = makeCube(5, 10, 1, x,5,0, new THREE.Color(0x124B07));
	}
	else
	{
		var z;
		if(isLeft){z = 2;}else{z=-2}
		doorObj = makeCube(1, 10, 5, 0,5,z, new THREE.Color(0x124B07));
	}
	doorObj.name = "doorObj";
	door.add(doorObj);
	objs.push(doorObj);
	scene.add(door);
	doors.push(door);
	door.position.set(posX*scale,0,posY*scale);

	door.isOpened = false;
	//this function called when the door is clicked
	door.OnOpen = function()
	{
		door.isMoving = true;
	}
//this function call every frame
	door.update = function () 
	{
		if(this.isMoving)//if in moving state
		{
			var way = 0.05;
			var max;
			if(this.isOpened)
				{way *=-1;}

			if(this.isClockwise)
				{way *=-1;}

			this.rotateY(way);	
			var euler = new THREE.Euler();
			euler.setFromQuaternion(this.quaternion);
			var degree = euler.y/Math.PI * 180;
			if(isClockwise)
			{
				if((degree >-1 && way>0) || (degree <-88 && way<0))
				{
					this.isMoving = false;
					this.isOpened = !this.isOpened;
				}
			}
			else // if it finish moving. stop the movement
			{
				if((degree >88 && way>0) || (degree < 1 && way<0))
				{
					this.isMoving = false;
					this.isOpened = !this.isOpened;
				}
			}

		}
		
		
	}
	return door;
}




function onClick(event)
{
	//raycast


	jimMouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	jimMouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	jimRaycaster.setFromCamera(jimMouse, camera);

	// calculate objects intersecting the picking ray
	var intersects = jimRaycaster.intersectObjects(objs);

	//this checks if the array has hit thing1
	if (intersects.length > 0) 
	{
		//intersects[0].object.material.color.setHex( Math.random() * 0xffffff );
		if (intersects[0].object.name ==  'doorObj') 
		{
			intersects[0].object.parent.OnOpen();
		}
		else if (intersects[0].object.name ==  'TV') 
		{
			intersects[0].object.onClick();
		}
		else
		{
			outlinePass.selectedObjects = intersects[0].object;
			//intersects[0].object.material.color = new THREE.Color(0,0,0);
		}
	}
}

window.addEventListener('mousedown', onClick, false);

//this function will call on every frame
function JimUpdate()
{

	sun.update();

	//go though all the door, update them
	for (var i = doors.length - 1; i >= 0; i--) 
	{
		doors[i].update();
	}

	// if is in infinity mode
	if(isInfinity_JimDoor)
	{

		//get the distance from camera to centre
		var d = camera.position.distanceTo( new THREE.Vector3( 0, 0, 0 ) );

		//if is closer then 2 nuits
		if(d<=2)
		{
			camera.position.set//move away the camera
			(
			 camera.position.x*10,
			 camera.position.y*10,
			 camera.position.z*10
			);
		}
		else if(d>=100)//if is futher then 100 nuits
		{
			camera.position.set// pull back the camera
			(
			 camera.position.x/10,
			 camera.position.y/10,
			 camera.position.z/10
			);
		}

		//controls.reset();

		//console.log("zoom from "+camera.position.x);
		camera.position.set
		(
		 camera.position.x*10,
		 camera.position.y*10,
		 camera.position.z*10
		);

		//console.log("to "+camera.position.x);
	}else if(d>=100)
	{
		camera.position.set
		(
		 camera.position.x/10,
		 camera.position.y/10,
		 camera.position.z/10
		);

	}
	
}

//this function init the sun
function makeSun()
{
	// this sun is actually a ambient light
	var ambientLight = new THREE.AmbientLight();
	scene.add( ambientLight );
	ambientLight.intensity = 0.5;

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set(0, 50, 10);
	light.shadowCameraLeft = -50;
	light.shadowCameraRight = 50;
	light.shadowCameraTop = 50;
	light.shadowCameraBottom = -50;
	light.castShadow = true;    
	sun = new THREE.Group();
	sun.add(light);
	scene.add(sun);
	var helper = new THREE.CameraHelper( light.shadow.camera );
	//scene.add( helper );

	//this function call every frame
	sun.update = function()
	{
		//rotation the sun
		this.rotation.x += sunSpeed;
		var vector = new THREE.Vector3();
		//change the intensity base on the position
		vector.setFromMatrixPosition( this.children[0].matrixWorld );
		this.children[0].intensity = vector.y/50;
	}
}

//this function is too make the light
function makeLight(posX, posY, intensity)
{
	var spotLight = new THREE.SpotLight( 0xffffff,1 );
	spotLight.position.set( posX*scale, 10*scale, posY *scale);
	spotLight.angle = Math.PI/1;
	spotLight.penumbra = 0.05;
	spotLight.decay = 2;
	spotLight.distance = 20;
	spotLight.castShadow = true;  
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 3;
	spotLight.shadow.camera.far = 15;
	scene.add( spotLight );


 	var t = new THREE.Group();
	spotLight.target = t;
	spotLight.intensity = intensity;

	
}

//this function is to make the windows
function makeWindows(posX, posY, sizeX, sizeY)
{
	//this windows made with 2 wall and a glass in between
	makeCube(sizeX, 3, sizeY, posX,1.5,posY, new THREE.Color(1,1,1));
	makeGlass(sizeX,4, sizeY, posX,5  ,posY);
	makeCube(sizeX, 3, sizeY, posX,8.5,posY, new THREE.Color(1,1,1));
}  

//make wall base on position and size
function makeWall2(posX, posY, sizeX, sizeY)
{
	var wall = makeCube(sizeX, 10, sizeY, posX,5,posY, new THREE.Color(1,1,1));

	if(isUsingTexture_JimDoor)
	{
		onReplaceTexture(wall, "Textures/Plaster Wall/eisklotz_plaster-01-l-color.jpg", 1, 1, "Textures/Plaster Wall/eisklotz_plaster-01-l-normal.jpg");
	}
	return wall;
}

//make wall base on 4 vertext of the wall
function makeWall(posAx, posAy, posBx, posBy)
{
	//a wall is a special cube
	var wall = makeCube((posBx - posAx),20,(posBy - posAy),posAx,10,posAy, new THREE.Color(1,1,1));
	if(isUsingTexture_JimDoor)
	{
		onReplaceTexture(wall, "Textures/Plaster Wall/eisklotz_plaster-01-l-color.jpg", 1, 1, "Textures/Plaster Wall/eisklotz_plaster-01-l-normal.jpg");
	}
	return wall;
}

//this is the function to make glass
function makeGlass(sizeX, sizeY, sizeZ, posX, posY, posZ)
{
	//create a transparent material
	var material = new THREE.MeshStandardMaterial( {
				opacity: params.opacity,
				//premultipliedAlpha: true,
				transparent: true
			} );
				
	material.color = new THREE.Color(0x4951F8);
	var geometry = new THREE.BoxGeometry(sizeX*scale, sizeY*scale, sizeZ*scale);
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(posX*scale, posY*scale, posZ*scale);
	scene.add(cube);
	cube.name = 'glass';
	return cube;
}

//packaging the threejs box making process into a function
function makeCube(sizeX, sizeY, sizeZ, posX, posY, posZ, colorBox)
{

	var material = new THREE.MeshStandardMaterial();
	material.color = colorBox;

	var geometry = new THREE.BoxGeometry(sizeX*scale, sizeY*scale, sizeZ*scale);
	var cube = new THREE.Mesh( geometry, material );
	cube.position.y = posY*scale;
	cube.position.x = posX*scale;
	cube.position.z = posZ*scale;

	cube.castShadow = true; //default is false
	cube.receiveShadow = true; //default
	cube.matrixAutoUpdate = false;
	cube.updateMatrix();
	scene.add(cube);
	objs.push(cube);
	cube.name = "cube";
	return cube;
}