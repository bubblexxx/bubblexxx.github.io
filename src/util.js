

function al(message){
	alert(message)
}

function isArray(obj){
	return !!obj && obj.constructor === Array;
}

//function co(message){
//console.log(message)
//foreach(message,console.log)
//isArray(message) ? foreach(message,console.log) : console.log(message);
//isArray(message) ? console.log({message}) : console.log(message);
//}


//foreach >> for_action
function foreach(tableau,action){
	for(var i=0;i<tableau.length;i++){
		action(tableau[i]);
	}
}

const all = method => list =>{
	let i =list.length
	while(--i){
		list[i][action]()	
	}
}
//const countor= (obj) => foreach(obj,function(){obj++;console.log(obj,"countor");return obj})

function run (...args) {
	const data = args.shift()
	let i = data.length
	while (--i >= 0) {
		args.forEach(fn => fn(data[i]))
	}
}



const hide_enemies = (enemies, actionString) => enemies.forEach( (enemy) => enemy.actionString() );

//const for_action=(obj,action) => obj.forEach((item) => action());
const for_action=(obj,action) => obj.forEach((item) => item[action]());

//function for_action(obj,action){
//	obj.forEach(function(item){
//		return item[action]();	
//
//	})
//}


function countor=(x)=>{
	x++
	return x
} 

//function cond(obj,action){
	//if (obj){
		//return action()
	//}
//}


//function is_exist(obj){
	//if(typeof obj != "undefined"){
		//return true; 
	//}else{
		//return false; 
	//}
//}
count_modif_obj = (obj,i,num_max) => {
	i++
	if (i > num_max){
		obj = ''
	}else{
		obj = i
	}
}
// dans explode character
// attention check syntaxe hero.text.text ?

//const de = game.time.events.add
/***delay and then action
args[0]=delay
args[1]=action
args[2]=this
*/
//const del=(...args) => {
//	let action = args[1]
//	if (args[2] == 'undefined'){
//		de(args[0],action)
//	}else{
//		de(args[0],action,args[2])
//	}
//}

//necessite dans setItem via localstorage 
//_table=[item1,item2]


//creation =(obj,table) => {new obj(table)}
//storage_check =(obj,liste_obj,liste) => {
//	let condition = for_each(tableau) === null
//	if(condition){
//		for_each = (obj,liste_obj) => {creation(obj,table)}
//	} else {
//		for_each = (obj,liste_obj_storage) => {creation(obj,table)}
//	}
//}
var co=console.log


//initier une transition et y mettre fin
//tw = (obj,tw_action,tw_name,f) => {
//	f=true
//	co("start")
//	tw_action(obj,tw_name)
//}
//
//tw_action=(obj,tw_name)=> {
//	//reset here object
//	obj.scale.setTo(0,0)
//	obj.x=400
//	obj.y=400
//	//use array for multiple instance
//	tw_name[0] = game.add.tween(obj.scale).to({x:4,y:3},800,Phaser.Easing.Linear.None,true,0)
//	tw_name[1] = game.add.tween(obj).to({x:0,y:0},800,Phaser.Easing.Linear.None,true,0)
//}
//
	//tw = (obj,tw_action,tw_name,f) => {

//initier une transition et y mettre fin
//////////////////////////////////////////////////////////////////////////////////////////
