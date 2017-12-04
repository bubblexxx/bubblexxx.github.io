var h=1920;
var w=1280;
var h2=h*0.5;
var w2=640;
var w0=280;
var w4=1400;

// -------------------------------------
// LEVEL 1
// -------------------------------------

//pour peupler les levels
var l=[];
for (var i = 0; i < NUMBER_OF_LEVELS; i++){
	l.push({canon:[],asteroid:[],dalle_moving:[],pulsar:[],dalle:[],ads:false,signal_ads:false,next_with_video:true,signal_video_to_pass_level:false});
}
var sto=[];
for (var i = 0; i < NUMBER_OF_LEVELS; i++){
	sto.push({canon:[],asteroid:[],dalle_moving:[],pulsar:[],dalle:[],ads:false,signal_ads:false,next_with_video:true,signal_video_to_pass_level:false});
}

if(debug_position === false){
	// tous les 3 levels on place une ads
	l[2].ads=true;
	l[5].ads=true;
	l[8].ads=true;
	l[11].ads=true;
	l[14].ads=true;
	l[17].ads=true;
	//exeption car on est pressé de finir le jeu
	l[18].ads=true;
}

// canon example
var ca0_l0={
	number:0,
	delay:0,
	posx:w0,
	posy:1720,
	speed:1000,
	frequency:480,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};
// asteroid example
var as0_l0={
	number:0,
	posx:800,
	posy:800,
	radius:195,
	speed:0.002
};
// dalle example
var da0_l0={
	number:0,
	delay:0,
	posx:400-200,
	posy:500,
	speed:900
};
// dalle_moving example
var dm0_l0={
	number:0,
	delay:100,
	posx:240,
	posy:1900,
	posx_in_tween:300,
	speed:300
};
// pulsar example
var pu0_l0={
	number:0,
	delay:100,
	time:100000,
	posx:w2,
	posy:840,
	speed:2,
	scale_factor:.0001
};
//
//on ajoute le canon au level concerné
l[0].canon.push(ca0_l0);
//l[0].asteroid.push(as0_l0);
//l[0].dalle.push(da0_l0);
//l[0].dalle_moving.push(dm0_l0);
//l[0].pulsar.push(pu0_l0);
 
// -------------------------------------
// LEVEL 2
// -------------------------------------

// canon example
var ca0_l1={
	number:0,
	delay:0,
	posx:w0,
	posy:500,
	speed:900,
	frequency:550,
	variance:0,
	angular:45,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

var ca1_l1={
	number:1,
	delay:time_appears_enemies+1500,
	posx:w4,
	posy:500,
	speed:900,
	frequency:850,
	variance:0,
	angular:135,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};
//
//on ajoute le canon au level concerné
l[1].canon.push(ca0_l1);
l[1].canon.push(ca1_l1);
l[1].ads=false

// -------------------------------------
// LEVEL 3
// -------------------------------------

// canon example
var ca0_l2={
	number:0,
	delay:0,
	posx:w0,
	posy:1720,
	speed:1500,
	frequency:210,
	variance:20,
	angular:0,
	kill_with_world:false,
	special_color:false,
	rotate:false,
	value_rotate:10
};

//
//on ajoute le canon au level concerné
l[2].canon.push(ca0_l2);

// -------------------------------------
// LEVEL 4
// -------------------------------------

// canon example
var ca0_l3={
	number:0,
	delay:0,
	posx:w4,
	posy:1500,
	speed:900,
	frequency:900,
	variance:0,
	angular:180,
	kill_with_world:true,
	special_color:true,
	rotate:false,
	value_rotate:10
};

var ca1_l3={
	number:1,
	delay:200,
	posx:w0,
	posy:800,
	speed:2000,
	frequency:50,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};
//
//on ajoute le canon au level concerné
l[3].canon.push(ca0_l3);
l[3].canon.push(ca1_l3);
 
// -------------------------------------
// LEVEL 5
// -------------------------------------

// canon example
var ca0_l4={
	number:0,
	delay:0,
	posx:w4,
	posy:1500,
	speed:900,
	frequency:900,
	variance:0,
	angular:180,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

var ca1_l4={
	number:1,
	delay:200,
	posx:w0,
	posy:800,
	speed:2000,
	frequency:50,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:true,
	value_rotate:10
};
//
//on ajoute le canon au level concerné
l[4].canon.push(ca0_l4);
l[4].canon.push(ca1_l4);

// -------------------------------------
// LEVEL 6
// -------------------------------------

// canon example
var ca1_l5={
	number:0,
	delay:200,
	posx:w0,
	posy:h2,
	speed:2000,
	frequency:50,
	variance:100,
	angular:0,
	kill_with_world:false,
	special_color:false,
	rotate:false,
	value_rotate:10
};
//
//on ajoute le canon au level concerné
//l[5].canon.push(ca0_l5);
l[5].canon.push(ca1_l5);
//////////////////////////////////////////////////////////////////////////////

// -------------------------------------
// LEVEL 7
// -------------------------------------

// dalle example
// attention wait doit toujours être supérieur à speed + delay
var da0_l6={
	number:0,
	delay:0,
	posx:760,
	posy:1680,
	speed:450,
	wait:1450
};

//on ajoute le canon au level concerné
l[6].dalle.push(da0_l6);
//////////////////////////////////////////////////////////////////////////////

// -------------------------------------
// LEVEL 8
// -------------------------------------

// dalle example
// attention wait doit toujours être supérieur à speed + delay
var da0_l7={
	number:0,
	delay:0,
	posx:760,
	posy:1680,
	speed:450,
	wait:450
};

// dalle example
var da1_l7={
	number:1,
	delay:100,
	posx:760,
	posy:1440,
	speed:450,
	wait:450
};

//on ajoute le canon au level concerné
l[7].dalle.push(da0_l7);
l[7].dalle.push(da1_l7);
//////////////////////////////////////////////////////////////////////////////

// -------------------------------------
// LEVEL 9
// -------------------------------------
// le canon est entre les deux dalles 

var ca0_l8={
	number:0,
	delay:0,
	posx:w0,
	posy:1350,
	speed:1000,
	frequency:880,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

// dalle example
// attention wait doit toujours être supérieur à speed + delay

var da0_l8={
	number:0,
	delay:0,
	posx:760,
	posy:1680,
	speed:1950,
	wait:2000,
};

// dalle example
var da1_l8={
	number:1,
	delay:1000,
	posx:760,
	posy:1000,
	speed:2950,
	wait:4000
};

//on ajoute le canon au level concerné
l[8].canon.push(ca0_l8);
l[8].dalle.push(da0_l8);
l[8].dalle.push(da1_l8);
//////////////////////////////////////////////////////////////////////////////

// -------------------------------------
// LEVEL 10
// -------------------------------------
// les dalles sont invibles au début mais apparaissent toutes 

// dalle example
var da0_l9={
	number:0,
	delay:0,
	posx:760,
	posy:1680,
	speed:450,
	wait:4000
};

// dalle example
var da1_l9={
	number:1,
	delay:5000,
	posx:760,
	posy:1000,
	speed:450,
	wait:2000
};

//on ajoute le canon au level concerné
l[9].dalle.push(da0_l9);
l[9].dalle.push(da1_l9);
//////////////////////////////////////////////////////////////////////////////

