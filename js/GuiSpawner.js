
function guiSpawner(grid)
{
	var loader = new JimFBX(2.7);	
	var shape;
	var obj;
	var rot;
	
	var smallBoxShape = [
			[0,0,0,0],
			[0,1,0,0],
			[0,0,0,0],
			[0,0,0,0],
		];
	var mediumBoxShape = [
		[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0],
	];
	var LargeBoxShape = [
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
	];
	var LargeRecShape = [
		[0,1,1,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,1,1,0],
	];
	
	var objectDef = function()
	{
		//default values
		this.object = "";
		this.rotation = 0;
		this.shape = smallBoxShape;
		//spawns the object using JimFBX loader
		this.spawn = function spawn()
		{					
		loader.spawn(object, 0,0,0, rotation, shape, grid);
		loader.onClick();
		}
	};
	
	function CalebGui()
	{
		var text = new objectDef();
		var gui = new dat.GUI;
		//the list of objects to spawn
		obj = gui.add(text, 'object', ['Default', 'Prop_BathroomCabinet_White.fbx','Prop_Big_Chair_01.fbx','Prop_Books_02.fbx','Prop_Books_02.fbx','Prop_BunkBed_Blue.fbx','Prop_Chair_06.fbx','Prop_Computer_Case.fbx','Prop_Computer_Screen.fbx','Prop_Couch_02.fbx','Prop_Cupboard_07.fbx','Prop_Cupboards_Black.fbx','Prop_Curtains_Blue.fbx','Prop_Desk_01.fbx','Prop_Desk_Chair.fbx','Prop_Desk_Lamp.fbx','Prop_Draw_02.fbx','Prop_Fireplace_01.fbx','Prop_Flower_Pot_01.fbx','Prop_Fridge_01.fbx','Prop_Game_Console.fbx','Prop_KitchenSink_Black.fbx','Prop_Lamp_01.fbx','Prop_Lamp_04.fbx','Prop_Lamp_06.fbx','Prop_Mirror.fbx','Prop_Oven_White.fbx','Prop_Plant.fbx','Prop_Plant_01.fbx','Prop_Shelf_013.fbx','Prop_Shelf_08.fbx','Prop_Shower.fbx','Prop_SingleBed_Pink.fbx','Prop_Small_Table_01.fbx','Prop_Small_Table_03.fbx','Prop_Small_Table_04.fbx','Prop_Sound_System.fbx','Prop_Table_03.fbx','Prop_ToiletBrush_01.fbx','Prop_ToiletRoll_02.fbx','Prop_Toilet_01.fbx','Prop_Tv_03.fbx','Prop_Tv_06.fbx','Prop_Vcr.fbx','Prop_WallArt_01.fbx','Prop_WallArt_01.fbx','Prop_WallArt_03.fbx','Prop_Wardrobe_02.fbx'
		]).name('object');
		//rotation the object spawns in
		rot = gui.add(text, 'rotation', 0 , 360);
		//spawn button
		gui.add(text, 'spawn');
	};
	CalebGui();
	
	//checks the object and gets the correct shape for the grid
	//I would add more ORs to the if statements, if the grid was properly working
	function shapeCheck()
	{
		if(object == 'Prop_Small_Table_01.fbx')
			shape = mediumBoxShape;
			
		else if(object == 'Prop_BunkBed_Blue' || 'Prop_SingleBed_Pink.fbx')
			shape = LargeRecShape
	}
	
	//gets the values set in the gui
	obj.onChange(function(value){
		object = value;
		shapeCheck();
	});
	
	rot.onChange(function(value){
		rotation = value;
	});
	
	
};


