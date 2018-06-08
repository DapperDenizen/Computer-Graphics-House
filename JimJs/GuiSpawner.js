function guiSpawner()
{
	var loader = new JimFBX(2.7);	
	var obj;
	var rot;
	var objectDef = function()
	{
		this.object = "";
		this.rotation = 0;
		
		this.spawn = function spawn()
		{					
			loader.spawn(object, rotation); 
			loader.onClick();
		}		
	};
	
	object = "default";
	rotation = 2;
	
	function CalebGui()
	{
		var text = new objectDef();
		var gui = new dat.GUI;
		
		//var toiletArray[] = 'Prop_Shower.fbx', 'Prop_TowelRail.fbx', 'Prop_TowelSmall_Blue.fbx', Prop_TowelBig_Red.fbx', 'Prop_BathroomCabinet_White.fbx', 'Prop_SoapDish.fbx', 'Prop_SoapDispencer.fbx', 'Prop_MirrorBrown.fbx', 'Prop_Toilet_01.fbx', 'Prop_Plant_01.fbx', 'Prop_ToiletRoll_02.fbx', 'Prop_ToiletBrush_01.fbx', 'Prop_WallArt_02.fbx' ;
		obj = gui.add(text, 'object', ['Default', 'Prop_Shower.fbx', 'Prop_TowelRail.fbx' ]).name('object');//, 'Prop_TowelSmall_Blue.fbx', 'Prop_TowelBig_Red.fbx', 'Prop_BathroomCabinet_White.fbx', 'Prop_SoapDish.fbx', 'Prop_SoapDispencer.fbx', 'Prop_MirrorBrown.fbx', 'Prop_Toilet_01.fbx', 'Prop_Plant_01.fbx', 'Prop_ToiletRoll_02.fbx', 'Prop_ToiletBrush_01.fbx', 'Prop_WallArt_02.fbx' ] );
		rot = gui.add(text, 'rotation', 0 , 360);
		gui.add(text, 'spawn');
	};
	CalebGui();
	
	obj.onChange(function(value){
		object = value;
	});
	
	rot.onChange(function(value){
		rotation = value;
	});
};
