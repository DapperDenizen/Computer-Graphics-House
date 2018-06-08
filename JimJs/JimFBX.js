
//this file is to import the FBX file from SimpleInteriorsHouses
function JimFBX(scale)
{
	
	this.jimObjs = [];
	this.texturePic;
	this.loader = new THREE.FBXLoader();
	this.scale = scale;
	var path = "SimpleInteriorsHouses/Textures/SimpleInteriorsHouses.png";
	this.textureLoader = new THREE.TextureLoader();
	this.textureLoader.setCrossOrigin("anonymous");

	//this function add the info to the array
	this.load = function(name, posX, posY, posZ, rotation)
	{
		this.jimObjs.push(new JimObj(name, posX, posY, posZ, rotation));
	}

	//this function go though all the obj in the array and import them
	this.onLoad = function()
	{
		var n = this.jimObjs;
		var l = this.loader;
		var s = this.scale;
		//because they all using one texture, so i load the texture first
		this.textureLoader.load(path, function (texture) 
		{
			//go though the array
		    for (var i = n.length - 1; i >= 0; i--) 
			{
				console.log('loading SimpleInteriorsHouses/Models/'+n[i].name);
				//load the file
				l.load('SimpleInteriorsHouses/Models/'+n[i].name, initObj(n[i], scale, texture));
			}
			
	    });
	}


	this.spawn = function(name, posX, posY, posZ, rotation)
	{
		this.calebObjs.push(new JimObj(name, posX, posY, posZ, rotation));
	}
	
	this.onClick = function()
	{
		var n = this.calebObjs;
		var l = this.loader;
		var s = this.scale;
		this.textureLoader.load(path, function (texture) 
		{
		    for (var i = n.length - 1; i >= 0; i--) 				
				{
				console.log('SimpleInteriorsHouses/Models/'+n[i].name);
				l.load('SimpleInteriorsHouses/Models/'+n[i].name, initObj(n[i], scale, texture));
				break;
				}
			
	    });
	}

	// after the fbx loaded i replace the texture on the file, so it show the color.
	function initObj(obj, scale, texture, Models)
	{
		return function(geo)
		{

			geo.scale.set( scale, scale, scale );
			geo.rotateY((obj.rotation/180) *Math.PI);
			
			geo.position.set(obj.posX * scale, obj.posY * scale, obj.posZ * scale);
			scene.add(geo);
			//replace texture
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

//this is the format to save info 
function JimObj(name, posX, posY, posZ, rotation) 
{
	this.name=name;
	this.posX=posX;
	this.posY=posY;
	this.posZ=posZ;
	this.rotation=rotation;
}




//this function replace texture on the box 
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


			