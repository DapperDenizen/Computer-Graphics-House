	var raycaster;
	var mouse;
	var selectedObjects = [];
	var composer, effectFXAA, outlinePass;
	var isCentre = false;

function initOutline() 
{

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	var Configuration = function () {
		this.visibleEdgeColor = '#ffffff';
		this.hiddenEdgeColor = '#190a05';
	};


	// postprocessing
	composer = new THREE.EffectComposer( renderer );
	var renderPass = new THREE.RenderPass( scene, camera );
	composer.addPass( renderPass );
	outlinePass = new THREE.OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
	composer.addPass( outlinePass );
	
	effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
	effectFXAA.renderToScreen = true;
	composer.addPass( effectFXAA );

	outlinePass.edgeStrength= 3.0;
	outlinePass.edgeGlow= 0.0;
	outlinePass.edgeThickness= 1.0;
	outlinePass.pulsePeriod= 0;
	usePatternTexture= false;


	window.addEventListener( 'mousemove', onTouchMove );
	window.addEventListener( 'touchmove', onTouchMove );
	function onTouchMove( event ) 
	{
		if(isCentre)
		{
			mouse.x =  0;
			mouse.y =  0;
	
		}
		else
		{
			var x, y;
			if ( event.changedTouches ) {
				x = event.changedTouches[ 0 ].pageX;
				y = event.changedTouches[ 0 ].pageY;
			} else {
				x = event.clientX;
				y = event.clientY;
			}
			mouse.x = ( x / window.innerWidth ) * 2 - 1;
			mouse.y = - ( y / window.innerHeight ) * 2 + 1;
		}
		


		checkIntersection();
	}

	function checkIntersection() {

		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( [ scene ], true );
				//console.log(intersects.length);
		if ( intersects.length > 0 ) {
					
			selectedObjects = [];
			selectedObjects.push( intersects[ 0 ].object );
			outlinePass.selectedObjects = selectedObjects;
			//console.log(selectedObjects.length);
		}
	}
}


