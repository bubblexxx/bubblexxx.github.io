var PLAYER_DATA = null // just declare as global variable for now
var ratio_device=window.screen.width/window.screen.height
var h=1920
var w=1280
//this._levelNumber = 1;
//var clearWorld=true
//var clearCache=false
var h2=h*.5
var w2=640
var level_number=0

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
	Phaser.Sprite.call(this,game,w2,h+500,'rect')
	this.flag_mouse=false
	this.flag_show_button=true
	this.cible_shadow=game.add.sprite(w2,300,'cible')
	this.cible_shadow.anchor.setTo(.5,.5)
	this.cible_shadow.scale.setTo(1.5,1.5)
	this.cible_shadow.alpha=.2
	//cible
	this.cible=game.add.sprite(w2,300,'cible')
	this.cible.anchor.setTo(.5,.5)
	game.physics.arcade.enable(this.cible,Phaser.Physics.ARCADE)
	this.cible.scale.setTo(1.5,1.5)


	this.anchor.setTo(.5,.5)
	this.flag_level_complete=false
	//this.flag_show_video=true
	this.flag_hide_enemies=false
	this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.flag_spacekey=true
	this.enableBody=true
	//game.time.events.add( 2250,this.launch,this )
	this.count=-1
	this.player={}
	for (var i = 0; i < 3; i++){
		this.player[i]=game.add.sprite(w2,1980,'rect')	
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
	this.sound_launch=game.add.audio('launch')
	this.sound_pop=game.add.audio('pop_minder')
	this.button_restart=game.add.button(w2,h2,'restart',this.restart_level,this)
	this.button_restart.anchor.setTo(.5,.5)
	this.button_restart.scale.setTo(0,0)
	this.button_restart.visible=false
	this.button_next=game.add.button(w2,this.cible.y,'next',this.next_level,this)
	this.button_next.anchor.setTo(.5,.5)
	this.button_next.scale.setTo(0,0)
	this.button_next.visible=false
	this.button_video=game.add.button(w2,h2+400,'button_video',this.next_level,this)
	this.button_video.anchor.setTo(.5,.5)
	this.button_video.scale.setTo(0,0)
	this.button_video.visible=false
	//this.frame=0
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

character.prototype.audio_pop = function() {
	this.sound_pop.play()
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

character.prototype.show_star = function(frame) {
	this.star.visible=true	
	this.tween5 = game.add.tween(this.star.scale).to({x:1,y:1},800,Phaser.Easing.Linear.None,true,600)
	//this.tween5.yoyo(200,true)

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
character.prototype.launch_with_mouse=function(){
	if(this.flag_level_complete==false && this.flag_mouse==false){
		this.flag_mouse=true
		game.time.events.add( 500,function(){this.flag_mouse=false},this )

		this.count=this.count+1
		if(this.count <= 2){
			console.log(this.count);
			this.player[this.count].visible=true
			this.player[this.count].body.velocity.y=-800
			this.audio_launch()
			this.life.text=3-(this.count+1)
			if(this.count==2){
				this.life.text='' 
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
		this.on_explode(n)
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
	//this.flag_show_video=false
	game.time.events.add( 2000,this.show_button_restart_level,this )
	game.time.events.add( 2000,this.show_button_video,this )
	this.flag_hide_enemies=true
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

character.prototype.calculate_star = function() {
	switch(this.count){
		case 0:
			this.star.frame=3
			break
		case 1:
			this.star.frame=2
			break
		case 2:
			this.star.frame=1
		case 3:
			this.star.frame=0
			break
	}
	//PLAYER_DATA[this._levelNumber-1] = this.star.frame;


	//// unlock next level
	//if (this._levelNumber < PLAYER_DATA.length) {
	//	if (PLAYER_DATA[this._levelNumber] < 0) { // currently locked (=-1)
	//		PLAYER_DATA[this._levelNumber] = 0; // set unlocked, 0 stars
	//	}
	//};

	//// and write to local storage
	//window.localStorage.setItem('mygame_progress', JSON.stringify(PLAYER_DATA));
}


character.prototype.scale_x = function(n){
	this.tween1=game.add.tween(this.player[n].scale).to({x:4.5,y:4.5},500,Phaser.Easing.Bounce.Out,true,0)
	this.tween1.onComplete.add(this.explode_cible,this)
	this.show_button_restart_level_complete()
	game.time.events.add( 300,this.audio_pop,this )

	//this.explode_cible()
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
//weapon

weapon = function(delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
	this.special_color=special_color
	this.kill_with_world=kill_with_world
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
	this.delay=delay
	//canon
	Phaser.Sprite.call(this,game,this.posx,this.posy,'canon')
	this.anchor.setTo(.5,.5)
	this.angle=this.angular
	game.physics.arcade.enable(this);
	if(this.special_color=="vrai"){
		this.weapon=game.add.weapon(9,'bullet_color')
	}else{
	this.weapon=game.add.weapon(9,'bullet')	
	}


	if(this.kill_with_world=="vrai"){
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

weapon.prototype.explode_bullet=function(){
	if(this.flag_explode==false){
		this.flag_explode=true
		this.audio_pop()
		if(this.special_color=="vrai"){
			this.weapon.bullets.forEach(function(item){
				if(item.alive){	
					this.particle = game.add.emitter(item.x,item.y,85)
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
					this.particle = game.add.emitter(item.x,item.y,85)
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

var bootstate= {
	preload: function(){
		console.log("%cStarting minimalistic game", "color:white; background:red");
		this.load.image("loading","assets/loading.png"); 
		this.load.image("loading_back","assets/loading_back.png"); 
	},
	create: function(){

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		//this.game.width=window.innerWidth
		//this.game.height=window.innerHeight
		this.scale.pageAlignHorizontally = true
		this.scale.pageAlignVertically = true
		//this.scale.refresh()
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
		this.game.load.audio("pop_minder","sounds/pop_minder.ogg");
		this.game.load.audio("pop","sounds/pop.ogg");
		this.game.load.audio("launch","sounds/launch.ogg");
		//images
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
		//this.game.state.start("game_state");
	}
}

var game_first_screen = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		this.title=new screen_first()
		game.add.existing(this.title)
		this.initProgressData()
		//game.time.events.add( 6,() => game.state.start('levsel',levsel))
		//game.time.events.add( 5000,() => game.state.start('game_state',game_state))
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

	createBanner:function() {

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
	},

	showProviderSelector:function() {
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
		this.showControls();

	},

	showControls:function() {
		// voir nécessaire
		if (adService) {
			this.createBanner();
		}


		banner.setLayout(demoPosition);
		//load banner
		banner.load();

		//show banner
		game.time.events.add( 15000,banner.show)
		demoPosition = Cocoon.Ad.BannerLayout.BOTTOM_CENTER;
		//banner.show();
		//hide banner
		//banner.hide();
		//position de la bannière pub
	},
}

var level0 = {
	create: function(){
		level_number=0
		this.flag_level_complete=false

		this.hero = new character() 
		game.add.existing(this.hero)

		this.canon=[]
		//weapon = function(delay,posx,posy,speed,frequency,variance,angular,_flag,kill_with_world,special_color){
		this.canon[0]=new weapon(300,0,1000,280,500,0,0,this.hero.flag_level_complete,"vrai","vrai") 
		this.canon[1]=new weapon(0,w-200,1400,400,990,20,180,this.hero.flag_level_complete,"faux","faux")

		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		return level_number
	},

	update:function(){
		game.physics.arcade.collide(this.canon[0].weapon.bullets,this.canon[1].weapon.bullets,this.touch_between_enemies,null,this)
		if(this.hero.flag_level_complete){
			this.hero.flag_level_complete=false
			game.time.events.add( 1100,this.hide_weapon,this )
		}
		if(this.hero.flag_hide_enemies){
			this.hero.flag_hide_enemies=false
			game.time.events.add( 200,this.hide_weapon,this )
		}
		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.overlap(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				if(this.canon[j].special_color=="vrai"){
				game.physics.arcade.collide(this.canon[j].weapon.bullets,this.hero.player[i],this.hide_weapon,null,this)
				}else{
				game.physics.arcade.collide(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
				
				}
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
				}
			}
		}
	},
	touch_between_enemies:function(){
		console.log("touch");
	},
	hide_weapon:function(){
		console.log('hide')
		for (var j = 0; j < this.canon.length; j++){
			this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
			this.canon[j].visible=false
			this.canon[j].weapon.bullets.visible=false
		}

	},
}
var level1 = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		level_number=1
		this.flag_level_complete=false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		this.background=game.add.sprite(0,0,'background')
		this.background.inputEnabled=true
		this.hero = new character() 

		this.canon=[]
		this.canon[0]=new weapon(0,1400,280,1000,0,this.hero.flag_level_complete) 
		this.canon[1]=new weapon (w+150,100,1000,990,135,this.hero.flag_level_complete)

		this.tween_characteristic = game.add.tween(this.canon[0]).to({y:0},1200,Phaser.Easing.Linear.None,true,0,-1)
		this.tween_characteristic.yoyo(900,true)
		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		game.add.existing(this.hero)
		return level_number
	},
	update:function(){
		if(this.hero.flag_level_complete){
			this.hero.flag_level_complete=false
			game.time.events.add( 1100,this.hide_weapon,this )
		}

		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.overlap(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				game.physics.arcade.overlap(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
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
				}
			}
		}
	},
	hide_weapon:function(){
		console.log('hide')
		for (var j = 0; j < this.canon.length; j++){
			this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
			this.canon[j].visible=false
			this.canon[j].weapon.bullets.visible=false
		}

	},
}
var level2 = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		level_number=2
		this.flag_level_complete=false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		this.background=game.add.sprite(0,0,'background')
		this.background.inputEnabled=true
		this.hero = new character() 

		this.canon=[]
		this.canon[0]=new weapon(0,1400,280,1000,0,this.hero.flag_level_complete) 
		this.canon[1]=new weapon (w+150,100,1000,990,135,this.hero.flag_level_complete)

		this.tween_characteristic = game.add.tween(this.canon[0]).to({y:0},1200,Phaser.Easing.Linear.None,true,0,-1)
		this.tween_characteristic.yoyo(900,true)
		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		game.add.existing(this.hero)
		return level_number
	},
	update:function(){
		if(this.hero.flag_level_complete){
			this.hero.flag_level_complete=false
			game.time.events.add( 1100,this.hide_weapon,this )
		}

		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.overlap(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				game.physics.arcade.overlap(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
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
				}
			}
		}
	},
	hide_weapon:function(){
		console.log('hide')
		for (var j = 0; j < this.canon.length; j++){
			this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
			this.canon[j].visible=false
			this.canon[j].weapon.bullets.visible=false
		}

	},
}
var level3 = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		level_number=3
		this.flag_level_complete=false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		this.background=game.add.sprite(0,0,'background')
		this.background.inputEnabled=true
		this.hero = new character() 

		this.canon=[]
		this.canon[0]=new weapon(0,1400,280,1000,0,this.hero.flag_level_complete) 
		this.canon[1]=new weapon (w+150,100,1000,990,135,this.hero.flag_level_complete)

		this.tween_characteristic = game.add.tween(this.canon[0]).to({y:0},1200,Phaser.Easing.Linear.None,true,0,-1)
		this.tween_characteristic.yoyo(900,true)
		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		game.add.existing(this.hero)
		return level_number
	},
	update:function(){
		if(this.hero.flag_level_complete){
			this.hero.flag_level_complete=false
			game.time.events.add( 1100,this.hide_weapon,this )
		}

		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.overlap(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				game.physics.arcade.overlap(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
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
				}
			}
		}
	},
	hide_weapon:function(){
		console.log('hide')
		for (var j = 0; j < this.canon.length; j++){
			this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
			this.canon[j].visible=false
			this.canon[j].weapon.bullets.visible=false
		}

	},
}
var level4 = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		level_number=4
		this.flag_level_complete=false
		game.physics.startSystem(Phaser.Physics.ARCADE)
		this.background=game.add.sprite(0,0,'background')
		this.background.inputEnabled=true
		this.hero = new character() 

		this.canon=[]
		this.canon[0]=new weapon(0,1400,280,1000,0,this.hero.flag_level_complete) 
		this.canon[1]=new weapon (w+150,100,1000,990,135,this.hero.flag_level_complete)

		this.tween_characteristic = game.add.tween(this.canon[0]).to({y:0},1200,Phaser.Easing.Linear.None,true,0,-1)
		this.tween_characteristic.yoyo(900,true)
		for (var i = 0; i < this.canon.length; i++){
			game.add.existing(this.canon[i])
		}
		game.add.existing(this.hero)
		return level_number
	},
	update:function(){
		if(this.hero.flag_level_complete){
			this.hero.flag_level_complete=false
			game.time.events.add( 1100,this.hide_weapon,this )
		}

		for (var i = 0; i < 3; i++){
			for (var j = 0; j < this.canon.length; j++){
				game.physics.arcade.overlap(this.hero.cible,this.hero.player[i],() => this.hero.land(i))
				game.physics.arcade.overlap(this.canon[j].weapon.bullets,this.hero.player[i],() => this.hero.explode(this.hero.player[i].body.x,this.hero.player[i].body.y,i))
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
				}
			}
		}
	},
	hide_weapon:function(){
		console.log('hide')
		for (var j = 0; j < this.canon.length; j++){
			this.canon[j].explode_bullet(this.canon[j].weapon.bullets)
			this.canon[j].visible=false
			this.canon[j].weapon.bullets.visible=false
		}

	},
}

var menu_level_select = {
	create: function(){
		this.game.stage.backgroundColor = '#1a1a1a'
		this.row=5
		this.line=6
		this.button={}
		this.interspace=200
		this.espacement_x=(w-(this.row-2)*this.interspace)*.5
		this.espacement_y=(h-(this.line-1)*this.interspace)*.5
	},
	update:function(){
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
game.state.add('level2',level2)
game.state.add('level3',level3)

game.state.add('menu_level_select',menu_level_select)
game.state.add('levsel', levsel); // note: first parameter is only the name used to refer to the state
game.state.start('boot',bootstate)

