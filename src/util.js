

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


function hide_enemies(obj){
	obj.forEach(function(item){
		return item.hide()
	})
}

//const hide_enemies = (enemies, actionString) => enemies.forEach( (enemy) => enemy.actionString() );

function for_each(obj,action){
	obj.forEach(function(item){
		return item.action();	

	})
}

function cond(obj,action){
	if (obj){
		return action
	}
}


function is_exist(obj){
	if(typeof obj != "undefined"){
		return true; 
	}else{
		return false; 
	}
}

