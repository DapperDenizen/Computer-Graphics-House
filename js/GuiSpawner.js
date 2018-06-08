
function guiSpawner(grid, shape)
{
	var loader = new JimFBX(2.7);	
	var obj;
	var rot;
	//var gref = 0;
	var objectDef = function()
	{
		//default values
		this.object = "";
		this.rotation = 0;
		//spawns the object using JimFBX loader
		this.spawn = function spawn()
		{					
		loader.spawn(object, 0,0,0, rotation, shape, grid);
		loader.onClick();
		}
	};
	
	object = "default";
	rotation = 2;
	
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
	
	//gets the values set in the gui
	obj.onChange(function(value){
		object = value;
	});
	
	rot.onChange(function(value){
		rotation = value;
	});
};


