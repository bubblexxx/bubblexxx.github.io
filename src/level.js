var h=1920;
var w=1280;
var h2=h*.5;
var w2=640;
////////////////////////////////////////////////////////////////////////////
//LEVEL 0///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//pour peupler les levels
var l=[];
for (var i = 0; i < 20; i++){
	l.push({canon:[],asteroid:[],dalle_moving:[],pulsar:[],dalle:[]})
};

// canon example
var ca0_l0={
	number:0,
	delay:0,
	posx:400-200,
	posy:500,
	speed:900,
	frequency:500,
	variance:0,
	angular:180,
	kill_with_world:true,
	special_color:true,
	rotate:false,
	value_rotate:10
}
// asteroid example
var as0_l0={
	number:0,
	radius:0,
	posx:400-200,
	posy:500,
	speed:900
}
// dalle example
var da0_l0={
	number:0,
	delay:0,
	posx:400-200,
	posy:500,
	speed:900
}
// dalle_moving example
var dm0_l0={
	number:0,
	delay:100,
	posx:240,
	posy:500,
	posx_in_tween:300,
	speed:300
}
// pulsar example
var pu0_l0={
	number:0,
	delay:100,
	time:100,
	posx:w2,
	posy:840,
	speed:2000,
	scale_factor:2
}
//
//on ajoute le canon au level concerné
l[0].canon.push(ca0_l0)
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//LEVEL 1///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// canon example
var ca0_l1={
	number:0,
	delay:0,
	posx:400-200,
	posy:500,
	speed:900,
	frequency:500,
	variance:0,
	angular:180,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
}

var ca1_l1={
	number:1,
	delay:100,
	posx:100,
	posy:800,
	speed:900,
	frequency:500,
	variance:10,
	angular:180,
	kill_with_world:true,
	special_color:false,
	rotate:false,
	value_rotate:10
}
//
//on ajoute le canon au level concerné
l[1].canon.push(ca0_l0)
l[1].canon.push(ca1_l1)
//////////////////////////////////////////////////////////////////////////////

