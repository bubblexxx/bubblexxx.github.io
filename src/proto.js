_mechant = function(name,image,posx,posy){
	this.name=name
	this.image=image
	this.posx=posx
	this.posy=posy
	this.sprite_for_drag=game.add.sprite(this.posx,this.posy,'sprite_for_drag')
	debug_position ? this.sprite_for_drag.alpha=.5 : this.sprite_for_drag.alpha=0
	this.sprite_for_drag.anchor.setTo(.5,.5)
	this.sprite_for_drag.inputEnabled=true
	this.sprite_for_drag.input.enableDrag(true)
	this.sprite_for_drag.input.enableSnap(40,40,true,true)
	this.sprite_for_drag.events.onDragStop.add(logic_position,this.sprite_for_drag)
	this.sprite_for_drag.events.onDragStart.add(show_grid_on_logic_position,this)
	this.sprite_for_body=game.add.sprite(this.posx,this.posy,this.image)
	this.sprite_for_body.anchor.setTo(.5,.5)
	game.physics.arcade.enable(this.sprite_for_body)
	this.sprite_for_body.immovable=true
	this.flag=true
}

_mechant.prototype.hide=function(){
	this.tween1=game.add.tween(this.sprite_for_drag.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	this.sprite_for_body.enable=false
	this.tween1.onComplete.add(function(){this.sprite_for_drag.visible=false;this.sprite_for_drag.inputEnabled=false}this)
	this.tween2.onComplete.add(function(){this.sprite_for_body.visible=false},this)
}

_mechant.prototype.update=function(){
	this.sprite_for_body.x=this.sprite_for_drag.x
	this.sprite_for_body.y=this.sprite_for_drag.y
}

_button=function(image,posx,posy,fun_call_back){
	this.image=image
	this.posx=posx
	this.posy=posy
	this.fun_call_back=fun_call_back
	this=game.add.button(this.posx,this.posy,this.image,this.anim_on_click,this)
	this.visible=false
	this.anchor.setTo(.5,.5)
	this.scale.setTo(0,0)
	this.flag=true
	this.sound_click=game.add.audio('click')
}

button.prototype.audio_click = function() {
	this.sound_click.play()
}

_button.prototype.show_button=function(){
		this.visible=true
		this.tween_scale_button = game.add.tween(this.scale).to({x:1,y:1},150,Phaser.Easing.Bounce.Out,true,0)
}

_button.prototype.anim_on_click=function(){
	if(this.flag){
		this.flag=false
		this.audio_click()
		this.tween_anim_on_click = game.add.tween(this.scale).to({x:.8,y:.8},150,Phaser.Easing.Bounce.Out,true,0)
		this.tween_anim_on_click.onComplete.add(this.fun_call_back,this)
	}
}



	example1=function(){this.ob=game.add.sprite(100,100,"cible_shadow")}
	example1.prototype.can_play=true


	//necessary to attribut of this in example1
	example2=function(){example1.call(this);this.another_param=10}
	//necessary to method of example1
	example2.prototype=Object.create(example1.prototype)

	example2.prototype.show_param=function(){
		alert(this.ob.x)
		alert(this.another_param)
		alert(this.can_play)
	}

