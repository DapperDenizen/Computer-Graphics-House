/*
Index.html file
******************************************
//bedroom
		makeZacLight(-6, -6, 2.8, 0.5);

	//bedroom2
		makeZacLight(-7.4, 4.5, 2.8, 0.5);

	//bathroom
		makeZacLight(-8.4,-1, 2.8, 0.3);
	
	//Couch/table
		makeZacLight( -0.5, -7, 2.8, 0.4);
	//Kitchen
		makeZacLight( -0.5, 3.5, 2.8, 0.5);

	// (-left right )  (-north south  ) (roof floor) (intensity)
	
	scale = 2.7
	var loader = new JimFBX(scale);
	
	//lights
		//bedroom
			loader.load('Prop_Lights_03.fbx', -6, 3.8, -6, 45);
		//Bedroom2
			loader.load('Prop_Lights_03.fbx', -7.4, 3.8, 4.5, 45);
		//bathroom
			loader.load('Prop_Lights_03.fbx', -8.4, 3.8, -1, 45);
		//Living room
			loader.load('Prop_Lights_03.fbx', -0.5, 3.8, -7, 45);
		//Kitchen

	// (-left right) (roof floor), (-north south) (angle)

	*****************************************************

	JimDoors.js

	*****************************************
	*/
function makeZacLight(posX, posY, posZ, intensity)
{
	var bulbGeometry = new THREE.SphereBufferGeometry( 0.25, 0.25, 0.25);
	bulbLight = new THREE.PointLight( 0xffee88, intensity, 100, 2);
	bulbMat = new THREE.MeshStandardMaterial( {emissive: 0xffffee,emissiveIntensity: 1,color: 0x000000});

	bulbLight.add( new THREE.Mesh( bulbGeometry, bulbMat ) );
	bulbLight.position.set( posX*2.7, posZ*2.7, posY*2.7);
	bulbLight.castShadow = true;
	scene.add( bulbLight );
	//loader.load('Prop_Lights_03.fbx', posX, posZ+1, posY, 45);
}
