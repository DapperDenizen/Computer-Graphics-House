
function JimFBX(scale)
{
	
	this.jimObjs = [];
	this.loader = new THREE.FBXLoader();
	this.scale =scale;
	var path = "SimpleInteriorsHouses/Textures/SimpleInteriorsHouses.png";
	this.textureLoader = new THREE.TextureLoader();
	this.textureLoader.setCrossOrigin("anonymous");

	this.load = function(name, posX, posY, isHor)
	{
		this.jimObjs.push(new JimObj(name, posX, posY, isHor));
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
				l.load('SimpleInteriorsHouses/Models/'+n[i].name, initObj(n[i], scale, texture));
			}
	    });
	}


	function initObj(obj, scale, texture)
	{
		return function(geo)
		{
			geo.scale.set( scale, scale, scale );
			geo.position.set(0,0,0);
			//console.log(i+"A");
			geo.position.set(obj.posX * scale, 0, obj.posY* scale);
			scene.add(geo);
			geo.traverse(function (child) 
		    {
			    if (child instanceof THREE.Mesh) 
			    {
			        // apply texture
			        child.material.map = texture;
			        child.material.needsUpdate = true;
			    }
			});
		}
		
	}
	
}


function JimObj(name, posX, posY, isHor) 
{
	this.name=name;
	this.posX=posX;
	this.posY=posY;
	this.isHor=isHor;
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



function onReplaceTexture(mesh) 
{
	var path = "SimpleInteriorsHouses/Textures/SimpleInteriorsHouses.png";
	
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
		        child.material.map = texture;
		        child.material.needsUpdate = true;
		    }
		});
    });
}


			