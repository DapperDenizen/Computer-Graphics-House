

var windows;

function startJimWindows()
{
	windows = new THREE.Group();
	scene.add( windows );
}


function jimDoor(posX, posY, isClockwise, isStartHos, isLeft)
{


	var win = makeCube(1, 10, 5, 0,5,z, new THREE.Color(0x124B07));
	windows.add(win);
	return win;
}
