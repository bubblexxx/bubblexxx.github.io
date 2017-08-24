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
