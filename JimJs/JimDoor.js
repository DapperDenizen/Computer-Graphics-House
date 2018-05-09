
var objs = [];
var doors = [];
var sun;
var sunSpeed = 0.01;
var jimRaycaster;
var jimMouse;
var g;
function guiStart()
{
	var paramater = 
	{
		sunSpeed: 0.01
	};
	var gui = new dat.GUI();
	gui.add( paramater, 'sunSpeed', 0, 0.1 ).onChange( function () {
		sunSpeed = paramater.sunSpeed;
	} );
	gui.open();
}


function startJimDoor()
{
	//raycast
	jimRaycaster = new THREE.Raycaster();
	jimMouse = new THREE.Vector2();
	guiStart();

}


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
	door.position.set(posX,0,posY);

	door.isOpened = false;
	door.OnOpen = function()
	{
		door.isMoving = true;
		console.log(this.isClockwise);	

	}

	door.update = function () 
	{
		if(this.isMoving)
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
			console.log(way+" "+degree);	
			if(isClockwise)
			{
				if((degree >-1 && way>0) || (degree <-88 && way<0))
				{
					this.isMoving = false;
					this.isOpened = !this.isOpened;
				}
			}
			else
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
	}
}

window.addEventListener('mousedown', onClick, false);


function JimUpdate()
{
	sun.update();
	for (var i = doors.length - 1; i >= 0; i--) 
	{
		doors[i].update();
	}
}

function makeSun()
{
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

	sun.update = function()
	{
		this.rotation.x += sunSpeed;
		var vector = new THREE.Vector3();
		vector.setFromMatrixPosition( this.children[0].matrixWorld );
		this.children[0].intensity = vector.y/50;
	}
}


function makeLight(posX, posY, intensity)
{
	//makeCube(1,1, 1, posX+1, 2, posY+1, new THREE.Color(1,1,1));




	var spotLight = new THREE.SpotLight( 0xffffff,1 );
	spotLight.position.set( posX, 10, posY );
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

function makeWindows(posX, posY, sizeX, sizeY)
{
	makeCube(sizeX, 3, sizeY, posX,1.5,posY, new THREE.Color(1,1,1));
	makeGlass(sizeX,4, sizeY, posX,5  ,posY);
	makeCube(sizeX, 3, sizeY, posX,8.5,posY, new THREE.Color(1,1,1));
}  


function makeWall2(posX, posY, sizeX, sizeY)
{
	return makeCube(sizeX, 10, sizeY, posX,5,posY, new THREE.Color(1,1,1));
}

function makeWall(posAx, posAy, posBx, posBy)
{

	return makeCube((posBx - posAx),20,(posBy - posAy),posAx,10,posAy, new THREE.Color(1,1,1));
}


function makeGlass(sizeX, sizeY, sizeZ, posX, posY, posZ)
{

	var material = new THREE.MeshStandardMaterial( {
				opacity: params.opacity,
				//premultipliedAlpha: true,
				transparent: true
			} );
				
	material.color = new THREE.Color(0x4951F8);
	var geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(posX, posY, posZ);
	scene.add(cube);
	cube.name = 'glass';
	return cube;
}

function makeCube(sizeX, sizeY, sizeZ, posX, posY, posZ, colorBox)
{

	var material = new THREE.MeshStandardMaterial();
	material.color = colorBox;

	var geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
	var cube = new THREE.Mesh( geometry, material );
	cube.position.y = posY;
	cube.position.x = posX;
	cube.position.z = posZ;

	cube.castShadow = true; //default is false
	cube.receiveShadow = true; //default
	cube.matrixAutoUpdate = false;
	cube.updateMatrix();
	scene.add(cube);
	objs.push(cube);
	cube.name = "cube";
	return cube;
}