//todo : body enbale false lorsque touché un projectile violet
function main(){
	this.some_value=4
	var gui
	var PLAYER_DATA = null // just declare as global variable for now
	var ratio_device=window.screen.width/window.screen.height
	var h=1920
	var w=1280
	var time_hide=500
	var h2=h*.5
	var w2=640
	var level_number=0
	var debug_mode=false
	var debug_position=true
	var level_json={}
for (var i = 0; i < 20 ; i++) {
	var val=100
	//level_json.push(val)
}
	//level_json=[0,{can0:"jhon"}]
	//console.log(level_json[0].val,"le")
	var canon=[]
	var pulsar=[]
	var asteroid=[]
	var neon=[]
	var hero
	var flag_level_complete=false
	var flag_hide=true
	//ADS
	var bannerStatus;
	var interstitialStatus;

	var banner;
	var interstitial;
	var demoPosition;

	var backgroundTexture;
	var button1Texture;
	var button2Texture;

	var adService;
	var container;

	//var level={}
	screen_first = function(){
		Phaser.Sprite.call(this,game,w2,200,'title')
		this.anchor.setTo(.5,.5)
		this.button_restart=game.add.button(w2,h2+400,'button_menu',this.next_menu,this)
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
		this.game.state.start("level"+level_number);
		console.log('next-level')
	}
	screen_first.prototype.next_menu = function() {
		this.game.state.start("levsel");
		console.log('next-level')
	}

	screen_first.prototype.explosion = function() {
		this._x=game.rnd.integerInRange(0,w)
		this._y=game.rnd.integerInRange(0,h)
		this.particle = game.add.emitter(this._x,this._y,8)
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

	character = function(obj){
		Phaser.Sprite.call(this,game,w2,h+500,'rect')
		this.flag_mouse=false
		this.flag_show_button=true
		this.cible_shadow=game.add.sprite(w2,300,'cible')
		this.cible_shadow.anchor.setTo(.5,.5)
		this.cible_shadow.scale.setTo(1.5,1.5)
		this.cible_shadow.alpha=.2
		this.grid=game.add.sprite(0,0,'grid')
		this.grid.visible=false
		//cible
		this.cible=game.add.sprite(w2,300,'cible')
		this.cible.anchor.setTo(.5,.5)
		game.physics.arcade.enable(this.cible,Phaser.Physics.ARCADE)
		this.cible.body.immovable=true
		this.cible.scale.setTo(1.5,1.5)
		this.anchor.setTo(.5,.5)
		this.flag_level_complete=false
		this.flag_hide_enemies=false
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flag_spacekey=true
		this.count=-1
		this.player={}
		for (var i = 0; i < 3; i++){
			this.player[i]=game.add.sprite(w2,1980,'rect')	
			game.physics.arcade.enable(this.player[i],Phaser.Physics.ARCADE)
			this.player[i].anchor.setTo(.5,.5)
			this.player[i].enableBody=true
			this.player[i].flag_check=true
			this.player[i].flag_cant_explode=true
		} 
		this.score = game.add.bitmapText(w2,300,'fo','',100)
		this.score.anchor.setTo(.5,.5)
		this.life = game.add.bitmapText(w2,1550,'fo','3',120)
		this.life.anchor.setTo(.5,.5)
		this.sound_launch=game.add.audio('launch')
		this.sound_star=game.add.audio('coin')
		this.sound_pop=game.add.audio('pop_minder')
		this.button_restart=game.add.button(w2,h2,'restart',this.restart_level,this)
		this.button_restart.anchor.setTo(.5,.5)
		this.button_restart.scale.setTo(0,0)
		this.button_restart.visible=false
		this.button_next=game.add.button(w2,this.cible.y,'next',this.next_level,this)
		this.button_next.anchor.setTo(.5,.5)
		this.button_next.scale.setTo(0,0)
		this.button_next.visible=false
		this.button_video=game.add.button(w2,h2+400,'button_video',() => this.next_level_with_video(obj),this)
		this.button_video.anchor.setTo(.5,.5)
		this.button_video.scale.setTo(0,0)
		this.button_video.visible=false
		this.star= this.game.add.sprite(w2, h2-320, 'star', 0);
		this.star.anchor.setTo(.5,.5)
		this.star.frame=2
		this.star.visible=false
		this.star.scale.setTo(0,0)
		this._levelNumber = 1;
		this.count_dead=0
		this.anim_cible()
	}

	character.prototype = Object.create(Phaser.Sprite.prototype)
	character.prototype.constructor = character

	character.prototype.audio_star = function() {
		this.sound_star.play()
	}

	character.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	character.prototype.checkicharacterisloossomewhere = function(n) {
		if(this.player[n].flag_check)
			this.player[n].flag_check=false
		game.time.events.add( 6000,() => this.checkicharacterisloossomewhere2(n),this )
	}

	character.prototype.checkicharacterisloossomewhere2 = function(n) {
		if(this.flag_level_complete==false){
			console.log("checkicharacterisloossomewhere");
			this.explode(w2,0,n)	
			this.life.text=3-(this.count+1)
			console.log("this.life.text",this.life.text);
			if(this.count==2){
				this.life.text='' 
			}
		}
	}

	character.prototype.audio_launch = function() {
		this.sound_launch.play()
	}

	character.prototype.anim_cible = function() {
		this.tween6 = game.add.tween(this.cible_shadow.scale).to({x:3.0,y:3.0},750,Phaser.Easing.Linear.None,true,0,-1)
		this.tween7 = game.add.tween(this.cible_shadow).to({alpha:0.01},750,Phaser.Easing.Exponential.In,true,0,-1)
		this.tween6.onComplete.add(function(){this.cible_shadow.scale.setTo(0,0)},this)	
		this.tween7.onComplete.add(function(){this.cible_shadow.alpha=0},this)	
	}

	character.prototype.show_star = function() {
		this.star.visible=true	
		console.log(this.star.frame,"this.star.frame");
		this.tween5 = game.add.tween(this.star.scale).to({x:1,y:1},800,Phaser.Easing.Linear.None,true,600)
		this.tween5.onComplete.add(this.audio_star,this)
	}

	character.prototype.wins=function(){
		this._levelNumber=level_number+1
		// just testing, award random nr of stars
		//var randstars = this.game.rnd.integerInRange(1, 3);
		var randstars = this.star.frame
		//this._stars = this.game.add.bitmapText(160, 200, 'fo', 'You get '+randstars+' stars!', 48);
		console.log("this._levelNumber",this._levelNumber);
		// set nr of stars for this level
		PLAYER_DATA[this._levelNumber-1] = randstars;
		console.log(PLAYER_DATA);
		// unlock next level
		if (this._levelNumber < PLAYER_DATA.length) {
			if (PLAYER_DATA[this._levelNumber] < 0) { // currently locked (=-1)
				PLAYER_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
			}
		};
		// and write to local storage
		window.localStorage.setItem('mygame_progress', JSON.stringify(PLAYER_DATA));
	}
	character.prototype.restart_level = function() {
		this.next_niveau=level_number
		this.game.state.start('level'+this.next_niveau,true,false);
		console.log('restart-level')
	}

	character.prototype.next_level = function() {
		this.next_niveau=level_number+1
		this.game.state.start('level'+this.next_niveau,true,false);
		console.log('next-level')
	}

	character.prototype.next_level_with_video = function(obj) {
		this.next_niveau=level_number+1
		console.log('next-level')
		obj.show();
		obj.on("dismiss", function(){
			this.game.state.start('level'+this.next_niveau,true,false);
			console.log("Interstitial dismissed");
		})

	}

	character.prototype.launch_with_mouse=function(){
		if(this.flag_level_complete==false && this.flag_mouse==false){
			this.flag_mouse=true
			game.time.events.add( 400,function(){this.flag_mouse=false},this )
			this.count=this.count+1
			console.log("this.count in launch",this.count,this.life.text,"this.life.text");
			switch(this.count){
				case 0:
					this.life.text=2 
					this.audio_launch()
					this.checkicharacterisloossomewhere(this.count)
					this.player[this.count].visible=true
					this.player[this.count].body.velocity.y=-800
					break
				case 1:
					this.life.text=1 
					this.audio_launch()
					this.checkicharacterisloossomewhere(this.count)
					this.player[this.count].visible=true
					this.player[this.count].body.velocity.y=-800
					break
				case 2:
					this.life.text='' 
					this.audio_launch()
					this.checkicharacterisloossomewhere(this.count)
					this.player[this.count].visible=true
					this.player[this.count].body.velocity.y=-800
					break
				default:
					this.life.text='' 
					break
			}
		}
	}

	character.prototype.launch=function(){
		if(this.flag_level_complete==false && this.flag_spacekey==false){
			game.time.events.add( 500,function(){this.flag_spacekey=true;console.log('couco',this.flag_spacekey)},this )
			this.count=this.count+1
			if(this.count <= 2){
				console.log(this.count,"this.count");
				this.player[this.count].visible=true
				this.player[this.count].body.velocity.y=-800
				this.checkicharacterisloossomewhere(this.count)
			}
		}
	}

	character.prototype.explode_cible=function(){
		this.particle = game.add.emitter(this.cible.x,this.cible.y,8)
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
			this.on_explode(n)
			this.player[n].flag_cant_explode=false
			this.player[n].visible=false
			this.particle = game.add.emitter(posx,posy,8)
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
			this.player[n].body.enable=false
		}
	}

	character.prototype.on_explode=function(n){
		this.count_dead=this.count_dead+1
		for (var i = 0; i < 3; i++) {
			if(this.count_dead==3){
				console.log('this.count_dead',this.count_dead)
				this.decide_if_show_button_restart_level()
			}	
		}
	}

	character.prototype.decide_if_show_button_restart_level = function() {
		console.log('decide')
		game.time.events.add( 2000,this.show_button_restart_level,this )
		game.time.events.add( 2000,this.show_button_video,this )
		this.flag_hide_enemies=true
	}

	character.prototype.land=function(n){
		console.log("land");
		this.flag_level_complete=true
		this.cible.body.enable=false
		this.player[n].body.enable=false
		this.tween0=game.add.tween(this.player[n]).to({x:w2,y:300},500,Phaser.Easing.Linear.None,true,0)
		this.tween0.onComplete.add(() => this.scale_x(n),this)	
	}

	character.prototype.calculate_star = function() {
		console.log(this.count,"calculate_star")
		switch(this.count){
			case 0:
				this.star.frame=3
				break
			case 1:
				this.star.frame=2
				break
			case 2:
				this.star.frame=1
				console.log("this.star.frame in calculate_star",this.star.frame,this.count);
				break
			case 3:
				this.star.frame=0
				break
			default:
				break
		}
	}

	character.prototype.scale_x = function(n){
		this.tween1=game.add.tween(this.player[n].scale).to({x:4.5,y:4.5},500,Phaser.Easing.Bounce.Out,true,0)
		this.tween1.onComplete.add(this.explode_cible,this)
		this.show_button_restart_level_complete()
		game.time.events.add( 300,this.audio_pop,this )
		this.calculate_star()
		this.show_star()
		this.wins()
	}

	character.prototype.show_button_restart_level_complete = function() {
		if(this.flag_show_button){
			this.flag_show_button=false
			this.show_button_restart_level()
			this.show_button_next_level()
		}
	}

	character.prototype.show_button_next_level = function() {
		this.button_next.visible=true
		this.tween3=game.add.tween(this.button_next.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	}

	character.prototype.show_button_restart_level=function(){
		this.flag_show_button=false
		this.button_restart.visible=true
		this.tween2=game.add.tween(this.button_restart.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	}

	character.prototype.show_button_video = function() {
		if(this.flag_level_complete==false){
			this.button_video.visible=true
			this.tween4=game.add.tween(this.button_video.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
		}	
	}

	character.prototype.update=function(){
		if (this.spaceKey.isDown && this.flag_spacekey)
		{
			this.flag_spacekey=false
			this.launch()
		}
	}

	_asteroid = function(posx,posy,speed,radius){
		this.name="asteroid"
		this.radius=radius
		this.posx=posx
		this.posy=posy
		this.speed=speed
		this.flag=true
		Phaser.Sprite.call(this,game,this.posx,this.posy,'particle_bullet_color')
		this.anchor.x=.5
		this.anchor.y=.5
		this.axe=game.add.sprite(this.posx,this.posy,'axe')
		this.axe.anchor.setTo(.5,.5)
		if(debug_position){
			this.visible=true
		}else{
			this.visible=false
		}
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.input.enableSnap(40,40,true,true)
		game.physics.arcade.enable(this.axe);
		this.axe.body.immovable=true
		this.particle = game.add.emitter(this.x, this.y-25, 8)
		this.particle.makeParticles("particle_bullet_color")
		this.particle.setXSpeed(0,0)
		this.particle.setYSpeed(0,0)
		this.particle.minParticleAlpha=.3
		this.particle.minParticleScale = .1
		this.particle.maxParticleScale = .7
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=true
		this.particle.start(true,500,20)

	}

	_asteroid.prototype = Object.create(Phaser.Sprite.prototype)
	_asteroid.prototype.constructor = _asteroid

	_asteroid.prototype.update = function() {
		if(this.flag){
			var period = game.time.now * this.speed;
			this.axe.x = this.x + Math.cos(period) * this.radius;
			this.axe.y = this.y + Math.sin(period) * this.radius;	
			this.particle.x=this.axe.x
			this.particle.y=this.axe.y
		}
	}

	_asteroid.prototype.hide = function() {
		this.flag=false
		this.particle.on=false
		this.tweenh=game.add.tween(this.axe.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	}

	_pulsar = function(delay,time,posx,posy,speed,scale_factor){
		this.scale_factor=scale_factor
		console.log('this.scale_factor',this.scale_factor)
		this.name="pulsar"
		this.delay=delay
		this.time=time
		this.posx=posx
		this.posy=posy
		this.speed=speed
		Phaser.Sprite.call(this,game,this.posx,this.posy,'pulsar')
		this.anchor.x=0.5
		this.anchor.y=.5
		this.scale.setTo(0,0)
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.input.enableSnap(40,40,true,true)
		game.physics.arcade.enable(this);
		this.body.immovable=true
		this.tweens()
	}

	_pulsar.prototype = Object.create(Phaser.Sprite.prototype)
	_pulsar.prototype.constructor = _pulsar

	_pulsar.prototype.tweens = function() {
		this.tween0=game.add.tween(this.scale).to({x:this.scale_factor,y:this.scale_factor},this.time,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}
	_pulsar.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		console.log("remove");
		this.scale.setTo(0,0)
		this.tween0=game.add.tween(this.scale).to({x:this.scale_factor,y:this.scale_factor},this.time,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_pulsar.prototype.hide = function() {
		this.tween0.pause()
		this.tweenh=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
		this.tweenh.onComplete.add(function(){this.visible=false},this)
	}

	_neon = function(delay,posx,posy,speed){
		this.name="neon"
		this.delay=delay
		this.posx=posx
		this.posy=posy
		this.speed=speed
		Phaser.Sprite.call(this,game,this.posx,this.posy,'neon')
		this.anchor.x=0.1
		this.anchor.y=.5
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.input.enableSnap(40,40,true,true)
		game.physics.arcade.enable(this);
		this.body.immovable=true
		this.tweens()
		//this.axe=game.add.sprite(this.posx,this.posy,'neon_axe')

	}

	_neon.prototype = Object.create(Phaser.Sprite.prototype)
	_neon.prototype.constructor = _neon


	_neon.prototype.tweens = function() {
		this.tween0=game.add.tween(this).to({x:this.posx+300},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_neon.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		console.log("remove");
		this.x=this.posx
		this.y=this.posy
		this.tween0=game.add.tween(this).to({x:this.posx+300},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_neon.prototype.hide = function() {
		this.tweenh=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	}

	_weapon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
		this.number=number
		this.special_color=special_color
		this.kill_with_world=kill_with_world
		this.delay=delay
		this.name="canon"
		this.posx=posx
		this.posy=posy
		this.flag_explode=false
		this.speed=speed
		this.angular=angular
		this.frequency=frequency
		this._flag=_flag
		this.variance=variance
		this.sound_pop=game.add.audio('pop')
		this._flag=true
		//canon
		Phaser.Sprite.call(this,game,this.posx,this.posy,'canon')
		this.anchor.setTo(.5,.5)
		this.angle=this.angular
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.input.enableSnap(40,40,true,true)

		game.physics.arcade.enable(this);
		if(this.special_color=="vrai"){
			this.weapon=game.add.weapon(9,'bullet_color')
		}else{
			this.weapon=game.add.weapon(9,'bullet')	
		}

		if(this.kill_with_world=="faux"){
			for (var i = 0; i <  9; i++) {
				this.weapon.bulletCollideWorldBounds=true
				this.weapon.bullets.children[i].body.bounce.setTo(1,1)
			}
		}else{
			this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		}
		//  Because our bullet is drawn facing up, we need to offset its rotation:
		this.weapon.bulletAngleOffset = 0;

		//  The speed at which the bullet is fired
		this.weapon.bulletSpeed = this.speed;

		//  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		this.weapon.fireRate = this.frequency ;

		//  Add a variance to the bullet angle by +- this value
		this.weapon.bulletAngleVariance = this.variance;

		//  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		this.weapon.trackSprite(this,0,0,true);
		game.time.events.add( this.delay,function(){this._flag=false},this )
	}

	_weapon.prototype = Object.create(Phaser.Sprite.prototype)
	_weapon.prototype.constructor = _weapon
	_weapon.prototype.update = function(){
		if(this._flag==false){
			this.weapon.fire()	
		}
	}

	_weapon.prototype.transition = function() {
		this.tween_characteristic = game.add.tween(this.canon).to({x:posx,y:posy},time,Phaser.Easing.Linear.None,true,delay)
	}

	_weapon.prototype.kill = function() {
		console.log('kill')	
	}
	_weapon.prototype.fire = function() {
		this._flag=true
		this.weapon.fireRate = this.frequency ;
		this.weapon.bulletSpeed = this.speed;
		this.angle=this.angular
		this.weapon.bulletAngleVariance = this.variance;
		game.time.events.add( 10,function(){this._flag=false},this )
		
		//this.weapon.fire()
	}

	_weapon.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	_weapon.prototype.explode_bullet=function(){
		if(this.flag_explode==false){
			this.flag_explode=true
			this.audio_pop()
			if(this.special_color=="vrai"){
				this.weapon.bullets.forEach(function(item){
					if(item.alive){	
						this.particle = game.add.emitter(item.x,item.y,8)
						this.particle.makeParticles("particle_bullet_color")
						this.particle.minParticleSpeed.setTo(-300,-300)
						this.particle.maxParticleSpeed.setTo(800,800)
						this.particle.setAlpha(.8, .6)
						this.particle.minParticleScale = .2
						this.particle.maxParticleScale = .5
						this.particle.minRotation = 0
						this.particle.maxRotation = 0
						this.particle.on=false
						this.particle.start(true,9000,null,20)
					}})
			}else{
				this.weapon.bullets.forEach(function(item){
					if(item.alive){	
						this.particle = game.add.emitter(item.x,item.y,8)
						this.particle.makeParticles("particle_bullet")
						this.particle.minParticleSpeed.setTo(-300,-300)
						this.particle.maxParticleSpeed.setTo(800,800)
						this.particle.setAlpha(.8, .6)
						this.particle.minParticleScale = .2
						this.particle.maxParticleScale = .5
						this.particle.minRotation = 0
						this.particle.maxRotation = 0
						this.particle.on=false
						this.particle.start(true,9000,null,20)
					}})
			}
		}
	}

	var createBanner= function(){
	}

	var createInterstitial=function(){
	}

	var createBanner2= function(){

		if (!window.Cocoon || !Cocoon.Ad || !Cocoon.Ad.AdMob) {
			alert('Cocoon AdMob plugin not installed');
			return;
		}
		// nécessaire 
		adService = Cocoon.Ad.AdMob;
		adService.configure({
			ios: {
				banner:"ca-app-pub-7686972479101507/8873903476",
				interstitial:"ca-app-pub-7686972479101507/8873903476",
			},
			android: {
				banner:"ca-app-pub-7686972479101507/4443703872",
				interstitial:"ca-app-pub-7686972479101507/4443703872"
			}
		});

		console.log('createBanner')
		banner = adService.createBanner();

		banner.on("load", function(){
			console.log("Banner loaded " + banner.width, banner.height);
		});

		banner.on("fail", function(){
			console.log("Banner failed to load");
		});

		banner.on("show", function(){
			console.log("Banner shown a modal content");
		});

		banner.on("dismiss", function(){
			console.log("Banner dismissed the modal content");
		});

		//load banner
		banner.load();

		//show banner
		banner.show()
		demoPosition = Cocoon.Ad.BannerLayout.BOTTOM_CENTER;
		banner.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
		game.time.events.add( 1000,function(){banner.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER)})
	}

	var createInterstitial2=function() {

		adService = Cocoon.Ad.AdMob;
		adService.configure({
			ios: {
				banner:"ca-app-pub-7686972479101507/8873903476",
				interstitial:"ca-app-pub-7686972479101507/8873903476",
			},
			android: {
				banner:"ca-app-pub-7686972479101507/4443703872",
				interstitial:"ca-app-pub-7686972479101507/4443703872"
			}
		});

		interstitial = adService.createInterstitial();

		interstitial.on("load", function(){
			console.log("Interstitial loaded");
		});
		interstitial.on("fail", function(){
			console.log("Interstitial failed");
		});
		interstitial.on("show", function(){
			console.log("Interstitial shown");
		});
		interstitial.on("dismiss", function(){
			console.log("Interstitial dismissed");
		});

		interstitial.on("click", function(){
			alert("click")
			console.log("Interstitial dismissed");
			if(level_number < 19){
				this.game.state.start("level"+level_number+1);
			}
		});
		interstitial.load()
	}

	var bootstate= {
		preload: function(){
			console.log("%cStarting minimalistic game", "color:white; background:red");
			this.load.image("loading","assets/loading.png"); 
			this.load.image("loading_back","assets/loading_back.png"); 
		},
		create: function(){
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
			this.scale.pageAlignHorizontally = true
			this.scale.pageAlignVertically = true
			this.scale.refresh()
			this.game.stage.backgroundColor='#1a1a1a'
			this.state.start("preload");
		},
	}

	var preloadstate = {
		preload: function(){ 
			//loadingBar
			var loadingBar_back = this.add.sprite(w2,h2,"loading_back");
			loadingBar_back.anchor.setTo(0.5,0.5);
			var loadingBar = this.add.sprite(w2,h2,"loading");
			loadingBar.anchor.setTo(0.5,0.5);
			this.load.setPreloadSprite(loadingBar);
			//audio_move
			this.game.load.audio("coin","sounds/coin.ogg");
			this.game.load.audio("pop_minder","sounds/pop_minder.ogg");
			this.game.load.audio("pop","sounds/pop.ogg");
			this.game.load.audio("launch","sounds/launch.ogg");
			//images
			this.game.load.image("grid","assets/grid.png");
			this.game.load.image("pulsar","assets/pulsar.png");
			this.game.load.image("axe","assets/axe.png");
			this.game.load.image("neon_axe","assets/neon_axe.png");
			this.game.load.image("neon","assets/neon.png");
			this.game.load.image("title","assets/title.png");
			this.game.load.spritesheet('star','assets/star.png', 400, 100);
			this.game.load.image("levelselecticons","assets/levelselecticons.png");
			this.game.load.image("background","assets/background.png");
			this.game.load.image("button_video","assets/button_video.png");
			this.game.load.image("button_menu","assets/button_menu.png");
			this.game.load.image("button_play","assets/button_play.png");
			this.game.load.image("button_menu_level_select","assets/button_menu_level_select.png");
			this.game.load.image("restart","assets/restart.png");
			this.game.load.image("next","assets/next.png");
			this.game.load.image("canon","assets/canon.png");
			this.game.load.image("cible","assets/cible.png");
			this.game.load.image("bullet_color","assets/bullet_color.png");
			this.game.load.image("bullet","assets/bullet.png");
			this.game.load.image("particle_bullet_color","assets/particle_bullet_color.png");
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
			this.game.stage.backgroundColor = '#1a1a1a'
			this.game.state.start("game_first_screen");
		}
	}

	var game_first_screen = {
		create: function(){
			this.game.stage.backgroundColor = '#1a1a1a'
			this.title=new screen_first()
			game.add.existing(this.title)
			this.initProgressData()
			createBanner()
		},

		initProgressData: function() {

			// array might be undefined at first time start up
			if (!PLAYER_DATA) {
				// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
				var str = window.localStorage.getItem('mygame_progress');

				// error checking, localstorage might not exist yet at first time start up
				try {
					PLAYER_DATA = JSON.parse(str);
				} catch(e){
					PLAYER_DATA = []; //error in the above string(in this case,yes)!
				};
				// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
				if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
					PLAYER_DATA = [];
				};
			};
		},
	}

	var level0 = {
		create: function(){
	function send() {
		console.log('msg-seznd')
		var link = 'mailto:email@example.com?subject=Message from '
			+document.getElementById('email')
			+'&body='+document.getElementById('email');
		window.location.href = link;
	}
	send()
			level_number=0
			createInterstitial()
			//check_storage(this.create_object)
			this.create_object=function(){
			hero = new character(interstitial) 
			//weapon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
			canon[0]=new _weapon(0,800,w-200,800,900,90,0,180,hero.flag_level_complete,"vrai","faux")
			canon[1]=new _weapon(1,100,0,1200,400,900,0,0,hero.flag_level_complete,"vrai","faux") 
			//asteroid = function(posx,posy,speed,radius){
			asteroid[0]=new _asteroid(240,900,.008,100)
			//neon = function(delay,posx,posy,speed){
			neon[0]=new _neon(0,240,h2+100,300)
			//pulsar = function(delay,time,posx,posy,speed,scale_factor){
			pulsar[0]=new _pulsar(100,500,240,600,900,2)
			}
			check_storage(this.create_object)
			//this.create_object()
			//logic_gui()
			logic_add()
			return level_number
		},
		update:function(){
			logic_update()
		},
		render:function(){
			logic_render()
		},
	}
	var level1 = {
		create: function(){
			flag_hide=true
			level_number=1
			createInterstitial()
			hero = new character(interstitial) 
			//weapon = function(delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
			canon[0]=new _weapon(100,0,1200,400,900,0,0,hero.flag_level_complete,"vrai","faux") 
			console.log("neon[0]",neon[0]);
			//asteroid = function(posx,posy,speed,radius){
			//asteroid[0]=new _asteroid(w2-150,900,.008,100)
			//neon = function(delay,posx,posy,speed){
			//neon[0]=new _neon(0,w2-200,h2+100,.1)
			//pulsar = function(delay,time,posx,posy,speed,scale_factor){
			//pulsar[0]=new _pulsar(100,500,w2+200,800,900,2)
			logic_add()
			return level_number
		},
		update:function(){
			logic_update()
		},
		render:function(){
			logic_render()
		},
	}

	var levsel={
		// define needed variables for mygame.LevelSelect
		preload: function() {
			this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 275, 300);
			this.game.load.bitmapFont('fo','fonts/font.png', 'fonts/font.fnt');
			//this.game.load.bitmapFont('font72', 'font72.png', 'font72.xml'); // created with http://kvazars.com/littera/

			this.initProgressData();
		},

		create: function() {
			this.holdicons = [];
			this.game.stage.backgroundColor = '#1a1a1a'
			;
			this.game.add.sprite(0,0,'background')
			this.text=game.add.bitmapText(640,200,'fo','SELECT A LEVEL!',100);
			this.text.anchor.setTo(.5,.5)
			this.createLevelIcons();
			this.animateLevelIcons();
		},

		update: function() {
			// nothing to do but wait until player selects a level
		},

		render: function() {
			// display some debug info..?
		},

		initProgressData: function() {

			// array might be undefined at first time start up
			if (!PLAYER_DATA) {
				// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
				var str = window.localStorage.getItem('mygame_progress');

				// error checking, localstorage might not exist yet at first time start up
				try {
					PLAYER_DATA = JSON.parse(str);
				} catch(e){
					PLAYER_DATA = []; //error in the above string(in this case,yes)!
				};
				// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
				if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
					PLAYER_DATA = [];
				};
			};
		},

		createLevelIcons: function() {
			var levelnr = 0;


			for (var y=0; y < 5; y++) {
				for (var x=0; x < 4; x++) {
					// next level
					levelnr = levelnr + 1;

					// check if array not yet initialised
					if (typeof PLAYER_DATA[levelnr-1] !== 'number') {
						// value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
						if (levelnr == 1) {
							PLAYER_DATA[levelnr-1] = 0; // level 1 should never be locked
						} else {
							PLAYER_DATA[levelnr-1] = -1;
						};
					};

					// player progress info for this level
					var playdata = PLAYER_DATA[levelnr-1];
					console.log("playdata",playdata);
					// decide which icon
					var isLocked = true; // locked
					var stars = 0; // no stars

					// check if level is unlocked
					if (playdata > -1) {
						isLocked = false; // unlocked
						if (playdata < 4) {stars = playdata;}; // 0..3 stars
					};

					// calculate position on screen
					var xpos = 60 + (x*300);
					var ypos = 320 + (y*300);

					// create icon
					this.holdicons[levelnr-1] = this.createLevelIcon(xpos, ypos, levelnr, isLocked, stars);
					var backicon = this.holdicons[levelnr-1].getAt(0);

					// keep level nr, used in onclick method
					backicon.health = levelnr;

					// input handler
					backicon.inputEnabled = true;
					backicon.events.onInputDown.add(this.onSpriteDown, this);
				};
			};
		},

		// -------------------------------------
		// Add level icon buttons
		// -------------------------------------
		createLevelIcon: function(xpos, ypos, levelnr, isLocked, stars) {

			// create new group
			var IconGroup = this.game.add.group();
			IconGroup.x = xpos;
			IconGroup.y = ypos;

			// keep original position, for restoring after certain tweens
			IconGroup.xOrg = xpos;
			IconGroup.yOrg = ypos;

			// determine background frame
			var frame = 0;
			if (isLocked == false) {frame = 1};

			// add background
			var icon1 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
			IconGroup.add(icon1);

			// add stars, if needed
			if (isLocked == false) {
				var txt = this.game.add.bitmapText(137, 147, 'fo', ''+levelnr, 100);
				txt.anchor.setTo(.5,.5)
				var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', (2+stars));

				IconGroup.add(icon2);
				IconGroup.add(txt);
			}else{
				var txt_locked = this.game.add.bitmapText(137, 147, 'fo', ''+levelnr, 100);
				txt_locked.anchor.setTo(.5,.5)
				txt_locked.tint=0x9a136b
				IconGroup.add(txt_locked);

			};

			return IconGroup;
		},

		onSpriteDown: function(sprite, pointer) {

			// retrieve the iconlevel
			var levelnr = sprite.health;

			if (PLAYER_DATA[levelnr-1] < 0) {
				// indicate it's locked by shaking left/right
				var IconGroup = this.holdicons[levelnr-1];
				var xpos = IconGroup.xOrg;

				var tween = this.game.add.tween(IconGroup)
					.to({ x: xpos+6 }, 20, Phaser.Easing.Linear.None)
					.to({ x: xpos-5 }, 20, Phaser.Easing.Linear.None)
					.to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
					.to({ x: xpos-3 }, 20, Phaser.Easing.Linear.None)
					.to({ x: xpos+2 }, 20, Phaser.Easing.Linear.None)
					.to({ x: xpos }, 20, Phaser.Easing.Linear.None)
					.start();
			} else {
				// simulate button press animation to indicate selection
				var IconGroup = this.holdicons[levelnr-1];
				var tween = this.game.add.tween(IconGroup.scale)
					.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
					.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
					.start();

				// it's a little tricky to pass selected levelnr to callback function, but this works:
				this.onLevelSelected(levelnr-1)
				//tween._lastChild.onComplete.add(function(){this.onLevelSelected(sprite.health);}, this);
			};
		},

		animateLevelIcons: function() {

			// slide all icons into screen
			for (var i=0; i < this.holdicons.length; i++) {
				// get variables
				var IconGroup = this.holdicons[i];
				IconGroup.y = IconGroup.y + 600;
				var y = IconGroup.y;

				// tween animation
				this.game.add.tween(IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
			};
		},

		onLevelSelected: function(levelnr) {
			console.log(levelnr,'rr');
			this.number_level=levelnr
			// pass levelnr variable to 'Game' state
			//this.game.state.states['game']._levelNumber = levelnr;
			//this.game.state.states['game']._levelNumber = levelnr;
			//this.game.state.states('game_state',game_state)
			//this.game.state.start('level0')
			this.game.state.start('level'+this.number_level,true,false)

			//this.state.start('game');
		},
	};
	var logic_add=function(){
		game.add.existing(hero)
		if(canon[0]){
			for (var i = 0; i < canon.length; i++){
				game.add.existing(canon[i])
			}
		}
		if(neon[0]){
			console.log("value");
			for (var i = 0; i < neon.length; i++){
				game.add.existing(neon[i])
			}
		}

		if(pulsar[0]){
			for (var i = 0; i < pulsar.length; i++){
				game.add.existing(pulsar[i])
			}
		}

		if(asteroid[0]){
			for (var i = 0; i < asteroid.length; i++){
				game.add.existing(asteroid[i])
			}
		}
	}

	var logic_update=function(){
		//debug_position && logic_position()
		for (var j = 0; j < 3; j++){
			game.physics.arcade.collide(hero.cible,hero.player[j],() => hero.land(j))
		}

		if (hero.flag_level_complete && flag_hide){
			flag_hide=false
			game.time.events.add( 900,hide_weapon,this )
		}

		if(canon[1]){
		game.physics.arcade.collide(canon[0].weapon.bullets,canon[1].weapon.bullets,touch_between_enemies,null,this)
		}

		if(canon[2]){
		game.physics.arcade.collide(canon[0].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
		game.physics.arcade.collide(canon[1].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
		}

		if(hero.flag_hide_enemies){
		hero.flag_hide_enemies=false
			game.time.events.add( 500,hide_weapon,this )
		}
		if(canon[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < canon.length; j++){
					if(canon[j].special_color=="vrai"){
						game.physics.arcade.collide(canon[j].weapon.bullets,hero.player[i],hide_weapon,null,this)
					}else{
						game.physics.arcade.collide(canon[j].weapon.bullets,hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
					}
				}
			}
		}
		if(neon[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < neon.length; j++){
					game.physics.arcade.collide(neon[j],hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
				}
			}
		}
		if(pulsar[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < pulsar.length; j++){
					game.physics.arcade.collide(pulsar[j],hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
				}
			}
		}

		if(asteroid[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < asteroid.length; j++){
					game.physics.arcade.collide(asteroid[j].axe,hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
				}
			}
		}

		game.input.onTap.add(onTap,this);

		function onTap(pointer, doubleTap) {
			if(hero.flag_level_complete==false){
				if (doubleTap)
				{
					console.log("value");
				}
				else
				{
					hero.flag_spacekey=false
					hero.launch_with_mouse()
				}
			}
		}
	}

	var touch_between_enemies=function(){
			console.log("touch");
	
	}
	var hide_weapon=function(){
			console.log('hide')
			if(canon[0].visible){
				for (var j = 0; j < canon.length; j++){
					canon[j].explode_bullet(canon[j].weapon.bullets)
					canon[j].visible=false
					canon[j].weapon.bullets.visible=false
					canon[j].destroy()
				}
			}
			if(neon[0].visible){
				for (var j = 0; j < neon.length; j++){
					neon[j].hide()
					neon[j].body.enable=false
					neon[j].destroy()
				}
			}

			if(pulsar[0].visible){
				for (var j = 0; j < pulsar.length; j++){
					pulsar[j].hide()
					pulsar[j].body.enable=false
					pulsar[j].destroy()
				}
			}

			if(asteroid[0].visible){
				for (var j = 0; j < asteroid.length; j++){
					asteroid[j].hide()
					asteroid[j].axe.body.enable=false
					asteroid[j].visible=false
					asteroid[j].destroy()
				}
			}
	
	}

	var show_grid_on_logic_position=function(sprite){
		hero.grid.visible=true	
		if(debug_position){
			gui && gui.destroy()
			gui=new dat.GUI()
			gui.start=true
			switch(sprite.name){
				case "canon":
					var guit={}
					gui.add(sprite,'name')
					guit.speed=gui.add(sprite,'speed',0,5000)
					guit.speed.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
					guit.frequency=gui.add(sprite,'frequency',0,5000)
					guit.frequency.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
					guit.angular=gui.add(sprite,'angular',0,360)
					guit.angular.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
					guit.variance=gui.add(sprite,'variance',0,1000)
					guit.variance.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
						
					break
				case "pulsar":
					var guit={}
					gui.add(sprite,'name')
					guit.speed=gui.add(sprite,'speed',300,3000)
					guit.speed.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
					break;
				case "asteroid":
					gui.add(sprite,'name')
					gui.add(sprite,'radius',100,500)
					gui.add(sprite,'speed',0,.01)

					break;
				case "neon":
					var guit={}
					gui.add(sprite,'name')
					guit.speed=gui.add(sprite,'speed',300,3000)
					guit.speed.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
					})
					break;
				default:
					break;
			}
		}
	}

	var check_storage=function(_create_object){
		//'canon_local'+level_number=[]
		//level_number=2

		_create_object()	
		//console.log('canon_local'+level_number)
		//for (var i = 0; i < 2; i++){
			//'canon'+level_number+i=0
			//console.log('canon'+level_number+i)
		//}
	//}

		//_weapon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
		//for (var i = 0; i < canon.length; i++){
		      //canon_local+level_number[i]="sometihi"	
		      //console.log(canon_local+level_number[i])	
		      //can.level_number+i= JSON.parse(localStorage.getItem('_canon_local'+level_number+i))
		      //if(can.level_number+i){
		      	//hero = new character(interstitial) 
		      	//canon[0]=new _weapon(0,800,this.canon_local+_level_num+i.x,this.canon_local+_level_num+i.y,900,90,0,180,hero.flag_level_complete,"vrai","faux")
		      //}else{
		      	//_create_object()	
		      //}
		//}
	}

	var logic_position=function(sprite){
		if (debug_position){
			hero.grid.visible=false	
			console.log("level_number",level_number)
			switch(sprite.name){
				case "canon":
					
					var val='canon'+sprite.number
					console.log(val)
					level_json[level_number].val = {
						name:sprite.name,
						frequency: sprite.frequency,
						x: sprite.x,
						y:sprite.y,
					};
					console.log(level_json[0].val)
					localStorage.setItem('_canon_local'+level_number+sprite.number, JSON.stringify(canon_local[sprite.number]))
					var proj=JSON.parse( localStorage.getItem( '_canon_local'+level_number+sprite.number ) ) 
					console.log(proj.y,"proj.y")
				default:
					break;
			}
		}







		if(canon[0]){
			for (var j = 0; j < canon.length; j++){
				console.log("canon"+j+".x",canon[j].x,"canon"+j+".y",canon[j].y)
			}
		}
		if(asteroid[0]){
			for (var j = 0; j < asteroid.length; j++){
				console.log("asteroid"+j+".x",asteroid[j].x,"asteroid"+j+".y",asteroid[j].y)
			}
		}
		if(pulsar[0]){
			for (var j = 0; j < pulsar.length; j++){
				console.log("pulsar"+j+".x",pulsar[j].x,"pulsar"+j+".y",pulsar[j].y)
			}
		}
		if(neon[0]){
			for (var j = 0; j < neon.length; j++){
				console.log("neon"+j+".x",neon[j].x,"neon"+j+".y",neon[j].y)
			}
		}
	}

	var logic_render=function(){
		if(debug_mode){
			game.debug.body(hero.cible_shadow)
			game.debug.body(hero.cible)
			for (var i = 0; i < 3; i++){
				game.debug.body(hero.player[i])
			}
			if(neon[0]){
				for (var i = 0; i < neon.length; i++){
					game.debug.body(neon[i])
				}
			}

			if(pulsar[0]){
				for (var i = 0; i < pulsar.length; i++){
					game.debug.body(pulsar[i])
				}
			}

			if(asteroid[0]){
				for (var i = 0; i < asteroid.length; i++){
					game.debug.body(asteroid[i])
				}
			}

			if(canon[0]){
				for (var i = 0; i < canon.length; i++){
					canon[i].weapon.bullets.forEach(function(item){
						game.debug.body(item)	
					})
				}
			}
		}
	}
	game = new Phaser.Game(1280,1920,Phaser.CANVAS,'game' )
	game.state.add('boot',bootstate)
	game.state.add('preload',preloadstate)
	game.state.add('game_first_screen',game_first_screen)
	//game.state.add('game_state',game_state)
	//for (var i = 0; i < 1; i++) {
	//game.state.add('level'+i,level+i)
	//game.state.add('level'+i,level+i)
	//}
	game.state.add('level0',level0)
	game.state.add('level1',level1)
	//game.state.add('menu_level_select',menu_level_select)
	game.state.add('levsel', levsel); // note: first parameter is only the name used to refer to the state
	game.state.start('boot',bootstate)
}
main()
//document.addEventListener('deviceready',main,false)

