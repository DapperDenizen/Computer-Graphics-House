this.furnitures = [];
function JimFBX(scale)
{
	// grid  variables
	this.furnitures = [];
	//
	this.jimObjs = [];
	this.loader = new THREE.FBXLoader();
	this.scale =scale;
	var path = "SimpleInteriorsHouses/Textures/SimpleInteriorsHouses.png";
	this.textureLoader = new THREE.TextureLoader();
	this.textureLoader.setCrossOrigin("anonymous");

	this.load = function(name, posX, posY, posZ, rotation, shape, gridRef)
	{
		this.jimObjs.push(new JimObj(name, posX, posY, posZ, rotation,shape,gridRef));
	}

	this.onLoad = function()
	{
		var n = this.jimObjs;
		var l = this.loader;
		var s = this.scale;
		this.textureLoader.load(path, function (texture) 
		{
		    for (var i = n.length - 1; i >= 0; i--) 
			{
				console.log('SimpleInteriorsHouses/Models/'+n[i].name);
				l.load('SimpleInteriorsHouses/Models/'+n[i].name, initObj(n[i], scale, texture));
			}
			
	    });
	}


	function initObj(obj, scale, texture)
	{
		return function(geo)
		{

			geo.scale.set( scale, scale, scale );
			geo.rotateY((obj.rotation/180) *Math.PI);
			//console.log(i+"A");
			geo.position.set(obj.posX * scale, obj.posY * scale, obj.posZ * scale);
			//
			var furniture = new THREE.Group();
			var furnitureRef = new Furniture(geo,obj.shape,obj.gridRef,new Three.Vector3(obj.posX,obj.posY,obj.posZ));
			furniture.add(geo);
			geo.name = "furniture";
			furniture.add(furnitureRef);

			furniture.RotateShape = function(){
				furnitureRef.RotateShape();
				}
			furniture.CheckSittingOn = function(){
				return furnitureRef.CheckSittingOn();
				}
			
			scene.add(furniture);
			geo.traverse(function (child) 
		    {
			    if (child instanceof THREE.Mesh) 
			    {
			        // apply texture
			        child.material.map = texture;
			        child.material.needsUpdate = true;
			        	child.castShadow = true;  
			    }

			});
			
		}
		
	}
	
}


function JimObj(name, posX, posY, posZ, rotation,shape,gridRef) 
{
	this.name=name;
	this.posX=posX;
	this.posY=posY;
	this.posZ=posZ;
	this.rotation=rotation;
	//
	this.shape = shape;
	this.gridRef = gridRef;
}



function JimLoad()
{

	
	loader.load('SimpleInteriorsHouses/Models/Prop_Big_Clock.fbx', function(geo)
	{
		scene.add(geo);
		onReplaceTexture(geo);
	} );

	loader.load('SimpleInteriorsHouses/Models/Prop_Chair_03.fbx', function(geo)
	{
		scene.add(geo);
		onReplaceTexture(geo);
	} );
	
}



function onReplaceTexture(mesh, path, x, y, normalMap) 
{
	x = typeof x !== 'undefined' ?  x : 1;
	y = typeof y !== 'undefined' ?  y : 1;

	textureLoader = new THREE.TextureLoader();
	textureLoader.setCrossOrigin("anonymous");
	textureLoader.load(path, function (texture) 
	{
	    // mesh is a group contains multiple sub-objects. Traverse and apply texture to all. 
	    
	    mesh.traverse(function (child) 
	    {

		    if (child instanceof THREE.Mesh) 
		    {
		        // apply texture
		        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		        console.log(x);
				texture.repeat.set( x, y );
		        child.material.map = texture;
		        child.material.needsUpdate = true;
		    }
		});
    });

    if(typeof normalMap !== 'undefined')
    {
    	textureLoader.load(normalMap, function (texture) 
		{
		    mesh.traverse(function (child) 
		    {
			    if (child instanceof THREE.Mesh) 
			    {
			        // apply texture
			        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			        console.log(x);
					texture.repeat.set( 1, 1 );
			        child.material.normalMap = texture;
			        child.material.needsUpdate = true;
			    }
			});
	    });
    }
}


			