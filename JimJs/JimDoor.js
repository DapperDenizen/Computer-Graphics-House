
var objs = [];
var doors = [];
var sun;
var sunSpeed = 0.01;
var jimRaycaster;
var jimMouse;
var g;
var scale = 10;

var zoom = 10;
function guiStart()
{
	var paramater = 
	{
		sunSpeed: 0.01,
		zoom:1
	};
	var gui = new dat.GUI();
	gui.add( paramater, 'sunSpeed', 0, 0.1 ).onChange( function () {
		sunSpeed = paramater.sunSpeed;
	} );

	gui.add( paramater, 'zoom', 0, 50.0 ).onChange( function () {
		zoom = paramater.zoom;
	} );
	gui.open();
}


function startJimDoor()
{

	jimRaycaster = new THREE.Raycaster();
	jimMouse = new THREE.Vector2();

	guiStart();
	makeSun();

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
	door.position.set(posX*scale,0,posY*scale);

	door.isOpened = false;
	door.OnOpen = function()
	{
		door.isMoving = true;
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


function JimUpdate()
{
	sun.update();
	for (var i = doors.length - 1; i >= 0; i--) 
	{
		doors[i].update();
	}


	var d = 3;//camera.position.distanceTo( new THREE.Vector3( 0, 0, 0 ) );
	//console.log(d);

	if(d<=2)
	{
		//controls.reset();

		console.log("zoom from "+camera.position.x);
		camera.position.set
		(
		 camera.position.x*10,
		 camera.position.y*10,
		 camera.position.z*10
		);

		console.log("to "+camera.position.x);
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

/*
	jimDoor(18, -21, false, true, false );
	jimDoor(-1, -2,  true, true , false );
	jimDoor(-1, 7,  false, true , false );
	jimDoor(-6, 5,  false, false, false );
	jimDoor(3, 26,  false, true, true  );
*/
function makeSun()
{
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
	var geometry = new THREE.BoxGeometry(sizeX*scale, sizeY*scale, sizeZ*scale);
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(posX*scale, posY*scale, posZ*scale);
	scene.add(cube);
	cube.name = 'glass';
	return cube;
}

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


/*


*/