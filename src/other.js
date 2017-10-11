if_undefined = function(obj,action){
	if( obj == null ){
		action();
	}
}

//tw = (obj,tw_action,tw_name,f) => {
//	f=true
//	tw_action(obj,tw_name)
//}
//
//stop_tw = (tw_name,f,obj) => {
//	if(f){
//
//		obj.alpha=0
//		f=false
//		game.tweens.remove(tw_name)
//	}
//}
//initier une transition et y mettre fin
//////////////////////////////////////////////////////////////////////////////////////////
//foreach >> for_action
for_each=function(tableau,action){
	for(var i=0; i<tableau.length ;i++) {
		action(tableau[i]);
	}
}

count_modif_obj = function(obj,i,num_max){
	i++
	if (i > num_max){
		obj = ''
	}else{
		obj = i
	}
}

//run=function (...args){
	//const data = args.shift()
	//let i = data.length
	//while (--i >= 0) {
		//args.forEach(fn(){fn(data[i])})
	//}
//}

const hide_enemies =function(enemies, actionString){enemies.forEach( function(enemy){enemy.actionString()})};

const for_action=function(obj,action){obj.forEach(function(item){item[action]()})};

al=function(message){
	alert(message)
}

countor=function(x){
	x++
	return x
} 
//console.log

co = console.log.bind(console);
