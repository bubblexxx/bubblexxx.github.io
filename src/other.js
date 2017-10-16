if_undefined = function(obj,action){
	if( obj == null ){
		action();
	}
}

//foreach >> for_action
for_each=function(tableau,action){
	for(var i=0; i<tableau.length ;i++) {
		action(tableau[i]);
	}
}

count_modif_obj = function(obj,i,num_max){
	i++
	if (i > num_max){
		obj = '';
	}else{
		obj = i;
	}
}

const hide_enemies =function(enemies, actionString){enemies.forEach( function(enemy){enemy.actionString()})};

const for_action=function(obj,action){obj.forEach(function(item){item[action]()})};

al=function(message){
	alert(message);
}

countor=function(x){
	x++;
	return x;
} 
//console.log

co = console.log.bind(console);
