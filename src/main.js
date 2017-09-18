/* *************************************************************************
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
// regler sensibilité de touch lorsque player launch
// radius asteroid n'est pas pris en compte avec storage
//regler particle canon en fonction de l'inclinaison
//mettre icone button_back à la place de publish
//body enbale false lorsque touché un projectile violet

var is_mobile=true

function main(){
	var videoreward;
	var c=[]
	var a=[]
	var n=[]
	var p=[]
	var d=[]
	var level_name=[
		"for beginners :)",
		"let easy",
		"oh it hurts",
"beginners out !",

	]
	var is_rewarded_video_completed=false
	var is_preload_rewarded_video=false
	var text_passed_level
	var background_to_pass_level
	var game_begin=false
	var delay_for_show_describe_text=400
	var time_to_show_describe_text = 100
	var delay_for_game_begin=delay_for_show_describe_text+ time_to_show_describe_text+ time_to_show_describe_text+800
	var number_canon=null 
	var number_asteroid=null 
	var number_dalle_moving=null 
	var number_pulsar=null 
	var number_dalle=null 
	var count_hero 
	var level0
	var level_number_adapt
	var text_to_describe_level
	var text_to_number_level

	var animate_touch
	var tw_name
	var flag_tween_en_cours=true
	var delay_circle_timer = 2400

	this.some_value=4
	var gui
	var PLAYER_DATA 
	var ratio_device=window.screen.width/window.screen.height
	var h=1920
	var w=1280
	var time_appears_enemies=800
	var time_hide=500
	var h2=h*.5
	var w2=640
	var debug_mode=false
	//si false pas de possibilité de déplacer les enemis et de publier les levels
	var debug_position=true
	// si false pas de localStorage
	var debug_store=true
	var level_json={}
	//
	var canon=[]
	var pulsar=[]
	var asteroid=[]
	var dalle_moving=[]
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

	//class for text intitulé dans chaque level
	_text=function(message,posx,posy,taille){
		this.text=game.add.bitmapText(posx,posy,'police',message,taille);
		this.text.anchor.setTo(.5,.5)
		game.add.existing(this.text)
	}

	_text.prototype=Object.create(_text.prototype)

	_text.prototype.show = function() {
		this.text.visible=true	
		this.text.scale.setTo(0,0)
		this.tween1 = game.add.tween(this.text.scale).to({x:1,y:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,0)
		this.tween1 = game.add.tween(this.text).to({alpha:1},time_to_show_describe_text,Phaser.Easing.Linear.None,true,0)
		this.tween1.onComplete.add(this.hide,this)	
	}

	_text.prototype.hide = function() {
		this.tween2 = game.add.tween(this.text.scale).to({x:1,y:0},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_show_describe_text)
		this.tween2 = game.add.tween(this.text).to({alpha:0},time_to_show_describe_text,Phaser.Easing.Linear.None,true,delay_for_show_describe_text)
	}

	//class for mechant
	_mechant = function(name,number,posx,posy,image_body,image_drag){
		//this = this.sprite_for_drag
		this.visible=true
		this.name=name
		this.number=number
		this.image_body=image_body
		this.image_drag=image_drag
		this.posx=posx
		this.posy=posy
		this.flag=true
		Phaser.Sprite.call(this,game,this.posx,this.posy,this.image_drag)
		this.scale.setTo(0,0)
		debug_position ? this.alpha=0 : this.alpha=0
		this.anchor.setTo(.5,.5)
		this.inputEnabled=true
		this.input.enableDrag(true)
		this.input.enableSnap(40,40,true,true)
		this.events.onDragStop.add(logic_position,this)
		this.events.onDragStart.add(show_grid_on_logic_position,this)
		this.sprite_for_body=game.add.sprite(this.posx,this.posy,this.image_body)
		this.sprite_for_body.anchor.setTo(.5,.5)
		game.physics.arcade.enable(this.sprite_for_body)
		this.sprite_for_body.immovable=true
		this.sprite_for_body.scale.setTo(0,0)
		this.sprite_for_body.visible=true
		this.sprite_for_body.alpha=1
		this.particle = game.add.emitter(this._x,this._y)
		this.particle.makeParticles("particle_character")
		this.particle.minParticleSpeed.setTo(-600,-600)
		this.particle.maxParticleSpeed.setTo(700,700)
		this.particle.setAlpha(.8, .5)
		this.particle.minParticleScale = .1
		this.particle.maxParticleScale = .5
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
		this.show()
		this.flag_wait_before_fire=false
		game.time.events.add( time_appears_enemies,() => {this.flag_wait_before_fire=true} )
	}


	_mechant.prototype=Object.create(Phaser.Sprite.prototype)

	_mechant.prototype.hide=function(){
		this.tween1=game.add.tween(this.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
		this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:0,y:0},time_hide,Phaser.Easing.Bounce.In,true,0)
		this.sprite_for_body.enable=false
		this.tween1.onComplete.add(function(){this.visible=false;this.inputEnabled=false},this)
		this.tween2.onComplete.add(function(){this.sprite_for_body.visible=false},this)
	}

	_mechant.prototype.show=function(){
		game.time.events.add( delay_for_game_begin,this.particle_show,this )
		this.tween1=game.add.tween(this.scale).to({x:1,y:1},time_appears_enemies,Phaser.Easing.Elastic.Out,true,delay_for_game_begin)
		this.tween2=game.add.tween(this.sprite_for_body.scale).to({x:1,y:1},time_appears_enemies,Phaser.Easing.Elastic.Out,true,delay_for_game_begin)
	}

	_mechant.prototype.kill=function(){
		co("kill")
		this.visible=false
		this.sprite_for_body.enable=false
		this.sprite_for_body.visible=false
		this.particle.on=false
	}

	_mechant.prototype.update2=function(){
		if(this.sprite_for_body.visible){
			this.sprite_for_body.x=this.x
			this.sprite_for_body.y=this.y
		}
	}
	_mechant.prototype.particle_show = function(){
		this.particle.x=this.x
		this.particle.y=this.y
		this.particle.on=true
		this.particle.start(true,650,null,5)
		game.time.events.add( 650,function(){this.particle.on=false},this )
	}


	//class button for click
	_button=function(posx,posy,image,fun_call_back){
		this.image=image
		this.posx=posx
		this.posy=posy
		this.fun_call_back=fun_call_back
		this.button=game.add.button(this.posx,this.posy,this.image,this.anim_on_click,this)
		this.button.visible=false
		this.button.anchor.setTo(.5,.5)
		this.button.scale.setTo(0,0)
		this.flag=true
		this.sound_click=game.add.audio('click')
	}

	_button.prototype.audio_click = function() {
		this.sound_click.play()
	}

	_button.prototype.show_button=function(){
		this.button.visible=true
		this.tween_scale_button = game.add.tween(this.button.scale).to({x:1,y:1},500,Phaser.Easing.Bounce.Out,true,0)
	}

	_button.prototype.anim_on_click=function(){
		if(this.flag){
			this.flag=false
			this.audio_click()
			this.tween_anim_on_click = game.add.tween(this.button.scale).to({x:.8,y:.8},150,Phaser.Easing.Bounce.Out,true,0)
			this.tween_anim_on_click.onComplete.add(this.fun_call_back,this.button)
		}
	}

	//var level={}
	screen_first = function(){
		Phaser.Sprite.call(this,game,w2,450,'title')
		this.anchor.setTo(.5,.5)
		this.button_menu=new _button(w2,h2+400,'button_menu',this.next_menu)
		this.button_next=new _button(w2,h2,'button_play',this.next_level)
		game.time.events.loop( 500,this.explosion,this )
		game.time.events.add( 200,this.button_menu.show_button,this.button_menu )
		game.time.events.add( 200,this.button_next.show_button,this.button_next )

		this._x=game.rnd.integerInRange(0,w)
		this._y=game.rnd.integerInRange(0,h)
		this.particle = game.add.emitter(this._x,this._y)
		this.particle.makeParticles("particle_character")
		this.particle.minParticleSpeed.setTo(-600,-600)
		this.particle.maxParticleSpeed.setTo(800,800)
		this.particle.setAlpha(.5, .2)
		this.particle.minParticleScale = .2
		this.particle.maxParticleScale = .5
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
		this.particle.start(true,3900,null,8)
	}

	screen_first.prototype = Object.create(Phaser.Sprite.prototype)
	screen_first.prototype.constructor = screen_first

	screen_first.prototype.audio_click = function(){
		this.sound_click.play()
	}
	screen_first.prototype.next_level = function(){
		game.state.start("level"+level_number)
	}

	screen_first.prototype.next_menu = function(){
		game.state.start("levsel")
	}

	screen_first.prototype.explosion = function(){
		this.particle.on=true
		this.particle.x=game.rnd.integerInRange(0,w)
		this.particle.y=game.rnd.integerInRange(0,h)
	}


	character = function(){
		Phaser.Sprite.call(this,game,w2,h+500,'particle_character')
		this.flag_mouse=true
		this.flag_show_button=true
		this.cible_shadow=game.add.sprite(w2,300,'cible_shadow')
		this.cible_shadow.anchor.setTo(.5,.5)
		this.cible_shadow.scale.setTo(1.5,1.5)
		this.cible_shadow.alpha=.15
		this.grid=game.add.sprite(0,0,'grid')
		this.grid.visible=false
		//cible
		this.cible=game.add.sprite(w2,300,'cible')
		this.cible.anchor.setTo(.5,.5)
		game.physics.arcade.enable(this.cible,Phaser.Physics.ARCADE)
		this.cible.body.immovable=true
		this.cible.scale.setTo(1.5,1.5)
		this.anchor.setTo(.5,.5)
		this.flag_hide_enemies=false
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flag_spacekey=true
		this.count=-1
		this.player={}
		for (var i = 0; i < 3; i++){
			this.player[i]=game.add.sprite(w2,1980,'particle_character')	
			game.physics.arcade.enable(this.player[i],Phaser.Physics.ARCADE)
			this.player[i].anchor.setTo(.5,.5)
			this.player[i].body.enable=false
			this.player[i].flag_check=true
			this.player[i].is_exploding=false
		} 
		this.score = game.add.bitmapText(w2,300,'police','',100)
		this.score.anchor.setTo(.5,.5)
		this.life = game.add.bitmapText(w2,1550,'police','3',120)
		this.life.anchor.setTo(.5,.5)
			this.life.visible=false
		this.touch_button = game.add.sprite(this.life.x,this.life.y-20,'touch')
		this.touch_button.anchor.setTo(.5,.5)
		this.touch_button.alpha=0
		this.touch_button.visible=true

		this.sound_launch=game.add.audio('launch')
		this.sound_star=game.add.audio('coin')
		this.sound_pop=game.add.audio('pop_minder')
		//TODO:publish
		if (debug_position){
			this.button_publish=new _button(w2,h2+800,'button_publish',this.send_data_mail)
		}else{
			this.button_publish=new _button(w2,h2+800,'button_back',this.back_to_menu)
		}

		this.button_restart=new _button(w2,h2,'button_restart',this.restart_level)
		this.button_next=new _button(w2,this.cible.y,'button_next',this.next_level)
		this.button_video=new _button(w2,h2+400,'button_video',this.show_reward_video)
		//TODO
		this.star= this.game.add.sprite(w2, h2-320, 'star', 0);
		this.star.anchor.setTo(.5,.5)
		this.star.frame=2
		this.star.visible=false
		this.star.scale.setTo(0,0)
		this._levelNumber = 1;
		this.count_dead=0
		this.anim_cible()
		this.sound_click=game.add.audio('click')
		is_mobile && this.preload_reward_video()
		this.circle_timer = null;
		this.counterMax = 100;
		this.counter = null;
		this.counterDisplay = null;
		this.timer = null;
		this.timer_touch = null;
		this.circle_timer = this.game.add.graphics(this.life.x, this.life.y-15);
		this.circle_timer.anchor.setTo(.5,.5)
		this.counter = 100;
		this.delay_for_launch_next_player=500
		this.particle = game.add.emitter(this.x,this.y)
		this.particle.makeParticles("particle_character")
		this.particle.minParticleSpeed.setTo(-600,-600)
		this.particle.maxParticleSpeed.setTo(800,800)
		this.particle.setAlpha(.8, .6)
		this.particle.minParticleScale = .2
		this.particle.maxParticleScale = .5
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
	}

	character.prototype = Object.create(Phaser.Sprite.prototype)
	character.prototype.constructor = character

	character.prototype.update_circle_timer = function() {
		this.counter--;
		this.circle_timer.clear();
		this.circle_timer.lineStyle(5, 0xffffff);
		this.circle_timer.arc(0, 0, 115, this.game.math.degToRad(-90), this.game.math.degToRad(-90+(360/this.counterMax)*(this.counterMax-this.counter)), false);
		if(this.counter === 0) {
			this.timer.destroy();
			this.circle_timer.visible=false
			this.flag_mouse=true
		}
	}
	character.prototype.reset_update_circle_timer = function() {
		//plus il est bas plus le cercle ira vite
		this.counter=45	
		this.timer = this.game.time.create(false);
		this.timer.loop(1, this.update_circle_timer, this);
		this.timer.start()
		this.circle_timer.visible=true
	}

	character.prototype.audio_click = function() {
		this.sound_click.play()
	}

	character.prototype.animate_restart = function() {
		this.restart_level()
	}

	character.prototype.back_to_menu = function() {
		game.state.start("game_first_screen")
	}

	character.prototype.send_data_mail = function(){
		var current_level=level_number+1
		var SubjectVariable='bubblex'+current_level
		var EmailVariable='espace3d@gmail.com'
		window.location='mailto:'+EmailVariable+'?subject='+SubjectVariable+'&body='+email
	}

	character.prototype.audio_star = function() {
		this.sound_star.play()
	}

	character.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	character.prototype.audio_launch = function() {
		this.sound_launch.play()
	}

	character.prototype.checkicharacterisloossomewhere = function(n) {
		if(this.player[n].flag_check){
			this.player[n].flag_check=false
			game.time.events.add( 6000,() => this.checkicharacterisloossomewhere2(n),this )
		}
	}

	character.prototype.checkicharacterisloossomewhere2 = function(n) {
		if(flag_level_complete==false){
			this.explode(this.player[n].x,0,n)	
		}
	}

	character.prototype.calculate_life_remaining= function(n){
		switch(n){
			case 0:
				this.life.text=2 
				break
			case 1:
				this.life.text=1 
				break
			default:
				this.life.text='' 
				break
		}

	}

	character.prototype.anim_cible = function() {
		this.tween6 = game.add.tween(this.cible_shadow.scale).to({x:2.0,y:2.0},750,Phaser.Easing.Linear.None,true,0,-1)
		this.tween7 = game.add.tween(this.cible_shadow).to({alpha:0.01},750,Phaser.Easing.Exponential.In,true,0,-1)
		this.tween6.onComplete.add(function(){this.cible_shadow.scale.setTo(0,0)},this)	
		this.tween7.onComplete.add(function(){this.cible_shadow.alpha=0},this)	
	}

	character.prototype.show_star = function() {
		this.star.visible=true	
		this.tween5 = game.add.tween(this.star.scale).to({x:1,y:1},200,Phaser.Easing.Linear.None,true,1000)
		this.tween5.onComplete.add(this.audio_star,this)
	}

	character.prototype.wins=function(){
		this._levelNumber=level_number+1
		// just testing, award random nr of stars
		//var randstars = this.game.rnd.integerInRange(1, 3);
		var randstars = this.star.frame
		//this._stars = this.game.add.bitmapText(160, 200, 'police', 'You get '+randstars+' stars!', 48);
		// set nr of stars for this level
		PLAYER_DATA[this._levelNumber-1] = randstars;
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
		game.state.start('level'+this.next_niveau,true,false);
	}

	character.prototype.next_level = function() {
		let next_niveau=level_number+1
		game.state.start('level'+next_niveau,true,false);
	}

	character.prototype.preload_reward_video=function(){
		var appId = "593f9e2504b0160769416382";
		var appSignature = "41fd9a8fc8adea90df03e94772ffa7e5373afcc6";
		window.chartboost.setUp(appId, appSignature);

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
			is_preload_rewarded_video=true
			//alert('onRewardedVideoAdPreloaded: ' + location);
		};
		window.chartboost.onRewardedVideoAdLoaded = function(location) {
			//alert('onRewardedVideoAdLoaded: ' + location);
		};
		window.chartboost.onRewardedVideoAdShown = function(location) {
			//alert('onRewardedVideoAdShown: ' + location);
		};
		window.chartboost.onRewardedVideoAdHidden = function(location) {
			//alert('onRewardedVideoAdHidden: ' + location);
			is_rewarded_video_completed && game.state.start('intermediate_screen');
		};
		window.chartboost.onRewardedVideoAdCompleted = function(location) {
			//alert('onRewardedVideoAdCompleted: ' + location);
			//ecran_intermediaire_pour_passer_level(background_to_pass_level,this.pass_level)
			//this.next_niveau=level_number+1
			is_rewarded_video_completed=true
			//game.state.start('intermediate_screen');
		};
		window.chartboost.preloadRewardedVideoAd('Default')
	}
	character.prototype.show_reward_video = function() {
		co("show_reward_video")
		is_mobile && window.chartboost.showRewardedVideoAd('Default')
	}

	character.prototype.next_level_with_video = function() {

		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
			this.show_reward_video()
		}
		else {
			console.log('not mobile')
			this.next_niveau=level_number+1
			game.state.start('level'+this.next_niveau,true,false);
		}
	}

	character.prototype.launch=function(n){
		this.reset_update_circle_timer()	
		this.audio_launch()
		this.player[n].body.enable=true
		this.checkicharacterisloossomewhere(n)
		this.player[n].visible=true
		this.player[n].body.velocity.y=-800
	}

	character.prototype.explode_cible=function(){
		this.particle.x=this.cible.x
		this.particle.y=this.cible.y
		this.particle.on=true
		this.particle.start(true,3900,null,15)
		game.time.events.add( 100,function(){this.particle.on=false},this )
	}

	character.prototype.explode=function(posx,posy,n){
		if(this.player[n].is_exploding==false){
			if(!flag_level_complete && n < 2){
				this.reset_update_circle_timer()	
			}
			count_modif_obj(this.life.text,count_hero,2)
			this.player[n].is_exploding=true
			this.calculate_life_remaining(n)
			this.audio_pop()
			this.on_explode()
			this.player[n].visible=false
			this.particle.x=posx
			this.particle.y=posy
			this.particle.on=true
			this.particle.start(true,3900,null,10)
			game.time.events.add( 100,function(){this.particle.on=false},this )
			this.player[n].body.enable=false
		}
	}

	character.prototype.on_explode=function(){
		this.count_dead=this.count_dead+1
		if(this.count_dead==3){
			this.decide_if_show_button_restart_level()
		}
	}

	character.prototype.decide_if_show_button_restart_level = function() {
		this.flag_hide_enemies=true
		game.time.events.add( 1000,this.button_restart.show_button,this.button_restart )
		is_preload_rewarded_video && game.time.events.add( 1000,this.button_video.show_button,this.button_video )
		game.time.events.add(1000,this.button_publish.show_button,this.button_publish )
	}

	character.prototype.land=function(n){
		flag_level_complete=true
		this.cible.body.enable=false
		this.player[n].body.enable=false
		this.tween0=game.add.tween(this.player[n]).to({x:w2,y:300},500,Phaser.Easing.Linear.None,true,0)
		this.tween0.onComplete.add(() => this.scale_x(n),this)	
	}

	character.prototype.calculate_star = function() {
		switch(this.count){
			case 0:
				this.star.frame=3
				break
			case 1:
				this.star.frame=3
				break
			case 2:
				this.star.frame=2
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
		this.button_publish.show_button()
	}

	character.prototype.hide_life_text = function() {
		this.life.visible=false	
	}

	character.prototype.show_button_restart_level_complete = function() {
		if(this.flag_show_button){
			this.flag_show_button=false
			this.button_restart.show_button()
			this.button_next.show_button()
			this.hide_life_text()
		}
	}

	_asteroid = function(number,posx,posy,speed,radius){
		_mechant.call(this,"asteroid",number,posx,posy,'asteroid','sprite_for_drag_asteroid')
		this.radius=radius
		this.speed=speed
		this.particle = game.add.emitter(this.sprite_for_body.x, this.sprite_for_body.y-25)
		this.particle.makeParticles("particle_bullet_color")
		this.particle.setXSpeed(-100,100)
		this.particle.setYSpeed(100,-100)
		this.particle.minParticleAlpha=.3
		this.particle.minParticleScale = .1
		this.particle.maxParticleScale = .7
		this.particle.minRotation = 0
		this.particle.maxRotation = 0
		this.particle.on=false
		game.time.events.add(delay_for_game_begin,()=>{this.particle.on=true;this.particle.start(true,500,5)})
		game.time.events.loop(16,this.update2,this)
	}

	_asteroid.prototype=Object.create(_mechant.prototype)

	_asteroid.prototype.update = function() {
		if(this.flag && this.flag_wait_before_fire && game_begin){
			var period = game.time.now * this.speed;
			this.sprite_for_body.x = this.x + Math.cos(period) * this.radius;
			this.sprite_for_body.y = this.y + Math.sin(period) * this.radius;	
			this.particle.x=this.sprite_for_body.x
			this.particle.y=this.sprite_for_body.y
		}
	}

	_asteroid.prototype.fire = function(){
		this.speed=this.speed
		this.sprite_for_body.x = this.sprite_for_body.x 
		this.sprite_for_body.y = this.sprite_for_body.y 
		this.radius.y=this.radius
	}

	_pulsar=function(number,delay,time,posx,posy,speed,scale_factor){
		_mechant.call(this,"pulsar",number,posx,posy,'pulsar','sprite_for_drag')
		this.number=number
		this.delay=delay
		this.time=time
		this.speed=speed
		this.scale_factor=scale_factor
		game.time.events.add( delay_for_game_begin,this.tweens,this )
		this.posx=posx
		this.posy=posy
		game.time.events.loop(16,this.update2,this)
	}
	_pulsar.prototype=Object.create(_mechant.prototype)

	_pulsar.prototype.tweens = function() {
		this.tween0=game.add.tween(this.sprite_for_body.scale).to({x:this.scale_factor,y:this.scale_factor},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}
	_pulsar.prototype.fire = function() {
		//voir si TODO
		//ici mettre is_exist(this.tweens) && game.tweens.remove.this et utiliser fire comme déclencheur
		game.tweens.remove(this.tween0)	
		this.sprite_for_body.scale.setTo(0,0)
		this.tween0=game.add.tween(this.sprite_for_body.scale).to({x:this.scale_factor,y:this.scale_factor},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle = function(number,delay,posx,posy,speed){
		_mechant.call(this,"dalle",number,posx,posy,'dalle','sprite_for_drag')
		this.delay=delay
		this.speed=speed
		this.sprite_for_body.alpha=0
		this.tweens()
		game.time.events.loop(16,this.update2,this)
	}
	_dalle.prototype=Object.create(_mechant.prototype)

	_dalle.prototype.tweens = function() {
		this.tween0=game.add.tween(this.sprite_for_body).to({alpha:1},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle.prototype.update = function() {
		this.alpha > .7 ? this.sprite_for_body.enable=true : this.sprite_for_body.enable=false
	}

	_dalle.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		this.sprite_for_body.alpha=0
		this.tween0=game.add.tween(this.sprite_for_body).to({alpha:1},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle_moving = function(number,delay,posx,posy,speed,posx_in_tween){
		_mechant.call(this,"dalle_moving",number,posx,posy,'dalle_moving','sprite_for_drag_dalle_moving')
		this.posx_in_tween=posx_in_tween
		this.delay=delay
		this.speed=speed
		game.time.events.add( time_appears_enemies,this.tweens,this )
	}
	_dalle_moving.prototype=Object.create(_mechant.prototype)

	_dalle_moving.prototype.tweens = function() {
		this.tween0=game.add.tween(this.sprite_for_body).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}

	_dalle_moving.prototype.update = function() {
		this.sprite_for_body.y=this.y
	}

	_dalle_moving.prototype.fire = function() {
		game.tweens.remove(this.tween0)	
		this.sprite_for_body.x=this.x
		this.sprite_for_body.y=this.posy
		this.posx_in_tween=this.posx_in_tween
		this.tween0=game.add.tween(this.sprite_for_body).to({x:this.posx+this.posx_in_tween},this.speed,Phaser.Easing.Linear.None,true,this.delay,-1)
		this.tween0.yoyo(true,this.speed)		
	}
	_canon = function(number,delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
		_mechant.call(this,"canon",number,posx,posy,'canon','sprite_for_drag')
		this.special_color=special_color
		this.kill_with_world=kill_with_world
		this.delay=delay
		this.name="canon"
		this.flag_explode=false
		this.speed=speed
		this.angular=angular
		this.frequency=frequency
		this._flag=_flag
		this.variance=variance
		this.sound_pop=game.add.audio('pop')
		this.flag_for_fire=true
		this._flag=true
		if(this.x < w2){
			this.particlex = game.add.emitter(this.x+40,this.y)
			this.particlex.makeParticles("particle_canon")
			this.particlex.minParticleSpeed.setTo(100,-120)
			this.particlex.maxParticleSpeed.setTo(300,120)
			this.particlex.setAlpha(.6, .2)
			this.particlex.minParticleScale = .1
			this.particlex.maxParticleScale = .9
			this.particlex.minRotation = 0
			this.particlex.maxRotation = 0
			this.particlex.on=false
		}else{
			this.particlex = game.add.emitter(this.x-40,this.y)
			this.particlex.makeParticles("particle_canon")
			this.particlex.minParticleSpeed.setTo(-100,-129)
			this.particlex.maxParticleSpeed.setTo(-300,120)
			this.particlex.setAlpha(.5, .2)
			this.particlex.minParticleScale = .1
			this.particlex.maxParticleScale = .9
			this.particlex.minRotation = 40
			this.particlex.maxRotation = -40
			this.particlex.on=false
		}

		game.physics.arcade.enable(this);
		this.special_color ? this.weapon=game.add.weapon(9,'bullet_color'):this.weapon=game.add.weapon(9,'bullet')	

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
		this.time_for_count=0
		this.ratio_time=8
		this.frequency > (this.ratio_time*100) ? this.time_total=Math.round(this.frequency*.01):this.time_total=8
		this.time_part=Math.round(this.time_total/this.ratio_time)
		this.flag_for_time_count=true
		game.time.events.loop( this.frequency,function(){this.flag_for_time_count=true},this) 
		game.time.events.loop(16,this.update2,this)

	}

	_canon.prototype=Object.create(_mechant.prototype)

	_canon.prototype.audio_pop = function() {
		this.sound_pop.play()
	}

	_canon.prototype.update = function(){
		if(this.flag_wait_before_fire && game_begin){
			this._flag==false && this.flag_for_fire && this.weapon.fire() 
			this.particlex.x=this.x
			this.particlex.y=this.y
			if(this.flag_for_time_count){
				this.time_for_count=this.time_for_count+1
				switch(this.time_for_count){
					case this.time_part:
						this.x=this.x+2	
						this.scale.y=1.1
						break
					case this.time_part*2:
						this.x=this.x+4	
						this.scale.y=1.2
						break
					case this.time_part*3:
						this.x=this.x+6	
						this.scale.y=1.3
						break
					case this.time_part*4:
						this.x=this.x+8	
						this.scale.y=1.4
						this.explosion()
						break
					case this.time_part*5:
						this.x=this.x-2	
						this.scale.y=1.3
						break
					case this.time_part*6:
						this.x=this.x-4	
						this.scale.y=1.2
						break
					case this.time_part*7:
						this.x=this.x-6	
						this.scale.y=1.1
						break
					case this.time_total:
						this.x=this.x-8	
						this.scale.y=1.0
						this.time_for_count=0
						this.flag_for_time_count=false
						this.hide_explosion()
						break
				}
			}
		}
	}

	_canon.prototype.transition = function() {
		this.tween_characteristic = game.add.tween(this.canon).to({x:posx,y:posy},time,Phaser.Easing.Linear.None,true,delay)
	}
	_canon.prototype.kill = function(){
		this.explode_bullet(this.weapon.bullets)
		this.weapon.bullets.visible=false
		this.hide()
		this.hide_explosion()
		this.destroy()
		this.weapon.bullets.forEach(function(item){
			if(item.alive){	
				item.body.enable=false
			}})
	}

	_canon.prototype.fire = function() {
		this.flag_for_fire=true
		this.weapon.fireRate = this.frequency ;
		this.weapon.bulletSpeed = this.speed;
		this.angle=this.angular
		this.weapon.bulletAngleVariance = this.variance;
	}

	_canon.prototype.explosion = function() {
		if(this.visible && game_begin){
			this.particlex.on=true
			this.particlex.start(true,450,null,1)
		}
	}
	_canon.prototype.hide_explosion = function() {
		this.particlex.on=false
	}


	_canon.prototype.explode_bullet=function(){
		if(this.flag_explode==false){
			this.flag_explode=true
			this.audio_pop()
			if(this.special_color){
				this.weapon.bullets.forEach(function(item){
					if(item.alive){	
						this.particle = game.add.emitter(item.x,item.y)
						this.particle.makeParticles("particle_bullet_color")
						this.particle.minParticleSpeed.setTo(-300,-300)
						this.particle.maxParticleSpeed.setTo(800,800)
						this.particle.setAlpha(.8, .6)
						this.particle.minParticleScale = .2
						this.particle.maxParticleScale = .5
						this.particle.minRotation = 0
						this.particle.maxRotation = 0
						this.particle.on=false
						this.particle.start(true,9000,null,2)
					}})
			}else{
				this.weapon.bullets.forEach(function(item){
					if(item.alive){	
						this.particle = game.add.emitter(item.x,item.y)
						this.particle.makeParticles("particle_bullet")
						this.particle.minParticleSpeed.setTo(-300,-300)
						this.particle.maxParticleSpeed.setTo(800,800)
						this.particle.setAlpha(.8, .6)
						this.particle.minParticleScale = .2
						this.particle.maxParticleScale = .5
						this.particle.minRotation = 0
						this.particle.maxRotation = 0
						this.particle.on=false
						this.particle.start(true,9000,null,2)
					}})
			}
		}
	}

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

	var bootstate= {
		preload: function(){
			console.log("%cStarting Bubx", "color:white; background:#ff1fcd");
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
			//interface
			this.game.load.image("background","assets/background.png");
			this.game.load.image("button_back","assets/button_back.png");
			this.game.load.image("title","assets/title.png");
			this.game.load.spritesheet('star','assets/star.png', 300, 100);
			this.game.load.image("levelselecticons","assets/levelselecticons.png");
			this.game.load.image("cible","assets/cible2.png");
			this.game.load.image("cible_shadow","assets/cible_shadow.png");
			this.game.load.image("grid","assets/grid.png");
			//audio
			this.game.load.audio("launch","sounds/launch.ogg");
			this.game.load.audio("coin","sounds/coin.ogg");
			this.game.load.audio("pop_minder","sounds/pop2.ogg");
			this.game.load.audio("pop","sounds/pop2.ogg");
			this.game.load.audio("click","sounds/click.ogg");
			//images_enemy
			this.game.load.image("canon","assets/canon.png");
			this.game.load.image("asteroid","assets/asteroid.png");
			this.game.load.image("sprite_for_drag_asteroid","assets/sprite_for_drag_asteroid.png");
			this.game.load.image("sprite_for_drag","assets/sprite_for_drag.png");
			this.game.load.image("pulsar","assets/pulsar.png");
			this.game.load.image("dalle","assets/dalle.png");
			this.game.load.image("dalle_moving","assets/dalle_moving.png");
			this.game.load.image("touch","assets/touch.png");
			this.game.load.image("sprite_for_drag_dalle_moving","assets/sprite_for_drag_dalle_moving.png");
			//images_button
			this.game.load.image("button_video","assets/button_video.png");
			this.game.load.image("button_menu","assets/button_menu.png");
			this.game.load.image("button_play","assets/button_play.png");
			this.game.load.image("button_menu_level_select","assets/button_menu_level_select.png");
			this.game.load.image("button_restart","assets/button_restart.png");
			this.game.load.image("button_next","assets/button_next.png");
			this.game.load.image("button_publish","assets/button_publish.png");
			//particles
			this.game.load.image("bullet_color","assets/bullet_color.png");
			this.game.load.image("bullet","assets/bullet.png");
			this.game.load.image("particle_canon","assets/particle_canon.png");
			this.game.load.image("particle_bullet_color","assets/particle_bullet_color.png");
			this.game.load.image("particle_bullet","assets/particle_bullet.png");
			this.game.load.image("particle_character","assets/particle_character.png");
			//font bitmapFont
			this.game.load.bitmapFont('police','fonts/font.png', 'fonts/font.fnt');
		},

		create: function(){
			this.game.stage.backgroundColor = '#0d1018'
			this.background=game.add.sprite(0,0,'background');
			this.game.add.existing(this.background)
			game.time.events.add(1000, ()=>{game.state.start("game_first_screen")});
			//game.state.start("intermediate_screen");
		},
	}

	var game_first_screen = {
		create: function(){
			this.game.stage.backgroundColor = '#0d1018'
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


	/*	
	clic0 - stop anim0 >c0 -e -anim1
	clic1 - stop anim1 >c1 -e -anim2
	clic2 - stop anim2 >c2 -e

-e -anim1 via collide dans update on incremente manuellement de 1
ensuite via accion dans clic l'incrementation se fait automatiquement
*/
	//tween on the circle
	start_tw = (obj) => {
		tw_action(obj)
		flag_tween_en_cours=true
	}

	// declaration of tw_action
	tw_action= (obj) => {
		obj.scale.setTo(1,1)
		tw_name= game.add.tween(obj.scale).to({x:1.5,y:1.5},1000,Phaser.Easing.Linear.None,true,delay_circle_timer,-1)
		tw_name = game.add.tween(obj).to({alpha:1},1000,Phaser.Easing.Linear.None,true,delay_circle_timer,-1)
	}


	//stop tween
	stop_tw = (obj,tw) => {
		if(tw != 'undefined'){
			obj.alpha=0		
			game.tweens.remove(tw)
			flag_tween_en_cours=false
		}
	}

	animate_touch = start_tw
	var conditional_animate_touch = ()=>{!flag_tween_en_cours && animate_touch(hero.touch_button)}


	function create_level(num){ 
		game_begin=false
		flag_hide=false

		game.time.events.add(delay_for_game_begin,function(){flag_hide=true})
		game.time.events.add(delay_for_game_begin,function(){game_begin=true})
		game.time.events.add(delay_for_game_begin,()=>{flag_level_complete=false})
		is_rewarded_video_completed=false
		is_preload_rewarded_video=false
		hero = new character() 
		count_hero=0
			game.time.events.add(delay_for_game_begin,()=>{hero.life.visible=true})
		game.time.events.add(delay_for_game_begin,()=>{animate_touch(hero.touch_button)})
		level_number=num
		level_number_adapt=level_number+1
		var _level_name=level_name[level_number]
		text_to_describe_level=new _text(_level_name,w2,h2,100)
		text_to_describe_level.visible=false
		text_to_describe_level.alpha=0
		text_to_describe_level.show()
		text_to_number_level=new _text(level_number_adapt,w2,320,90);
	}

	function logic(){
		logic_add()
		logic_update()
	}

	is_clic_valid =(count,f) =>{
		let condition = (count) => {
			switch(count){
				case 0:
					return true
					break
				case 1:
					return true
					break
				case 2:
					return true
					break
				default:
					return false
					break
			}
		}
		let cond = condition(count)

		if (condition(count) && f){
			return true
		}else{
			return false
		}
	}

	condition_update_circle_timer = (count) => {
		count_modif_obj(hero.life.text,count,2)
	}

	action=(count) => {
		condition_update_circle_timer(count)
		stop_tw(hero.touch_button,tw_name)	
		count_hero++
		hero.launch(count)
	}


	can_t_launch = (count,f) => {
		if(is_clic_valid(count,f)){
			action(count);
		}  
	}

	_tap = () => {
		game.input.onTap.add(onTap);

		function onTap(pointer, doubleTap) {
			if(flag_level_complete==false){
				if (!doubleTap && hero.flag_mouse==true && game_begin){
					can_t_launch(count_hero,hero.flag_mouse)
					hero.flag_mouse=false
					let _action = function(){hero.flag_mouse=true}
					game.time.events.add(hero.delay_for_launch_next_player,_action)
				}
			}
		}
	}

	//var level0 = level_0(0,create_level,_tap,this,canon,_canon,logic,flag_level_complete)

	//			
	//			
	//
	//			//ne peut pas bouger
	//			count_hero=0
	//			//indication du level
	//			create_level(0)
	//			number_canon=1
	//			number_asteroid=1
	//			number_dalle_moving=0
	//			number_pulsar=1
	//			number_dalle=1
	//
	//			//function create_obj_internal(obj,tableau){
	//			//obj=new _canon(tableau)	
	//			//}
	//
	//			this.create_canon=function(){
	//				canon[0]=new _canon(
	//					number=0,
	//					delay=0,
	//					posx=w-200,
	//					posy=100,
	//					speed=900,
	//					frequency=90,
	//					variance=0,
	//					angular=180,
	//					_flag=flag_level_complete,
	//					kill_with_world=true,
	//					special_color=false
	//				)
	//				//canon[1]=new _canon(
	//				//	number=1,
	//				//	delay=0,
	//				//	posx=0,
	//				//	posy=1200,
	//				//	speed=400,
	//				//	frequency=900,
	//				//	variance=0,
	//				//	angular=0,
	//				//	_flag=flag_level_complete,
	//				//	kill_with_world=true,
	//				//	special_color=false
	//				//)
	//			}
	//			this.create_asteroid=function(){
	//				asteroid[0]=new _asteroid(
	//					number=0,
	//					posx=100,
	//					posy=240,
	//					speed=.008,
	//					radius=100
	//				)
	//			}
	//
	//			this.create_dalle_moving=function(){
	//				//dalle_moving[0]=new _dalle_moving(
	//				//	number=0,
	//				//	delay=100,
	//				//	posx=240,
	//				//	posy=h2+100,
	//				//	speed=300,
	//				//	posx_in_tween=300
	//				//)
	//			}
	//
	//			this.create_pulsar=function(){
	//				pulsar[0]=new _pulsar(
	//					number=0,
	//					delay=100,
	//					time=800,
	//					posx=w2,
	//					posy=840,
	//					speed=2000,
	//					scale_factor=2
	//				)
	//			}
	//
	//			this.create_dalle=function(){
	//				dalle[0]=new _dalle(
	//					number=0,
	//					delay=100,
	//					posx=100,
	//					posy=440,
	//					speed=300
	//				)
	//				//	dalle[1]=new _dalle(
	//				//		number=0,
	//				//		delay=100,
	//				//		posx=600,
	//				//		posy=940,
	//				//		speed=300,
	//				//	)
	//			}
	//
	//			if(debug_store){
	//				check_storage(this.create_canon,this.create_asteroid,this.create_dalle_moving,this.create_pulsar,this.create_dalle,number_canon,number_asteroid,number_dalle_moving,number_pulsar,number_dalle)
	//
	//			}else{
	//				this.create_canon()
	//				this.create_asteroid()
	//				this.create_dalle_moving()
	//				this.create_pulsar()
	//				this.create_dalle()
	//			}
	//			logic()
	//			return level_number
	//},
	//update:function(){
	//tap(this,hero)
	//_tap(this)
	//},
	//render:function(){
	//logic_render()
	//},
	//}
	//	var level1 = {
	//		create: function(){
	//			//indication du level
	//			create_level(1)
	//
	//			number_canon=1
	//			number_asteroid=1
	//			number_dalle_moving=0
	//			number_pulsar=1
	//			number_dalle=1
	//
	//			//function create_obj_internal(obj,tableau){
	//			//obj=new _canon(tableau)	
	//			//}
	//
	//			this.create_canon=function(){
	//				canon[0]=new _canon(
	//					number=0,
	//					delay=0,
	//					posx=w-200,
	//					posy=100,
	//					speed=900,
	//					frequency=90,
	//					variance=0,
	//					angular=180,
	//					_flag=flag_level_complete,
	//					kill_with_world=true,
	//					special_color=false
	//				)
	//				//canon[1]=new _canon(
	//				//	number=1,
	//				//	delay=0,
	//				//	posx=0,
	//				//	posy=1200,
	//				//	speed=400,
	//				//	frequency=900,
	//				//	variance=0,
	//				//	angular=0,
	//				//	_flag=flag_level_complete,
	//				//	kill_with_world=true,
	//				//	special_color=false
	//				//)
	//			}
	//			this.create_asteroid=function(){
	//				asteroid[0]=new _asteroid(
	//					number=0,
	//					posx=100,
	//					posy=240,
	//					speed=.008,
	//					radius=100
	//				)
	//			}
	//
	//			this.create_dalle_moving=function(){
	//				//dalle_moving[0]=new _dalle_moving(
	//				//	number=0,
	//				//	delay=100,
	//				//	posx=240,
	//				//	posy=h2+100,
	//				//	speed=300,
	//				//	posx_in_tween=300
	//				//)
	//			}
	//
	//			this.create_pulsar=function(){
	//				pulsar[0]=new _pulsar(
	//					number=0,
	//					delay=100,
	//					time=100,
	//					posx=w2,
	//					posy=840,
	//					speed=2000,
	//					scale_factor=2
	//				)
	//			}
	//
	//			this.create_dalle=function(){
	//				dalle[0]=new _dalle(
	//					number=0,
	//					delay=100,
	//					posx=100,
	//					posy=440,
	//					speed=300
	//				)
	//				//	dalle[1]=new _dalle(
	//				//		number=0,
	//				//		delay=100,
	//				//		posx=600,
	//				//		posy=940,
	//				//		speed=300,
	//				//	)
	//			}
	//			if(debug_store){
	//				check_storage(this.create_canon,this.create_asteroid,this.create_dalle_moving,this.create_pulsar,this.create_dalle,number_canon,number_asteroid,number_dalle_moving,number_pulsar,number_dalle)
	//
	//			}else{
	//				this.create_canon()
	//				this.create_asteroid()
	//				this.create_dalle_moving()
	//				this.create_pulsar()
	//				this.create_dalle()
	//			}
	//			logic()
	//			return level_number
	//		},
	//		update:function(){
	//			tap(this,hero)
	//		},
	//		render:function(){
	//			logic_render()
	//		},
	//	}
	var levsel={
		// define needed variables for mygame.LevelSelect
		preload: function() {
			this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 275, 300);
			this.game.load.bitmapFont('police','fonts/font.png', 'fonts/font.fnt');
			this.game.load.image("background","assets/background.png");

			this.initProgressData();
		},

		create: function() {
			this.holdicons = [];
			this.game.stage.backgroundColor = '#0d1018'
			this.game.add.sprite(0,0,'background');
			this.text=game.add.bitmapText(640,200,'police','SELECT A LEVEL!',100);
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
				var txt = this.game.add.bitmapText(137, 147, 'police', ''+levelnr, 100);
				txt.anchor.setTo(.5,.5)
				var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', (2+stars));

				IconGroup.add(icon2);
				IconGroup.add(txt);
			}else{
				var txt_locked = this.game.add.bitmapText(137, 147, 'police', ''+levelnr, 100);
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
			for (var i=0; i < this.holdicons.length; i++){
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
			game.state.start('level'+this.number_level,true,false)
		},
	};



	var logic_add=function(){
		game.add.existing(hero)

		var logic_add_intenal=function(obj){
			if(obj[0]){
				for_each(obj,game.add.existing.bind(game));
			}	
		}

		logic_add_intenal(canon)
		logic_add_intenal(dalle)
		logic_add_intenal(dalle_moving)
		logic_add_intenal(pulsar)
		logic_add_intenal(asteroid)
	}
	var logic_update=function(){
		game.time.events.loop( 50,function(){ 

			//debug_position && logic_position()
			for (var j = 0; j < 3; j++){
				game.physics.arcade.collide(hero.cible,hero.player[j],() => hero.land(j))
			}

			//si reussi niveau
			flag_level_complete && flag_hide && flag_level_complete==false & console.log("ok") & game.time.events.add( 9,hide_weapon,this )

			//si checkicharacterisloossomewhere
			hero.flag_hide_enemies && flag_hide && hero.flag_hide_enemies==false & game.time.events.add( 300,hide_weapon,this )

			if(canon[1]){
				game.physics.arcade.collide(canon[0].weapon.bullets,canon[1].weapon.bullets,touch_between_enemies,null,this)
			}

			if(canon[2]){
				game.physics.arcade.collide(canon[0].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
				game.physics.arcade.collide(canon[1].weapon.bullets,canon[2].weapon.bullets,touch_between_enemies,null,this)
			}

			var collide_function=function(obj){
				if(obj[0]){
					for (var i = 0; i < 3; i++){
						for (var j = 0; j < obj.length; j++){
							game.physics.arcade.collide(obj[j].sprite_for_body,hero.player[i],() => {hero.explode(hero.player[i].body.x,hero.player[i].body.y,i);conditional_animate_touch()})

						}
					}
				}
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

			collide_function(dalle_moving)
			collide_function(pulsar)
			collide_function(asteroid)
			collide_function(dalle)

		})
	}

	var touch_between_enemies=function(){
		console.log("touch");

	}

	var hide_weapon=function(){
		if(flag_hide){
			console.log("hide_weapon")
			hero.touch_button.visible=false
			flag_hide = false
			console.log('hide')
			if(canon[0]){
				for (var j = 0; j < canon.length; j++){
					canon[j].explode_bullet(canon[j].weapon.bullets)
					canon[j].visible=false
					canon[j].weapon.bullets.visible=false
					canon[j].hide_explosion()
					canon[j].destroy()
					canon[j].weapon.bullets.forEach(function(item){
						if(item.alive){	
							item.body.enable=false
						}})
				}
			}
			for_action(dalle,'hide')
			for_action(canon,'hide')
			for_action(dalle_moving,'hide')
			for_action(asteroid,'hide')
			for_action(pulsar,'hide')
		}
	}

	var show_grid_on_logic_position=function(sprite){
		console.log("logic_position")
		debug_mode ? hero.grid.visible=true:hero.grid.visible=false	
		logic_position(sprite)

		if(debug_position){

			gui && gui.destroy()
			gui=new dat.GUI()
			gui.start=true
			var guit={}

			function guit_declare(...args){
				let condition=args.length
				//obligé ...ne sait pas pourquoi
				let parameter=args[1]
				if (condition> 2){	
					guit.parameter=gui.add(args[0],args[1],args[2],args[3])
					co(args[1],"args")
					guit.parameter.onChange(function(value){
						args[0].fire()
						logic_position(args[0])
					})
				}else{
					guit.parameter=gui.add(args[0],args[1])
					guit.parameter.onChange(function(value){
						args[0].kill()
						logic_position(args[0])
					})
				}
			}

			switch(sprite.name){
				case "canon":
					gui.add(sprite,'name')
					guit_declare(sprite,'speed',0,5000)
					guit_declare(sprite,'frequency',0,5000)
					guit_declare(sprite,'kill_with_world')
					guit_declare(sprite,'special_color')
					guit_declare(sprite,'angular',0,360)
					guit_declare(sprite,'variance',0,1000)
					guit_declare(sprite,'kill')
					break
				case "pulsar":
					gui.add(sprite,'name')
					guit_declare(sprite,'speed',300,9000)
					guit_declare(sprite,'kill')
					break;
				case "asteroid":
					gui.add(sprite,'name')
					gui.add(sprite,'radius',100,500)
					gui.add(sprite,'speed',0,.01)
					guit_declare(sprite,'kill')
					break;
				case "dalle_moving":
					gui.add(sprite,'name')
					guit_declare(sprite,'speed',300,3000)
					guit_declare(sprite,'posx_in_tween',-800,800)
					guit_declare(sprite,'kill')
					break;
				case "dalle":
					gui.add(sprite,'name')
					guit_declare(sprite,'speed',300,3000);
					guit_declare(sprite,'kill');
					break;
				default:
					break;
			}
		}
	}

	var logic_position=function(sprite){
		if (debug_position){
			hero.grid.visible=false	
			var _table
			var _name_json
			switch(sprite.name){
				case 'canon':
					_table=c
					_name_json='canon'
					_table[sprite.number] = {
						number:sprite.number,
						delay:Math.round(sprite.delay),
						x:Math.round(sprite.x),
						y:Math.round(sprite.y),
						speed:Math.round(sprite.speed),
						frequency:Math.round(sprite.frequency),
						variance:Math.round(sprite.variance),
						angular:Math.round(sprite.angular),
						_flag:sprite._flag,
						kill_with_world:sprite.kill_with_world,
						special_color:sprite.special_color,
					};
					break
				case 'asteroid':
					_table=a
					_name_json='asteroid'
					_table[sprite.number] = {
						x:Math.round(sprite.x),
						y:Math.round(sprite.y),
						speed:sprite.speed,
						radius:Math.round(sprite.radius),
					};
					break
				case 'dalle_moving':
					_table=n
					_name_json='dalle_moving'
					_table[sprite.number] = {
						delay:Math.round(sprite.delay),
						x:Math.round(sprite.x),
						y:Math.round(sprite.y),
						speed:Math.round(sprite.speed),
						posx_in_tween:Math.round(sprite.posx_in_tween),
					};
					break
				case 'pulsar':
					_table=p
					_name_json='pulsar'
					_table[sprite.number] = {
						delay:Math.round(sprite.delay),
						time:Math.round(sprite.time),
						x:Math.round(sprite.x),
						y:Math.round(sprite.y),
						speed:Math.round(sprite.speed),
						scale_factor:sprite.scale_factor,
					};
					break
				case 'dalle':
					_table=d
					_name_json='dalle'
					_table[sprite.number] = {
						delay:Math.round(sprite.delay),
						x:Math.round(sprite.x),
						y:Math.round(sprite.y),
						speed:Math.round(sprite.speed),
					};
					break
			}
			this.level=level_number
			this.name_level='lev'
			this.combined_level=this.name_level+this.level
			debug_store && localStorage.setItem(_name_json+sprite.number+this.combined_level, JSON.stringify(_table[sprite.number]));
		}
	}

	var check_storage=function(_create_canon,_create_asteroid,_create_dalle_moving,_create_pulsar,_create_dalle,num_canon,num_asteroid,num_dalle_moving,num_pulsar,num_dalle){
		//var check_in_local_storage=function(obj,num,table){
		//	for(var i=0;i<num;i++){
		//		try {
		//			table[i] = JSON.parse( localStorage.getItem( obj+i+'lev'+level_number ) ) ;
		//		} catch(e){
		//			table[i]=[];
		//		}
		//	};
		//}
		var check_in_local_storage=function(obj,num,table){
			for(var i=0;i<num;i++){
				table[i] = JSON.parse( localStorage.getItem( obj+i+'lev'+level_number ) ) ;
			};
		}

		check_in_local_storage("canon",num_canon,c)
		check_in_local_storage("asteroid",num_asteroid,a)
		check_in_local_storage("dalle_moving",num_dalle_moving,n)
		check_in_local_storage("pulsar",num_pulsar,p)
		check_in_local_storage("dalle",num_dalle,d)

		for(var i=0;i<num_canon;i++){
			if (c[i]===null){
				_create_canon()
				break
			}else{
				c[i]=JSON.parse(localStorage.getItem('canon'+i+'lev'+level_number))
				canon[i]=new _canon(i,c[i].delay,c[i].x,c[i].y,c[i].speed,c[i].frequency,c[i].variance,c[i].angular,flag_level_complete,c[i].kill_with_world,c[i].special_color);
			}
		}

		///////////////////////////////////////////////////////////////////////////////////////////

		for(var i=0;i<num_asteroid;i++){
			if (a[i]===null){
				_create_asteroid()
				break
			}else{
				//asteroid = function(number,posx,posy,speed,radius)
				co(a[i].radius,"check_in_local_storage")
				asteroid[i]=new _asteroid(i,a[i].x,a[i].y,a[i].speed,a[i].radius)
			}
		}
		///////////////////////////////////////////////////////////////////////////////////////////

for(var i=0;i<num_dalle_moving;i++){
	if (n[i]===null){
		_create_dalle_moving()
		break
	}else{
		//dalle_moving = function(number,delay,posx,posy,speed)
		dalle_moving[i]=new _dalle_moving(i,n[i].delay,n[i].x,n[i].y,n[i].speed,n[i].posx_in_tween)
	}
}
///////////////////////////////////////////////////////////////////////////////////////////
for(var i=0;i<num_pulsar;i++){
	if (p[i]===null){
		_create_pulsar()
		break
	}else{
		//pulsar = function(number,delay,time,posx,posy,speed,scale_factor)
		pulsar[i]=new _pulsar(i,p[i].delay,p[i].time,p[i].x,p[i].y,p[i].speed,p[i].scale_factor)
	}
}

for(var i=0;i<num_dalle;i++){
	if (d[i]===null){
		_create_dalle()
		break
	}else{
		//dalle = function(number,delay,posx,posy,speed)
		dalle[i]=new _dalle(i,d[i].delay,d[i].x,d[i].y,d[i].speed)
	}
}

}

var logic_render=function(){
	if(debug_mode){
		game.debug.body(hero.cible_shadow)
		game.debug.body(hero.cible)

		//ne sait pas appliquer foreach car this.hero.player renvoit Object[Object,Object,Object]
		for (var i = 0; i < 3;i++){
			game.debug.body(hero.player[i])
		}

		var debug_obj=function(obj){
			if (obj[0]){
				for_each(obj,game.debug.body)
			}
		}
		debug_obj(dalle)
		debug_obj(dalle_moving)
		debug_obj(pulsar)
		debug_obj(asteroid)
		//encore à peaufiner check dernier
		if(canon[0]){
			for (var i = 0; i < canon.length;i++){
				canon[i].weapon.bullets.forEach(function(item){game.debug.body(item)})
			}
		}
	}
}

const level_config={
	constructor_canon:_canon,
	canon:canon,
	_flag_level_complete:flag_level_complete,
	asteroid:asteroid,
	constructor_asteroid:_asteroid,
	dalle_moving:dalle_moving,
	constructor_dalle_moving:_dalle_moving,
	pulsar:pulsar,
	constructor_pulsar:_pulsar,
	dalle:dalle,
	constructor_dalle:_dalle,
	debug_store:debug_store,
	_check_storage:check_storage,
	create_level:create_level,
	logic:logic,
	tap:_tap,
}
ecran_intermediaire_pour_passer_level=(obj,next_action) => {
	co(obj,next_action)
	obj.alpha =1
	obj.scale.setTo(0,0)
	this.tween_alpha = game.add.tween(obj).to({angle:45},1100,Phaser.Easing.Elastic.Out,true,900)
	this.tween_alpha = game.add.tween(obj.scale).to({x:1.5,y:1.5},1100,Phaser.Easing.Elastic.Out,true,900)
	this.tween_alpha = game.add.tween(obj).to({alpha:1},800,Phaser.Easing.Linear.None,true,1200)
	this.tween_alpha.onComplete.add(this.next_tw,this)
	this.next_tw = ()=>{
		this.tween_scale = game.add.tween(obj.scale).to({x:0,y:0},2200,Phaser.Easing.Linear.None,true,3800)
		this.tween_scale.onComplete.add(next_action)	
	}
}

var pass_level=()=>{
	let next_niveau=level_number+1
	game.state.start('level'+next_niveau,true,false);
}

var intermediate_screen={
	create:function(){

		background_to_pass_level = game.add.sprite(0,0,'background')
		background_to_pass_level.alpha = 1
		text_passed_level = new _text("level passed",w2,h2,100)
		this.particlex = game.add.emitter(text_passed_level.text.x,text_passed_level.text.y)
		this.particlex.makeParticles("particle_canon")
		this.particlex.minParticleSpeed.setTo(-900,900)
		this.particlex.maxParticleSpeed.setTo(900,-900)
		this.particlex.setAlpha(.5, .1)
		this.particlex.minParticleScale = .1
		this.particlex.maxParticleScale = .4
		this.particlex.minRotation = 0
		this.particlex.maxRotation = 0
		this.particlex.on=false
		
		game.time.events.add(600,()=>{this.particlex.start(true,2950,null,5)})
		game.time.events.add(800,()=>{this.particlex.on=true})

		let next_action = ()=>{
			game.time.events.add(1200,pass_level)	
		}
		ecran_intermediaire_pour_passer_level(text_passed_level.text,next_action)
	},
}

var level0=level_0(level_config,0)
var level1=level_1(level_config,1)
var level2=level_2(level_config,2)
var level3=level_3(level_config,3)


game = new Phaser.Game(1280,1920,Phaser.CANVAS,'game' )
game.state.add('boot',bootstate)
game.state.add('preload',preloadstate)
game.state.add('game_first_screen',game_first_screen)
game.state.add('intermediate_screen',intermediate_screen)
game.state.add('level0',level0)
game.state.add('level1',level1)
game.state.add('level2',level2)
game.state.add('level3',level3)
game.state.add('levsel', levsel); // note: first parameter is only the name used to refer to the state
game.state.start('boot',bootstate)
}

var detectmob=function(){ 
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	){
		document.addEventListener('deviceready',main,false)
		is_mobile=true
		return true;
	} else {
		console.log('not mobile')
		is_mobile=false
		main()
		return true;
	}
}
detectmob()


