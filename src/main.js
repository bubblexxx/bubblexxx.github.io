
/*
 *************************************************************************
 * 
 * bubblexxxL
 * __________________
 * 
 *  [2016] - [2017] Gregory Dailly  
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Gregory Dailly and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Gregory Dailly
 * and its suppliers and may be covered by Europe law and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Gregory Dailly - espace3d@gmail.com - 0032486/925736 
 * rue de Brionsart 36a-5340 Gesves-Belgium
 */


//TODO
//normalement réglé
//si dernier character et checkicharacterisloossomewhere les boutton restart et videos ne s'affiche pas
//problem avec charcater launch dans update
//problem de flag hide true et false qui se déclenche ou pas

//hide_weapon ne se declenche pas toujours
//1081 retablir createBanner
//1110 retablir createInterstitial
//body enbale false lorsque touché un projectile violet
//si canon = 1 dans check storage 
//explode dalle neon asteroid pulsar
//changer couleur particle d'asteroid
//detecter si gsm ou ordi et régler admob et cordova en fonction


function main(){
	alert("down")
	var DEBUG = (function(){
		var timestamp = function(){};
		timestamp.toString = function(){
			return "[DEBUG " + (new Date).toLocaleTimeString() + "]";    
		};

		return {
			log: console.log.bind(console, '%s', timestamp)
		}
	})();

	DEBUG.log("myapp");              
	//chartboost_rewardvideo
	var videoreward;

	this.some_value=4
	var gui
	var PLAYER_DATA 
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
	//
	//console.log(level_json[0].val,"le")
	var canon=[]
	var pulsar=[]
	var asteroid=[]
	var neon=[]
	var dalle=[]
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

	var email=JSON.stringify(localStorage);

	//var level={}
	screen_first = function(){
		Phaser.Sprite.call(this,game,w2,450,'title')
		this.anchor.setTo(.5,.5)
		this.button_menu=game.add.button(w2,h2+400,'button_menu',this.next_menu,this)
		this.button_menu.anchor.setTo(.5,.5)
		this.button_next=game.add.button(w2,h2,'button_play',this.next_level,this)
		this.button_next.anchor.setTo(.5,.5)
		this.button_menu.scale.setTo(0,0)
		this.button_menu.visible=false
		this.button_next.scale.setTo(0,0)
		this.button_next.visible=false
		game.time.events.loop( 500,this.explosion,this )
		game.time.events.add( 200,this.show_button,this )
		this.sound_click=game.add.audio('click')
	}

	screen_first.prototype = Object.create(Phaser.Sprite.prototype)
	screen_first.prototype.constructor = screen_first

	screen_first.prototype.audio_click = function() {
		console.log("click")
		this.sound_click.play()
		console.log("click")
	}


	screen_first.prototype.next_level = function() {
		this.tween_scale_button_play = game.add.tween(this.button_next.scale).to({x:.8,y:.8},150,Phaser.Easing.Bounce.Out,true,0)
		this.audio_click()
		this.tween_scale_button_play.onComplete.add(function(){
			this.game.state.start("level"+level_number);
			console.log('next-level')
		},this)
		}

	screen_first.prototype.next_menu = function() {
		this.tween_scale_button_menu = game.add.tween(this.button_menu.scale).to({x:.8,y:.8},150,Phaser.Easing.Bounce.Out,true,0)
		this.audio_click()
		this.tween_scale_button_menu.onComplete.add(function(){
		this.game.state.start("levsel");
		this.audio_click()
		console.log('next-level')
		},this)
	}

	screen_first.prototype.explosion = function() {
		this._x=game.rnd.integerInRange(0,w)
		this._y=game.rnd.integerInRange(0,h)
		this.particle = game.add.emitter(this._x,this._y,3)
		this.particle.makeParticles("rect")
		this.particle.minParticleSpeed.setTo(-600,-600)
		this.particle.maxParticleSpeed.setTo(800,800)
		this.particle.setAlpha(.5, .2)
		this.particle.minParticleScale = .2
		this.particle.maxParticleScale = .5
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
		this.particle.start(true,3900,null,20)
	}

	screen_first.prototype.show_button = function() {
		this.button_menu.visible=true
		this.button_next.visible=true
		this.tween2=game.add.tween(this.button_menu.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
		this.tween3=game.add.tween(this.button_next.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	}

	character = function(){
		Phaser.Sprite.call(this,game,w2,h+500,'rect')
		this.flag_mouse=false
		this.flag_show_button=true
		this.cible_shadow=game.add.sprite(w2,300,'cible_shadow')
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
			//this.player[i].enableBody=true
			this.player[i].body.enable=false
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
		//TODO:publish
		this.button_publish=game.add.button(w2,h2+800,'publish',this.send_data_mail,this)
		this.button_publish.anchor.setTo(.5,.5)
		this.button_publish.scale.setTo(0,0)
		this.button_publish.visible=true

		this.button_restart=game.add.button(w2,h2,'restart',this.restart_level,this)
		this.button_restart.anchor.setTo(.5,.5)
		this.button_restart.scale.setTo(0,0)
		this.button_restart.visible=false
		this.button_next=game.add.button(w2,this.cible.y,'next',this.next_level,this)
		this.button_next.anchor.setTo(.5,.5)
		this.button_next.scale.setTo(0,0)
		this.button_next.visible=false
		//this.button_video=game.add.button(w2,h2+400,'button_video',() => this.next_level_with_video(obj),this)
		this.button_video=game.add.button(w2,h2+400,'button_video',() => this.next_level_with_video(),this)
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
		//this.reward_video()
	}

	character.prototype = Object.create(Phaser.Sprite.prototype)
	character.prototype.constructor = character

	character.prototype.send_data_mail = function(){
		//
		var current_level=level_number+1
		var SubjectVariable='bubblex'+current_level
		var EmailVariable='espace3d@gmail.com'
		window.location='mailto:'+EmailVariable+'?subject='+SubjectVariable+'&body='+email
		this.tween_publish=game.add.tween(this.button_publish.scale).to({x:0,y:0},500,Phaser.Easing.Bounce.Out,true,300)
		this.tween_publish.onComplete.add(function(){this.button_publish.visible=false},this)
	}
	//
	character.prototype.audio_star = function() {
		this.sound_star.play()
	}

	character.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	character.prototype.checkicharacterisloossomewhere = function(n) {
		console.log("checkicharacterisloossomewhere")
		if(this.player[n].flag_check)
			this.player[n].flag_check=false
		game.time.events.add( 6000,() => this.checkicharacterisloossomewhere2(n),this )
	}

	character.prototype.checkicharacterisloossomewhere2 = function(n) {
		if(this.flag_level_complete==false){
			console.log("checkicharacterisloossomewhere2");
			this.explode(w2,0,n)	
		}
	}

	character.prototype.calculate_life_remaining= function(){
		console.log("calculate_life_remaining")
			this.count=this.count+1
			switch(this.count){
				case 0:
					this.life.text=3 
					break
				case 1:
					this.life.text=2 
					break
				case 2:
					this.life.text=2 
					break
				case 3:
					this.life.text=1 
					break
				case 4:
					this.life.text=1 
					break
				case 5:
					this.life.text=''
					break

				default:
					this.life.text='' 
					break
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
		this.tween5 = game.add.tween(this.star.scale).to({x:1,y:1},200,Phaser.Easing.Linear.None,true,1000)
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

	character.prototype.reward_video=function(){

		var appId = "4f7b433509b6025804000002";
		var appSignature = "dd2d41b69ac01b80f443f5b6cf06096d457f82bd";
		window.chartboost.setUp(appId, appSignature);

		//
		window.chartboost.onInterstitialAdPreloaded = function(location) {
			alert('onInterstitialAdPreloaded: ' + location);
		};
		window.chartboost.onInterstitialAdLoaded = function(location) {
			alert('onInterstitialAdLoaded: ' + location);
		};
		window.chartboost.onInterstitialAdShown = function(location) {
			alert('onInterstitialAdShown: ' + location);
		};
		window.chartboost.onInterstitialAdHidden = function(location) {
			alert('onInterstitialAdHidden: ' + location);
		};
		//
		window.chartboost.onMoreAppsAdPreloaded = function(location) {
			alert('onMoreAppsAdPreloaded: ' + location);
		};
		window.chartboost.onMoreAppsAdLoaded = function(location) {
			alert('onMoreAppsAdLoaded: ' + location);
		};
		window.chartboost.onMoreAppsAdShown = function(location) {
			alert('onMoreAppsAdShown: ' + location);
		};
		window.chartboost.onMoreAppsAdHidden = function(location) {
			alert('onMoreAppsAdHidden: ' + location);
		};
		//
		window.chartboost.onRewardedVideoAdPreloaded = function(location) {
			alert('onRewardedVideoAdPreloaded: ' + location);
		};
		window.chartboost.onRewardedVideoAdLoaded = function(location) {
			alert('onRewardedVideoAdLoaded: ' + location);
		};
		window.chartboost.onRewardedVideoAdShown = function(location) {
			alert('onRewardedVideoAdShown: ' + location);
		};
		window.chartboost.onRewardedVideoAdHidden = function(location) {
			alert('onRewardedVideoAdHidden: ' + location);
		};
		window.chartboost.onRewardedVideoAdCompleted = function(location) {
			alert('onRewardedVideoAdCompleted: ' + location);
		};

		window.chartboost.preloadRewardedVideoAd('Default')
		window.chartboost.showRewardedVideoAd('Default')

	}

	character.prototype.next_level_with_video = function() {
		this.next_niveau=level_number+1
		console.log('next-level')
		window.chartboost.onRewardedVideoAdShown('Default')
		window.chartboost.onRewardedVideoAdCompleted=function(location){
			alert('next level')
			this.game.state.start('level'+this.next_niveau,true,false);
			console.log("video rewarded you could pass the level");
		}
		window.onRewardedVideoAdCompleted('Default');
	}

	character.prototype.launch_with_mouse=function(){
		if(this.flag_level_complete==false && this.flag_mouse==false){
			this.flag_mouse=true
			game.time.events.add( 400,function(){this.flag_mouse=false},this )
			this.calculate_life_remaining()
			switch(this.count){
				case 0:
					this.audio_launch()
					this.player[0].body.enable=true
					this.checkicharacterisloossomewhere(0)
					this.player[0].visible=true
					this.player[0].body.velocity.y=-800
					break
				case 1:
					break
				case 2:
					this.audio_launch()
					this.player[1].body.enable=true
					this.checkicharacterisloossomewhere(1)
					this.player[1].visible=true
					this.player[1].body.velocity.y=-800
					break
				case 3:
					break
				case 4:
					this.audio_launch()
					this.player[2].body.enable=true
					this.checkicharacterisloossomewhere(2)
					this.player[2].visible=true
					this.player[2].body.velocity.y=-800
					break
				case 5:
					break

				default:
					break
			}
		}
	}

	character.prototype.launch=function(){
			console.log("instace")
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
			this.player[n].flag_cant_explode=false
			this.calculate_life_remaining()
			this.audio_pop()
			this.on_explode()
			this.player[n].visible=false
			this.particle = game.add.emitter(posx,posy,4)
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

	character.prototype.on_explode=function(){
		this.count_dead=this.count_dead+1
		if(this.count_dead==3){
			console.log('this.count_dead',this.count_dead)
			this.decide_if_show_button_restart_level()
		}
	}

	character.prototype.decide_if_show_button_restart_level = function() {
		console.log('decide')
		this.flag_hide_enemies=true
		game.time.events.add( 2000,this.show_button_restart_level,this )
		//seulement si le flag level est complete lance show_button_video
		game.time.events.add( 2000,this.show_button_video,this )
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
				this.star.frame=3
				break
			case 2:
				this.star.frame=2
				console.log("this.star.frame in calculate_star",this.star.frame,this.count);
				break
			case 3:
				this.star.frame=2
				break
			case 4:
				this.star.frame=1
				break
			case 5:
				this.star.frame=1
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
		this.show_button_publish()
	}

	character.prototype.hide_life_text = function() {
		this.life.visible=false	
	}

	character.prototype.show_button_restart_level_complete = function() {
		if(this.flag_show_button){
			this.flag_show_button=false
			this.show_button_restart_level()
			this.show_button_next_level()
			this.hide_life_text()
		}
	}

	character.prototype.show_button_next_level = function() {
		this.hide_life_text()
		this.button_next.visible=true
		this.tween3=game.add.tween(this.button_next.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
	}

	character.prototype.show_button_publish=function(){
		//this.flag_show_button=false
		this.button_publish.visible=true
		this.tween2=game.add.tween(this.button_publish.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,300)
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
			this.hide_life_text()
		}	
	}

	character.prototype.update=function(){
		//pour lancer avec le keyboard
		//if (this.spaceKey.isDown && this.flag_spacekey)
		//{
			//this.flag_spacekey=false
			//this.launch()
		//}
	}

	_asteroid = function(number,posx,posy,speed,radius){
		this.number=number
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

	_pulsar = function(number,delay,time,posx,posy,speed,scale_factor){
		this.scale_factor=scale_factor
		console.log('this.scale_factor',this.scale_factor)
		this.number=number
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
	_dalle = function(number,delay,posx,posy,speed){
		this.number=number
		this.name="dalle"
		this.delay=delay
		this.posx=posx
		this.posy=posy
		this.speed=speed
		Phaser.Sprite.call(this,game,this.posx,this.posy,'axe_neon')
		this.anchor.x=.5
		this.anchor.y=.5
		this.alpha=0
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.input.enableSnap(40,40,true,true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		game.physics.arcade.enable(this);
		this.body.immovable=true
		this.tweens()
	}

	_dalle.prototype = Object.create(Phaser.Sprite.prototype)
	_dalle.prototype.constructor = _dalle


	_dalle.prototype.tweens = function() {
		this.tween0=game.add.tween(this).to({alpha:1},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle.prototype.update = function() {
		if(this.alpha > .7){
			this.body.enable=true	
		}else{
			this.body.enable=false	
		}
	}

	_dalle.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		this.tween0=game.add.tween(this).to({alpha:1},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle.prototype.hide = function() {
		this.tweenh=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	}

	_neon = function(number,delay,posx,posy,speed,posx_in_tween){
		this.posx_in_tween=posx_in_tween
		this.number=number
		this.name="neon"
		this.delay=delay
		this.posx=posx
		this.posy=posy
		this.speed=speed
		Phaser.Sprite.call(this,game,this.posx,this.posy,'axe_neon')
		this.anchor.x=.5
		this.anchor.y=.5
		this.axe_neon=game.add.sprite(this.x,this.y,'neon')
		this.axe_neon.anchor.setTo(.5,.5)
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.input.enableSnap(40,40,true,true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		game.physics.arcade.enable(this.axe_neon);
		this.axe_neon.body.immovable=true
		this.tweens()
		console.log(this.posx_in_tween)
	}

	_neon.prototype = Object.create(Phaser.Sprite.prototype)
	_neon.prototype.constructor = _neon


	_neon.prototype.tweens = function() {
		this.tween0=game.add.tween(this.axe_neon).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_neon.prototype.update = function() {
		this.axe_neon.y=this.y
	}

	_neon.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		console.log("remove");
		this.axe_neon.x=this.x
		this.axe_neon.y=this.posy
		this.posx_in_tween=this.posx_in_tween
		this.tween0=game.add.tween(this.axe_neon).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_neon.prototype.hide = function() {
		this.tweenh=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
		this.tweeni=game.add.tween(this.axe_neon.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
	}

	_canon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
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
		//
		Phaser.Sprite.call(this,game,this.posx,this.posy,'canon')
		this.anchor.setTo(.5,.5)
		this.angle=this.angular
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.input.enableSnap(40,40,true,true)
		this.animate_when_fire()

		game.time.events.loop( this.frequency,this.animate_when_fire,this )
		game.physics.arcade.enable(this);
		if(this.special_color){
			this.weapon=game.add.weapon(9,'bullet_color')
		}else{
			this.weapon=game.add.weapon(9,'bullet')	
		}

		if(this.kill_with_world){
			this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		}else{
			for (var i = 0; i <  9; i++) {
				this.weapon.bulletCollideWorldBounds=true
				this.weapon.bullets.children[i].body.bounce.setTo(1,1)
			}
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
		//this.table=[100,-100]
		//this.u=0
		//this.scale_mainbody()
	}

	_canon.prototype = Object.create(Phaser.Sprite.prototype)
	_canon.prototype.constructor = _canon
	_canon.prototype.update = function(){
		if(this._flag==false){
			//this.u=1-this.u
			this.weapon.fire() 
			//this.x=this.x+this.table[this.u]
		}
	}


	_canon.prototype.transition = function() {
		this.tween_characteristic = game.add.tween(this.canon).to({x:posx,y:posy},time,Phaser.Easing.Linear.None,true,delay)
	}

	_canon.prototype.kill = function() {
		console.log('kill')	
	}
	_canon.prototype.fire = function() {

		this._flag=true
		this.weapon.fireRate = this.frequency ;
		this.weapon.bulletSpeed = this.speed;
		this.angle=this.angular
		this.weapon.bulletAngleVariance = this.variance;
		//game.time.events.add( 10,function(){this._flag=false},this )
		//this.tween_0.pause()
		//this.scale_mainbody()
		//this.tween_0.resume()
		//this.weapon.fire()
	}
	_canon.prototype.animate_when_fire = function() {
		this.tween_2 = game.add.tween(this.scale).to({x:1.4,y:1.2},30,Phaser.Easing.Linear.None,true,0)
		this.tween_2.yoyo(30,true)
		this.explosion()
	}

	_canon.prototype.explosion = function() {
		//if(this._flag){
			this.particlex = game.add.emitter(this.x,this.y,4)
			this.particlex.makeParticles("particle_canon")
			this.particlex.minParticleSpeed.setTo(-600,-600)
			this.particlex.maxParticleSpeed.setTo(800,800)
			this.particlex.setAlpha(.8, .6)
			this.particlex.minParticleScale = .7
			this.particlex.maxParticleScale = .9
			this.particlex.minRotation = 0
			this.particlex.maxRotation = 0
			this.particlex.on=false
			this.particlex.start(true,130,null,20)
		//}
	}
	

	_canon.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	_canon.prototype.explode_bullet=function(){
		if(this.flag_explode==false){
			this.flag_explode=true
			this.audio_pop()
			if(this.special_color){
				this.weapon.bullets.forEach(function(item){
					if(item.alive){	
						this.particle = game.add.emitter(item.x,item.y,4)
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
						this.particle = game.add.emitter(item.x,item.y,4)
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

	//var createBanner= function(){
	//	if( navigator.userAgent.match(/Android/i)
	//		|| navigator.userAgent.match(/webOS/i)
	//		|| navigator.userAgent.match(/iPhone/i)
	//		|| navigator.userAgent.match(/iPad/i)
	//		|| navigator.userAgent.match(/iPod/i)
	//		|| navigator.userAgent.match(/BlackBerry/i)
	//		|| navigator.userAgent.match(/Windows Phone/i)
	//	){
	//		if (!window.Cocoon || !Cocoon.Ad || !Cocoon.Ad.AdMob) {
	//			alert('Cocoon AdMob plugin not installed');
	//			return;
	//		}
	//		// nécessaire 
	//		adService = Cocoon.Ad.AdMob;
	//		adService.configure({
	//			ios: {
	//				banner:"ca-app-pub-7686972479101507/8873903476",
	//				interstitial:"ca-app-pub-7686972479101507/8873903476",
	//			},
	//			android: {
	//				banner:"ca-app-pub-7686972479101507/4443703872",
	//				interstitial:"ca-app-pub-7686972479101507/4443703872"
	//			}
	//		});

	//		console.log('createBanner')
	//		banner = adService.createBanner();

	//		banner.on("load", function(){
	//			console.log("Banner loaded " + banner.width, banner.height);
	//		});

	//		banner.on("fail", function(){
	//			console.log("Banner failed to load");
	//		});

	//		banner.on("show", function(){
	//			console.log("Banner shown a modal content");
	//		});

	//		banner.on("dismiss", function(){
	//			console.log("Banner dismissed the modal content");
	//		});

	//		//load banner
	//		banner.load();

	//		//show banner
	//		banner.show()
	//		demoPosition = Cocoon.Ad.BannerLayout.BOTTOM_CENTER;
	//		banner.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
	//		game.time.events.add( 1000,function(){banner.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER)})
	//	}
	//}

	//var createInterstitial=function(){
	//	if( navigator.userAgent.match(/Android/i)
	//		|| navigator.userAgent.match(/webOS/i)
	//		|| navigator.userAgent.match(/iPhone/i)
	//		|| navigator.userAgent.match(/iPad/i)
	//		|| navigator.userAgent.match(/iPod/i)
	//		|| navigator.userAgent.match(/BlackBerry/i)
	//		|| navigator.userAgent.match(/Windows Phone/i)
	//	){
	//		adService = Cocoon.Ad.AdMob;
	//		adService.configure({
	//			ios: {
	//				banner:"ca-app-pub-7686972479101507/8873903476",
	//				interstitial:"ca-app-pub-7686972479101507/8873903476",
	//			},
	//			android: {
	//				banner:"ca-app-pub-3940256099942544/5224354917",
	//				//precedente banners qui marchait banner:"ca-app-pub-7686972479101507/4443703872",
	//				interstitial:"ca-app-pub-7686972479101507/4443703872"
	//			}
	//		});

	//		interstitial = adService.createRewardedVideo();
	//		//interstitial = adService.createInterstitial();

	//		interstitial.on("load", function(){
	//			console.log("Interstitial loaded");
	//		});
	//		interstitial.on("fail", function(){
	//			console.log("Interstitial failed");
	//		});
	//		interstitial.on("show", function(){
	//			console.log("Interstitial shown");
	//		});
	//		interstitial.on("dismiss", function(){
	//			console.log("Interstitial dismissed");
	//		});

	//		interstitial.on("click", function(){
	//			alert("click")
	//			console.log("Interstitial dismissed");
	//			if(level_number < 19){
	//				this.game.state.start("level"+level_number+1);
	//			}
	//		});
	//		interstitial.load()
	//	}
	//}
	var createBanner= function(){
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
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
	}


	var createInterstitial=function(){
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
			adService = Cocoon.Ad.Chartboost

			adService.configure({
				ios: {
					appId:"4ed254a3cb5015e47c000000",
					appSignature:"91858cc162b56414ca47e63ce7a1b20105c70e65"
				},
				android: {
					appId:"50ae12d715ba47c00d01000c",
					appSignature:"95fb313c08717042903819d76f65d64d2347ac44"
				}
			});
			interstitial = adService.createRewardedVideo();
			//interstitial = adService.createInterstitial();

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
			interstitial.on("reward", function(){
				alert("reward")
				console.log("Interstitial dismissed");
				if(level_number < 19){
					this.game.state.start("level"+level_number+1);
				}
			});

			interstitial.load()
			//TOD
			interstitial.show()
		}
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
			this.game.stage.backgroundColor = '#0d1018'
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
			this.game.load.audio("launch","sounds/launch.ogg");
			this.game.load.audio("coin","sounds/coin.ogg");
			//this.game.load.audio("pop_minder","sounds/pop_minder.ogg");
			this.game.load.audio("pop_minder","sounds/pop2.ogg");
			//this.game.load.audio("pop","sounds/pop.ogg");
			this.game.load.audio("pop","sounds/pop2.ogg");
			this.game.load.audio("click","sounds/click.ogg");
			//images
			this.game.load.image("cible_shadow","assets/cible_shadow.png");
			this.game.load.image("axe_neon","assets/axe_neon.png");
			this.game.load.image("publish","assets/publish.png");
			this.game.load.image("grid","assets/grid.png");
			this.game.load.image("pulsar","assets/pulsar.png");
			this.game.load.image("axe","assets/axe.png");
			this.game.load.image("neon","assets/neon.png");
			this.game.load.image("title","assets/title.png");
			this.game.load.spritesheet('star','assets/star.png', 300, 100);
			this.game.load.image("levelselecticons","assets/levelselecticons.png");
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
			this.game.load.image("particle_canon","assets/particle_canon.png");
			this.game.load.image("particle_bullet_color","assets/particle_bullet_color.png");
			this.game.load.image("particle_bullet","assets/particle_bullet.png");
			this.game.load.image("rect","assets/rect.png");
			this.game.load.image("button","assets/button.png");


			//font bitmapFont
			this.game.load.bitmapFont('fo','fonts/font.png', 'fonts/font.fnt');
		},

		create: function(){
			//
			this.game.stage.backgroundColor = '#0d1018'
			this.game.state.start("game_first_screen");
		}
	}

	var game_first_screen = {
		create: function(){
			this.game.stage.backgroundColor = '#0d1018'
			//this.game.stage.backgroundColor = '#000000'
			this.title=new screen_first()
			game.add.existing(this.title)
			this.initProgressData()
			//ICI ENLEVER
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
			flag_hide=true
			level_number=0
			//createInterstitial()
			this.create_canon=function(){
				console.log("create_canoin");

				//canon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
				canon[0]=new _canon(0,0,w-200,800,900,90,0,180,hero.flag_level_complete,true,false)
				console.log(canon[0].special_color,"special_color")
				canon[1]=new _canon(1,0,0,1200,400,900,0,0,hero.flag_level_complete,false,true) 
			}
			this.create_asteroid=function(){
				//asteroid = function(number,posx,posy,speed,radius){
				console.log("asteroid")
				asteroid[0]=new _asteroid(100,240,900,.008,100)
				asteroid[1]=new _asteroid(200,240,500,.008,100)
			}

			this.create_neon=function(){
				//neon = function(number,delay,posx,posy,speed,posx_in_tween){
				//neon[0]=new _neon(0,0,240,h2+100,300,3)
				//neon[1]=new _neon(1,0,240,h2+500,300)
			}

			this.create_pulsar=function(){
				//pulsar = function(number,delay,time,posx,posy,speed,scale_factor){
				//pulsar[0]=new _pulsar(0,100,500,240,600,900,2)
				//pulsar[1]=new _pulsar(1,200,200,240,600,900,2)
			}

			this.create_dalle=function(){
				//_dalle = function(number,delay,posx,posy,speed){
				//dalle[0]=new _dalle(0,0,300,440,9000)
				//dalle[1]=new _dalle(1,0,500,640,9000)
			}



			hero = new character() 

			check_storage(this.create_canon,this.create_asteroid,this.create_neon,this.create_pulsar,this.create_dalle,2,1,0,0,2)
			logic_add()
			logic_update()

			return level_number
		},
		update:function(){
			//logic_update()
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
			this.game.stage.backgroundColor = '#0d1018'
			this.back=game.add.sprite(w2,h2,'background');
			this.back.anchor.y=.5
			this.back.anchor.x=.5
			this.text=game.add.bitmapText(640,200,'fo','SELECT A LEVEL!',100);
			this.text.anchor.setTo(.5,.5)
			this.createLevelIcons();
			this.animateLevelIcons();
			this.game.add.existing(this.back)
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
				//txt_locked.tint=0x9a136b
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
		if(dalle[0]){
			for (var i = 0; i < dalle.length; i++){
				game.add.existing(dalle[i])
			}
		}
	}

	var logic_update=function(){
game.time.events.loop( 80,function(){ 

		//debug_position && logic_position()
		for (var j = 0; j < 3; j++){
			game.physics.arcade.collide(hero.cible,hero.player[j],() => hero.land(j))
		}

		//si reussi niveau
		hero.flag_level_complete && flag_hide && hero.flag_level_complete==false & console.log("ok") & game.time.events.add( 900,hide_weapon,this )

		//si checkicharacterisloossomewhere
		hero.flag_hide_enemies && flag_hide && hero.flag_hide_enemies==false & game.time.events.add( 500,hide_weapon,this )

		if(canon[1]){
			game.physics.arcade.collide(canon[0].weapon.bullets,canon[1].weapon.bullets,touch_between_enemies,null,this)
		}

		if(canon[2]){
			game.physics.arcade.collide(canon[0].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
			game.physics.arcade.collide(canon[1].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
		}

		if(canon[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < canon.length; j++){
					if(canon[j].special_color){
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
					game.physics.arcade.collide(neon[j].axe_neon,hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
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
		if(dalle[0]){
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < dalle.length; j++){
					game.physics.arcade.collide(dalle[j],hero.player[i],() => hero.explode(hero.player[i].body.x,hero.player[i].body.y,i))
				}
			}
		}

		game.input.onTap.add(onTap,this);

		function onTap(pointer, doubleTap) {
			if(hero.flag_level_complete==false){
				if (doubleTap)
				{
				}
				else
				{
					hero.flag_spacekey=false
					hero.launch_with_mouse()
				}
			}
		}
})
	}

	var touch_between_enemies=function(){
		console.log("touch");

	}
	var hide_weapon=function(){
		if(flag_hide){
			console.log("hide_weapon")
			flag_hide = false
			console.log('hide')
			if(canon[0]){
				for (var j = 0; j < canon.length; j++){
					canon[j].explode_bullet(canon[j].weapon.bullets)
					canon[j].visible=false
					canon[j].weapon.bullets.visible=false
					canon[j].particlex.on=false
					canon[j].destroy()
				}
			}
			if(neon[0]){
				for (var j = 0; j < neon.length; j++){
					neon[j].hide()
					neon[j].axe_neon.body.enable=false
					neon[j].destroy()
				}
			}

			if(pulsar[0]){
				for (var j = 0; j < pulsar.length; j++){
					pulsar[j].hide()
					pulsar[j].body.enable=false
					pulsar[j].destroy()
				}
			}

			if(asteroid[0]){
				for (var j = 0; j < asteroid.length; j++){
					asteroid[j].hide()
					asteroid[j].axe.body.enable=false
					asteroid[j].visible=false
					asteroid[j].destroy()
				}
			}
			if(dalle[0]){
				for (var j = 0; j < dalle.length; j++){
					dalle[j].hide()
					dalle[j].body.enable=false
					dalle[j].destroy()
				}
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
						logic_position(sprite)
					})
					guit.frequency=gui.add(sprite,'frequency',0,5000)
					guit.frequency.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					console.log(sprite.kill_with_world)
					guit.kill=gui.add(sprite,'kill_with_world')
					guit.kill.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					guit.special_color=gui.add(sprite,'special_color')
					guit.special_color.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					guit.angular=gui.add(sprite,'angular',0,360)
					guit.angular.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					guit.variance=gui.add(sprite,'variance',0,1000)
					guit.variance.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})

					break
				case "pulsar":
					var guit={}
					gui.add(sprite,'name')
					guit.speed=gui.add(sprite,'speed',300,3000)
					guit.speed.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
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
						logic_position(sprite)
					})
					guit.posx_in_tween=gui.add(sprite,'posx_in_tween',-800,800)
					guit.posx_in_tween.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					break;
				case "dalle":
					var guit={}
					gui.add(sprite,'name')
					guit.speed=gui.add(sprite,'speed',300,3000)
					guit.speed.onChange(function(value) {
						sprite.fire()// Fires on every change, drag, keypress, etc.
						logic_position(sprite)
					})
					break;
				default:
					break;
			}
		}
	}

	var c=[]
	var a=[]
	var n=[]
	var p=[]
	var d=[]

	var logic_position=function(sprite){
		if (debug_position){
			console.log("retablissement des paramètres")
			hero.grid.visible=false	
			//var _table=null
			//var _name_json=null
			var _table
			var _name_json
			switch(sprite.name){
				case 'canon':
					console.log('msg')
					_table=c
					_name_json='canon'
					console.log('sprite.angular',sprite.angular)
					//var sprite.number=sprite.number
					_table[sprite.number] = {
						number:sprite.number,
						delay:sprite.delay,
						x:sprite.x,
						y:sprite.y,
						speed:sprite.speed,
						frequency:sprite.frequency,
						variance:sprite.variance,
						angular:sprite.angular,
						_flag:sprite._flag,
						kill_with_world:sprite.kill_with_world,
						special_color:sprite.special_color,
					};
					break
					//asteroid = function(posx,posy,speed,radius){
				case 'asteroid':
					_table=a
					_name_json='asteroid'
					_table[sprite.number] = {
						x:sprite.x,
						y:sprite.y,
						speed:sprite.speed,
						radius:sprite.radius,
					};
					break
					//neon = function(delay,posx,posy,speed,posx_in_tween){
				case 'neon':
					_table=n
					_name_json='neon'
					_table[sprite.number] = {
						delay:sprite.delay,
						x:sprite.x,
						y:sprite.y,
						speed:sprite.speed,
						posx_in_tween:sprite.posx_in_tween,
					};
					break
					//
					//pulsar = function(delay,time,posx,posy,speed,scale_factor){
				case 'pulsar':
					console.log('sprite.name',sprite.name)
					console.log(sprite.x)
					_table=p
					_name_json='pulsar'
					_table[sprite.number] = {
						delay:sprite.delay,
						time:sprite.time,
						x:sprite.x,
						y:sprite.y,
						speed:sprite.speed,
						scale_factor:sprite.scale_factor,
					};
					break
				case 'dalle':
					_table=d
					_name_json='dalle'
					_table[sprite.number] = {
						delay:sprite.delay,
						x:sprite.x,
						y:sprite.y,
						speed:sprite.speed,
					};
					break

			}

			localStorage.setItem(_name_json+sprite.number+'lev0', JSON.stringify(_table[sprite.number]));

		}
	}

	var check_storage=function(_create_canon,_create_asteroid,_create_neon,_create_pulsar,_create_dalle,num_canon,num_asteroid,num_neon,num_pulsar,num_dalle){
		console.log("asteroid")
		for(var i=0;i<num_canon;i++){
			try {
				c[i] = JSON.parse( localStorage.getItem( 'canon'+i+'lev'+level_number ) ) ;
			} catch(e){
				c[i]=[]
			}
		};
		for(var i=0;i<num_canon;i++){
			//c[i] = localStorage.getItem('canon'+i+'lev'+level_number)
			if (c[i]===null){
				_create_canon()
				break
			}else{
				c[i]=JSON.parse(localStorage.getItem('canon'+i+'lev'+level_number))
				canon[i]=new _canon(i,c[i].delay,c[i].x,c[i].y,c[i].speed,c[i].frequency,c[i].variance,c[i].angular,hero.flag_level_complete,c[i].kill_with_world,c[i].special_color);
			}
		}

		///////////////////////////////////////////////////////////////////////////////////////////
		for(var i=0;i<num_asteroid;i++){
			try {
				a[i] = JSON.parse( localStorage.getItem( 'asteroid'+i+'lev'+level_number ) ) ;
			} catch(e){
				a[i]=[]
			};
		}

		for(var i=0;i<num_asteroid;i++){
			if (a[i]===null){
				_create_asteroid()
				break
			}else{
				//asteroid = function(number,posx,posy,speed,radius){
				asteroid[i]=new _asteroid(i,a[i].x,a[i].y,a[i].speed,a[i].radius)
			}
		}
		///////////////////////////////////////////////////////////////////////////////////////////
		for(var i=0;i<num_neon;i++){
			try {
				n[i] = JSON.parse( localStorage.getItem( 'neon'+i+'lev'+level_number ) ) ;
			} catch(e){
				n[i]=[]
			};
		}

		for(var i=0;i<num_neon;i++){
			if (n[i]===null){
				_create_neon()
				break
			}else{
				//neon = function(number,delay,posx,posy,speed){
				neon[i]=new _neon(i,n[i].delay,n[i].x,n[i].y,n[i].speed,n[i].posx_in_tween)
			}
		}
		///////////////////////////////////////////////////////////////////////////////////////////
		for(var i=0;i<num_pulsar;i++){
			try {
				p[i] = JSON.parse( localStorage.getItem( 'pulsar'+i+'lev'+level_number ) ) ;
			} catch(e){
				p[i]=[]
			};
		}
		for(var i=0;i<num_pulsar;i++){
			if (p[i]===null){
				_create_pulsar()
				break
			}else{
				//pulsar = function(number,delay,time,posx,posy,speed,scale_factor){
				pulsar[i]=new _pulsar(i,p[i].delay,p[i].time,p[i].x,p[i].y,p[i].speed,p[i].scale_factor)
			}
		}

		for(var i=0;i<num_dalle;i++){
			try {
				d[i] = JSON.parse( localStorage.getItem( 'dalle'+i+'lev'+level_number ) ) ;
			} catch(e){
				d[i]=[]
			};
		}
		for(var i=0;i<num_dalle;i++){
			if (d[i]===null){
				//console.log(d[i])
				_create_dalle()
				break
			}else{
				//dalle = function(number,delay,posx,posy,speed){
				dalle[i]=new _dalle(i,d[i].delay,d[i].x,d[i].y,d[i].speed)
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

var detectmob=function() { 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	){
		document.addEventListener('deviceready',main,false)
		return true;
	}
	else {
		console.log('not mobile')
		main()
		return true;
	}
}
//pour tester dans github décocher ceci
//main()

//si c'est cocoon décocher ici
detectmob()
//document.addEventListener('deviceready',main,false)

