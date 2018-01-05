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

if(debug_ads === true){
	// tous les 3 levels on place une ads
	l[2].ads=true;
	l[5].ads=true;
	l[8].ads=true;
	l[11].ads=true;
	l[14].ads=true;
	l[17].ads=true;
	//exeption car on est pressé de finir le jeu
	l[20].ads=true;
	l[21].ads=true;
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
	speed:1400,
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
var da0_l7={
	number:0,
	delay:10,
	posx:w2,
	posy:1680,
	speed:1650,
	wait:550
};

// dalle example
var da1_l7={
	number:1,
	delay:20,
	posx:w2,
	posy:1440,
	speed:950,
	wait:250
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
	speed:3950,
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

// -------------------------------------
// LEVEL 11
// -------------------------------------
// apparation des pulsars
// pulsar légèrement sur la droite  
// pulsar example
var pu0_l10={
	number:0,
	delay:100,
	posx:800,
	posy:840,
	speed:1000,
	scale_factor:2
};

//on ajoute le canon au level concerné
l[10].pulsar.push(pu0_l10);
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 12
// -------------------------------------
// apparation des pulsars
// pulsar légèrement sur la droite  
// pulsar example
var pu0_l11={
	number:0,
	delay:100,
	posx:880,
	posy:840,
	speed:3000,
	scale_factor:2
};
var pu1_l11={
	number:1,
	delay:900,
	posx:280,
	posy:1160,
	speed:2000,
	scale_factor:6
};

//on ajoute le canon au level concerné
l[11].pulsar.push(pu0_l11);
l[11].pulsar.push(pu1_l11);
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 13
// -------------------------------------
// apparation des pulsars
// pulsar légèrement sur la droite  
// pulsar example
var pu0_l12={
	number:0,
	delay:100,
	posx:880,
	posy:800,
	speed:3000,
	scale_factor:2
};
var pu1_l12={
	number:1,
	delay:900,
	posx:480,
	posy:1080,
	speed:2000,
	scale_factor:6
};
var pu2_l12={
	number:2,
	delay:900,
	posx:1260,
	posy:1720,
	speed:2000,
	scale_factor:6
};

//on ajoute le canon au level concerné
l[12].pulsar.push(pu0_l12);
l[12].pulsar.push(pu1_l12);
l[12].pulsar.push(pu2_l12);
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 14
// -------------------------------------
// apparation des pulsars
// pulsar légèrement sur la droite  
// pulsar example
var pu0_l13={
	number:0,
	delay:100,
	posx:1000,
	posy:1120,
	speed:3000,
	scale_factor:3
};
var pu1_l13={
	number:1,
	delay:900,
	posx:360,
	posy:760,
	speed:2000,
	scale_factor:4.5
};
var ca0_l13={
	number:0,
	delay:0,
	posx:w0,
	posy:1720,
	speed:1000,
	frequency:1000,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

//on ajoute le canon au level concerné
l[13].pulsar.push(pu0_l13);
l[13].pulsar.push(pu1_l13);
l[13].canon.push(ca0_l13);
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 15
// -------------------------------------
// apparation des pulsars
// pulsar légèrement sur la droite  
// pulsar example
var pu0_l14={
	number:0,
	delay:100,
	posx:w2-200,
	posy:1720,
	speed:500,
	scale_factor:2.2
};
var pu1_l14={
	number:1,
	delay:100,
	posx:w2-200,
	posy:1360,
	speed:1000,
	scale_factor:2.2
};
var pu2_l14={
	number:2,
	delay:100,
	posx:w2-200,
	posy:1000,
	speed:2000,
	scale_factor:2.2
};
var pu3_l14={
	number:3,
	delay:100,
	posx:w2-200,
	posy:600,
	speed:4500,
	scale_factor:2.2
};

//on ajoute le canon au level concerné
l[14].pulsar.push(pu0_l14);
l[14].pulsar.push(pu1_l14);
l[14].pulsar.push(pu2_l14);
l[14].pulsar.push(pu3_l14);

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 16
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
var dm0_l15={
	number:0,
	delay:100,
	posx:80,
	posy:1680,
	posx_in_tween:800,
	speed:300
};
//on ajoute le canon au level concerné
l[15].dalle_moving.push(dm0_l15);

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 17
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
var dm0_l16={
	number:0,
	delay:500,
	posx:360,
	posy:1680,
	posx_in_tween:800,
	speed:800
};

var dm1_l16={
	number:1,
	delay:100,
	posx:360,
	posy:1280,
	posx_in_tween:800,
	speed:800
};
//on ajoute le canon au level concerné
l[16].dalle_moving.push(dm0_l16);
l[16].dalle_moving.push(dm1_l16);

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 18
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
var dm0_l17={
	number:0,
	delay:100,
	posx:360,
	posy:1680,
	posx_in_tween:800,
	speed:500
};

var ca0_l17={
	number:0,
	delay:0,
	posx:w0,
	posy:920,
	speed:1000,
	frequency:1000,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

var dm1_l17={
	number:1,
	delay:500,
	posx:360,
	posy:1280,
	posx_in_tween:800,
	speed:500
};
//on ajoute le canon au level concerné
l[17].dalle_moving.push(dm0_l17);
l[17].dalle_moving.push(dm1_l17);
l[17].canon.push(ca0_l17);

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 19
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
var dm0_l18={
	number:0,
	delay:100,
	posx:360,
	posy:1080,
	posx_in_tween:800,
	speed:800
};

var dm1_l18={
	number:1,
	delay:400,
	posx:360,
	posy:1280,
	posx_in_tween:800,
	speed:800
};

var dm2_l18={
	number:1,
	delay:500,
	posx:360,
	posy:1480,
	posx_in_tween:800,
	speed:800
};

var dm3_l18={
	number:1,
	delay:900,
	posx:360,
	posy:1680,
	posx_in_tween:800,
	speed:800
};
//on ajoute le canon au level concerné
l[18].dalle_moving.push(dm0_l18);
l[18].dalle_moving.push(dm1_l18);
l[18].dalle_moving.push(dm2_l18);
l[18].dalle_moving.push(dm3_l18);

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 20
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
var dm0_l19={
	number:0,
	delay:100,
	posx:w2-200,
	posy:1080,
	posx_in_tween:200,
	speed:300
};

var dm1_l19={
	number:1,
	delay:400,
	posx:w2-200,
	posy:1280,
	posx_in_tween:200,
	speed:200
};

//on ajoute le canon au level concerné
l[19].dalle_moving.push(dm0_l19);
l[19].dalle_moving.push(dm1_l19);

// -------------------------------------
// TERRIBLES LEVELS
// -------------------------------------

//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 21
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
// asteroid example
var as0_l20={
	number:0,
	posx:800,
	posy:800,
	radius:195,
	speed:0.008
};


//on ajoute le canon au level concerné
l[20].asteroid.push(as0_l20);


//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 22
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
// asteroid example
var as0_l21={
	number:0,
	posx:w2,
	posy:800,
	radius:500,
	speed:0.012
};
var as1_l21={
	number:1,
	posx:600,
	posy:1800,
	radius:300,
	speed:0.004
};


//on ajoute le canon au level concerné
l[21].asteroid.push(as0_l21);
l[21].asteroid.push(as1_l21);


//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 23
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
// asteroid example
var as0_l22={
	number:0,
	posx:w2,
	posy:800,
	radius:500,
	speed:0.006
};
var ca0_l22={
	number:0,
	delay:0,
	posx:w0,
	posy:1720,
	speed:2000,
	frequency:280,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:true,
	value_rotate:10
};
var ca1_l22={
	number:1,
	delay:0,
	posx:w4,
	posy:720,
	speed:1500,
	frequency:480,
	variance:0,
	angular:0,
	kill_with_world:false,
	special_color:false,
	rotate:true,
	value_rotate:10
};


//on ajoute le canon au level concerné
l[22].asteroid.push(as0_l22);
l[22].canon.push(ca0_l22);
l[22].canon.push(ca1_l22);


//////////////////////////////////////////////////////////////////////////////
// -------------------------------------
// LEVEL 24
// -------------------------------------
// apparation des dalles movings
// dalle_moving example
// asteroid example
var as0_l23={
	number:0,
	posx:240,
	posy:1800,
	radius:900,
	speed:0.006
};

var ca0_l23={
	number:1,
	delay:0,
	posx:w0,
	posy:720,
	speed:1500,
	frequency:480,
	variance:0,
	angular:0,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
};

var da0_l23={
	number:0,
	delay:10,
	posx:w2,
	posy:1680,
	speed:1650,
	wait:550
};
var dm0_l23={
	number:0,
	delay:400,
	posx:w2-200,
	posy:1280,
	posx_in_tween:800,
	speed:800
};
var pu0_l23={
	number:0,
	delay:100,
	posx:w2-200,
	posy:1720,
	speed:500,
	scale_factor:2.2
};

//on ajoute le canon au level concerné
l[23].asteroid.push(as0_l23);
l[23].canon.push(ca0_l23);
l[23].dalle.push(da0_l23);
l[23].dalle_moving.push(dm0_l23);
l[23].pulsar.push(pu0_l23);





