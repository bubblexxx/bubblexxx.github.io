

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

var co=console.log

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

function countor(x){
	x++
	return x
} 

function cond(obj,action){
	if (obj){
		return action()
	}
}


function is_exist(obj){
	if(typeof obj != "undefined"){
		return true; 
	}else{
		return false; 
	}
}

