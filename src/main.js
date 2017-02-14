var ratio_device=window.screen.width/window.screen.height
var h=1920
var w=1920*ratio_device

var h2=h*.5
var w2=640

screen_first = function(){
	Phaser.Sprite.call(this,game,w2,200,'title')
	this.anchor.setTo(.5,.5)
	this.button_restart=game.add.button(w2,h2+400,'button_menu',this.next_level,this)
	this.button_restart.anchor.setTo(.5,.5)
	this.button_next=game.add.button(w2,h2,'button_play',this.next_level,this)
	this.button_next.anchor.setTo(.5,.5)
	this.button_restart.scale.setTo(0,0)
	this.button_restart.visible=false
	this.button_next.scale.setTo(0,0)
	this.button_next.visible=false
	game.time.events.loop( 500,this.explosion,this )
game.time.events.add( 200,this.show_button,this )
	
}
screen_first.prototype = Object.create(Phaser.Sprite.prototype)
screen_first.prototype.constructor = screen_first

screen_first.prototype.next_level = function() {
	this.game.state.start("game_state");
	console.log('next-level')
}

screen_first.prototype.explosion = function() {
			this._x=game.rnd.integerInRange(0,w)
			this._y=game.rnd.integerInRange(0,h)
	this.particle = game.add.emitter(this._x,this._y,200)
	this.particle.makeParticles("rect")
	this.particle.minParticleSpeed.setTo(-600,-600)
	this.particle.maxParticleSpeed.setTo(800,800)
	this.particle.setAlpha(.8, .6)
	this.particle.minParticleScale = .2
	this.particle.maxParticleScale = .5
	this.particle.minRotation = 0
	this.particle.maxRotation = 0
	this.particle.on=false
	this.particle.start(true,3900,null,20)
	
}
screen_first.prototype.show_button = function() {
	this.button_restart.visible=true
this.button_next.visible=true
	this.tween2=game.add.tween(this.button_restart.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	this.tween3=game.add.tween(this.button_next.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	
}



character = function(){
	Phaser.Sprite.call(this,game,w2,-400,'rect')
	this.flag_mouse=false
this.flag_show_button=true
	//cible
	this.cible=game.add.sprite(w2,300,'cible')
	this.cible.anchor.setTo(.5,.5)
	game.physics.arcade.enable(this.cible,Phaser.Physics.ARCADE)
	this.cible.scale.setTo(1.5,1.5)

	this.anchor.setTo(.5,.5)
	this.flag_level_complete=false
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.flag_spacekey=true
	this.enableBody=true
	//game.time.events.add( 2250,this.launch,this )
	this.count=-1
	this.player={}
	for (var i = 0; i < 3; i++){
		this.player[i]=game.add.sprite(w2,1980+200,'rect')	
		game.physics.arcade.enable(this.player[i],Phaser.Physics.ARCADE)
		this.player[i].anchor.setTo(.5,.5)
		this.player[i].enableBody=true
		this.player[i].flag_cant_explode=true
	} 
	this.score = game.add.bitmapText(w2,300,'fo','',100)
	this.score.anchor.setTo(.5,.5)
	this.life = game.add.bitmapText(w2,1800,'fo','3',120)
	this.life.anchor.setTo(.5,.5)
	//this.life.tint=0x000000
	this.sound_pop=game.add.audio('pop_minder')
	this.button_restart=game.add.button(w2,h2,'restart',this.next_level,this)
	this.button_restart.anchor.setTo(.5,.5)
	this.button_restart.scale.setTo(0,0)
	this.button_restart.visible=false
	this.button_next=game.add.button(w2,this.cible.y,'next',this.next_level,this)
	this.button_next.anchor.setTo(.5,.5)
	this.button_next.scale.setTo(0,0)
	this.button_next.visible=false
}
character.prototype = Object.create(Phaser.Sprite.prototype)
character.prototype.constructor = character

character.prototype.audio_pop = function() {
	this.sound_pop.play()
}
character.prototype.next_level = function() {
	this.game.state.start("game_state");
	console.log('next-level')
}
character.prototype.launch_with_mouse=function(){
	if(this.flag_level_complete==false && this.flag_mouse==false){
this.flag_mouse=true
		game.time.events.add( 500,function(){this.flag_mouse=false},this )

		this.count=this.count+1
		if(this.count <= 2){
			console.log(this.count);
			this.player[this.count].visible=true
			this.player[this.count].body.velocity.y=-800
			if(this.count==2){
				game.time.events.add( 2000,this.show_button_restart,this )
			}
		}
	}
}

character.prototype.launch=function(){
	if(this.flag_level_complete==false && this.flag_spacekey==false){
		game.time.events.add( 500,function(){this.flag_spacekey=true;console.log('couco',this.flag_spacekey)},this )

		this.count=this.count+1
		if(this.count <= 2){
			console.log(this.count);
			this.player[this.count].visible=true
			this.player[this.count].body.velocity.y=-800
		}
	}
}
character.prototype.explode_cible=function(){
	this.particle = game.add.emitter(this.cible.x,this.cible.y,200)
	this.particle.makeParticles("rect")
	this.particle.minParticleSpeed.setTo(-600,-600)
	this.particle.maxParticleSpeed.setTo(800,800)
	this.particle.setAlpha(.8, .6)
	this.particle.minParticleScale = .2
	this.particle.maxParticleScale = .5
	this.particle.minRotation = 0
	this.particle.maxRotation = 0
	this.particle.on=false
	this.particle.start(true,3900,null,20)

}
character.prototype.explode=function(posx,posy,n){
	if(this.player[n].flag_cant_explode){

		this.audio_pop()
		this.player[n].flag_cant_explode=false
		this.player[n].visible=false
		this.particle = game.add.emitter(posx,posy,200)
		this.particle.makeParticles("rect")
		this.particle.minParticleSpeed.setTo(-600,-600)
		this.particle.maxParticleSpeed.setTo(800,800)
		this.particle.setAlpha(.8, .6)
		this.particle.minParticleScale = .2
		this.particle.maxParticleScale = .5
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
		this.particle.start(true,3900,null,20)
		this.player[n].y=5000

	}
}

character.prototype.kill = function() {

}

character.prototype.reset_position = function() {

}

character.prototype.anim_on_touch = function() {

}

character.prototype.land=function(n,flag){
	this.flag_level_complete=true
	flag=true
	this.cible.body.enable=false
	for (var i = 0; i < 3; i++){
		this.player[i].body.enable=false
	} 

	this.player[n].body.enable=false
	this.tween0=game.add.tween(this.player[n]).to({x:w2,y:300},500,Phaser.Easing.Linear.None,true,0)
	this.tween0.onComplete.add(() => this.scale_x(n),this)	
}

character.prototype.scale_x = function(n){
	this.tween1=game.add.tween(this.player[n].scale).to({x:4.5,y:4.5},500,Phaser.Easing.Bounce.Out,true,0)
	this.show_button_restart_level_complete()
	this.explode_cible()
}
character.prototype.show_button_restart_level_complete = function() {
	if(this.flag_show_button){
		this.flag_show_button=false
		this.show_button_restart2()
	}
}

character.prototype.show_button_restart = function() {
	if(this.flag_show_button){
		this.flag_show_button=false
	game.time.events.add( 1500,this.show_button_restart2,this )
	}
}
character.prototype.show_button_restart2 = function() {
	this.button_restart.visible=true
this.button_next.visible=true
	this.tween2=game.add.tween(this.button_restart.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	this.tween3=game.add.tween(this.button_next.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	
}


character.prototype.update=function(){
	if (this.spaceKey.isDown && this.flag_spacekey)
	{
		this.flag_spacekey=false
		this.launch()
	}
}

weapon = function(posx,posy,speed,frequency,angular,_flag){
	this.posx=posx
	this.posy=posy
	this.flag_explode=false
	this.speed=speed
	this.angular=angular
	this.frequency=frequency
	this._flag=_flag
	this.sound_pop=game.add.audio('pop')

	//canon
	Phaser.Sprite.call(this,game,this.posx,this.posy,'canon')
	this.anchor.setTo(.5,.5)
	this.angle=this.angular
	game.physics.arcade.enable(this);
	this.weapon=game.add.weapon(9,'bullet')	
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	//  Because our bullet is drawn facing up, we need to offset its rotation:
	this.weapon.bulletAngleOffset = 0;

	//  The speed at which the bullet is fired
	this.weapon.bulletSpeed = this.speed;

	//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
	this.weapon.fireRate = this.frequency ;

	//  Add a variance to the bullet angle by +- this value
	this.weapon.bulletAngleVariance = 0;

	//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
	this.weapon.trackSprite(this,0,0,true);
}


weapon.prototype = Object.create(Phaser.Sprite.prototype)
weapon.prototype.constructor = weapon

weapon.prototype.update = function(){
	if(this._flag==false){
		this.weapon.fire()	
	}
}

weapon.prototype.transition = function() {
	this.tween_characteristic = game.add.tween(this.canon).to({x:posx,y:posy},time,Phaser.Easing.Linear.None,true,delay)
}



weapon.prototype.kill = function() {
	console.log('touch')	
}

weapon.prototype.audio_pop = function() {
	this.sound_pop.play()
}

weapon.prototype.explode_bullet=function(b){
	if(this.flag_explode==false){
		this.flag_explode=true
		this.visible=false
		this.weapon.bullets.visible=false
		this.audio_pop()
		this.weapon.bullets.forEach(function(item){
			if(item.alive){	
				this.particle = game.add.emitter(item.x,item.y,85)
				item.visible=false
				item.body.enable=false
				this.particle.makeParticles("particle_bullet")
				this.particle.minParticleSpeed.setTo(-300,-300)
				this.particle.maxParticleSpeed.setTo(800,800)
				this.particle.setAlpha(.8, .6)
				this.particle.minParticleScale = .2
				this.particle.maxParticleScale = .5
				this.particle.minRotation = 0
				this.particle.maxRotation = 0
				this.particle.on=false
				this.particle.start(true,9900,null,20);}})
	}
}


var bootstate= {
	preload: function(){
		console.log("%cStarting minimalistic game", "color:white; background:red");
		this.load.image("loading","assets/loading.png"); 
	},
	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
		this.game.width=window.innerWidth
		this.game.height=window.innerHeight
		this.scale.pageAlignHorizontally = true
		this.scale.pageAlignVertically = true
		this.scale.refresh()
		this.state.start("preload");
	}
}

var preloadstate = {
	preload: function(){ 
		//loadingBar
		var loadingBar = this.add.sprite(w2,h2,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		//audio_move
		this.game.load.audio("pop_minder","sounds/pop_minder.ogg");
		this.game.load.audio("pop","sounds/pop.ogg");
		//images
		this.game.load.image("title","assets/title.png");

		this.game.load.image("levelselecticons","assets/levelselecticons.png");
		this.game.load.image("background","assets/background.png");
		this.game.load.image("button_menu","assets/button_menu.png");
		this.game.load.image("button_play","assets/button_play.png");
		this.game.load.image("button_menu_level_select","assets/button_menu_level_select.png");
		this.game.load.image("restart","assets/restart.png");
		this.game.load.image("next","assets/next.png");
		this.game.load.image("canon","assets/canon.png");
		this.game.load.image("cible","assets/cible.png");
		this.game.load.image("bullet","assets/bullet.png");
		this.game.load.image("particle_bullet","assets/particle_bullet.png");
		this.game.load.image("rect","assets/rect.png");
		this.game.load.image("button","assets/button.png");
		this.game.load.image("background","assets/background.png");
		//font bitmapFont
		this.game.load.bitmapFont('lucky_yellow','fonts/font_ab_yellow.png', 'fonts/font_ab.fnt');
		this.game.load.bitmapFont('lucky_red','fonts/font_ab_red.png', 'fonts/font_ab.fnt');
		this.game.load.bitmapFont('fo','fonts/font.png', 'fonts/font.fnt');
		this.game.load.bitmapFont('lucky','fonts/font_ab.png', 'fonts/font_ab.fnt');
	},
	create: function(){
		this.game.state.start("game_first_screen");
		//this.game.state.start("game_state");
	}
}

var game_first_screen = {
	create: function(){
		this.stage.backgroundColor = "0x1a1a1a"
		this.title=new screen_first()
		game.add.existing(this.title)
		//game.time.events.add( 6,() => game.state.start('levsel',LevelSelect))
		game.time.events.add( 5000,() => game.state.start('game_state',game_state))
	},
}

var game_state = {
	create: function(){
		this.flag_level_complete=false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		//this.stage.backgroundColor = "0xf4eeee"
		this.stage.backgroundColor = "0x1a1a1a"
		this.background=game.add.sprite(0,0,'background')
		this.background.inputEnabled=true
		this.hero = new character() 
		//this.background.events.onInputUp.add(function(){this.hero.spaceKey.isDown=true},this)
		//this.background.events.onInputUp.add(this.hero.launch,this)
		//this.background.events.onInputDown.add(function(){this.hero.spaceKey.isDown=false},this)
		//this.background.events.input.add(this.hero.launch,this)

		this.canon=[]
		this.canon[0]=new weapon(0,1400,1800,300,0,this.hero.flag_level_complete) 
		this.canon[1]=new weapon (w+150,1000,800,990,135,this.hero.flag_level_complete)

		this.tween_characteristic = game.add.tween(this.canon[0]).to({y:0},1200,Phaser.Easing.Linear.None,true,0,-1)
		this.tween_characteristic.yoyo(900,true)
		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		game.add.existing(this.hero)
	},
	update:function(){
	if(this.hero.flag_show_button==false){
		for (var i = 0; i < this.canon.length; i++){
			this.canon[i].visible=false
			this.canon[i].weapon.bullets.visible=false
		}
	}
		if(this.hero.flag_level_complete){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < this.canon.length; j++){
					this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
				}
			}
		}

		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.collide(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				game.physics.arcade.collide(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
			}
		}
		game.input.onTap.add(onTap,this);
		function onTap(pointer, doubleTap) {
			if(this.hero.flag_level_complete==false){

			if (doubleTap)
			{
				console.log("value");
			}
			else
			{
this.hero.flag_spacekey=false
				this.hero.launch_with_mouse()
				//game.time.events.add( 500,function(){this.flag_spacekey=false})
				
			}
		}
		}
	},
}

var menu_level_select = {
	create: function(){
		this.stage.backgroundColor = "0x1a1a1a"
		this.row=5
		this.line=6
		this.button={}
		this.interspace=200
		this.espacement_x=(w-(this.row-2)*this.interspace)*.5
		this.espacement_y=(h-(this.line-1)*this.interspace)*.5
		//	for (var i = 0; i < this.row; i++) {
		//		this.button[i]=[]
		//		for (var j = 0; j < this.line; j++) {
		//			this.button[i][j]=game.add.button(this.espacement_x+i*this.interspace,this.espacement_y+j*this.interspace,'button_menu_level_select',select_level,this)
		//			this.button[i][j].anchor.setTo(.5,.5)
		//			this.button[i][j].text=game.add.bitmapText(this.espacement_x+i*this.interspace,this.espacement_y+j*this.interspace,'fo','1',100)
		//			this.button[i][j].text.anchor.setTo(.5,.5)

		//			game.add.existing(this.button[i][j])
		//			game.add.existing(this.button[i][j].text)



	},
	update:function(){
	},
}

game = new Phaser.Game(1280,1920,Phaser.CANVAS,'game' )
game.state.add('boot',bootstate)
game.state.add('preload',preloadstate)
game.state.add('game_first_screen',game_first_screen)
game.state.add('game_state',game_state)
game.state.add('menu_level_select',menu_level_select)
game.state.add('levsel', LevelSelect); // note: first parameter is only the name used to refer to the state
game.state.start('boot',bootstate)








