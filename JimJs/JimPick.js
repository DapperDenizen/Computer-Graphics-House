
var JimHand;
var isJimGotStuff;
function JimPick()
{
	JimHand = new THREE.Group();
	JimHand.position.set(-10,0,0);
	camera.add(JimHand);

	document.onkeydown=function(event)
	{
		var e = event || window.event || arguments.callee.caller.arguments[0];

		if(e)
		{
			if(e.keyCode==70)//F
			{
				onPick_Jim();
			}

		}
	}; 


	
}
//THREE.SceneUtils.attach( child, scene, parent );
//THREE.SceneUtils.detach( child, parent, scene );

onPick_Jim = function()
{
	if(!isJimGotStuff)
	{
		THREE.SceneUtils.attach( outlinePass.selectedObjects[0], scene, camera );
		isJimGotStuff = true;
		console.log('pick');
	}
	else
	{
		THREE.SceneUtils.detach( camera.children[0], camera, scene);
		isJimGotStuff = false;
	}

}


