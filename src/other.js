if_undefined = (obj,action) => {
	if( obj == null ){
		action();
	}
}

tw = (obj,tw_action,tw_name,f) => {
	f=true
	tw_action(obj,tw_name)
}

stop_tw = (tw_name,f,obj) => {
	if(f){
		obj.visible=false
		game.tweens.remove(tw_name)
		f=false
	}
}
//initier une transition et y mettre fin
//////////////////////////////////////////////////////////////////////////////////////////
//foreach >> for_action
function for_each(tableau,action){
	for(var i=0; i<tableau.length ;i++) {
		action(tableau[i]);
	}
}

count_modif_obj = (obj,i,num_max) => {
	i++
	if (i > num_max){
		obj = ''
	}else{
		obj = i
	}
}

function run (...args) {
	const data = args.shift()
	let i = data.length
	while (--i >= 0) {
		args.forEach(fn => fn(data[i]))
	}
}

const hide_enemies = (enemies, actionString) => enemies.forEach( (enemy) => enemy.actionString() );

const for_action=(obj,action) => obj.forEach((item) => item[action]());

function al(message){
	alert(message)
}

countor=(x)=>{
	x++
	return x
} 

