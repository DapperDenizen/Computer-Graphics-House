
function JimFBX(scale)
{
	
	this.jimObjs = [];
	this.loader = new THREE.FBXLoader();
	this.scale =scale;
	var path = "SimpleInteriorsHouses/Textures/SimpleInteriorsHouses.png";
	this.textureLoader = new THREE.TextureLoader();
	this.textureLoader.setCrossOrigin("anonymous");

	this.load = function(name, posX, posY, posZ, rotation)
	{
		this.jimObjs.push(new JimObj(name, posX, posY, posZ, rotation));
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
			scene.add(geo);
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


function JimObj(name, posX, posY, posZ, rotation) 
{
	this.name=name;
	this.posX=posX;
	this.posY=posY;
	this.posZ=posZ;
	this.rotation=rotation;
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



function onReplaceTexture(mesh, path) 
{
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
				texture.repeat.set( 3, 3 );
		        child.material.map = texture;
		        child.material.needsUpdate = true;
		    }
		});
    });
}


			