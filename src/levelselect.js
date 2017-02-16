//// -------------------------------------
//// START THE GAME
//// -------------------------------------
////var CANVAS_WIDTH = 800;
////var CANVAS_WIDTH = 1280;
////var CANVAS_HEIGHT = 1920;
////var CANVAS_HEIGHT = 600;
//
//var PLAYER_DATA = null; // just declare as global variable for now
//
//LevelSelect = function(game){
//	// define needed variables for mygame.LevelSelect
//	this.game = game;
//	this.holdicons = [];
//};
//
//LevelSelect.prototype = {
//
//	preload: function() {
//		this.game.load.spritesheet('levelselecticons', 'assets/levelselecticons.png', 275, 300);
//		this.game.load.bitmapFont('fo','fonts/font.png', 'fonts/font.fnt');
//		//this.game.load.bitmapFont('font72', 'font72.png', 'font72.xml'); // created with http://kvazars.com/littera/
//		
//		this.initProgressData();
//	},
//
//	create: function() {
//		this.game.stage.backgroundColor = 0x80a0ff;
//		this.game.add.sprite(0,0,'background')
//		this.text=game.add.bitmapText(640,200,'fo','SELECT A LEVEL!',100);
//this.text.anchor.setTo(.5,.5)
//		this.createLevelIcons();
//		this.animateLevelIcons();
//	},
//
//	update: function() {
//		// nothing to do but wait until player selects a level
//	},
//
//	render: function() {
//		// display some debug info..?
//	},
//	
//	initProgressData: function() {
//
//		// array might be undefined at first time start up
//		if (!PLAYER_DATA) {
//			// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
//			var str = window.localStorage.getItem('mygame_progress');
//			
//			// error checking, localstorage might not exist yet at first time start up
//			try {
//				PLAYER_DATA = JSON.parse(str);
//			} catch(e){
//				PLAYER_DATA = []; //error in the above string(in this case,yes)!
//			};
//			// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
//			if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
//				PLAYER_DATA = [];
//			};
//		};
//	},
//
//	createLevelIcons: function() {
//		var levelnr = 0;
//
//		for (var y=0; y < 5; y++) {
//			for (var x=0; x < 4; x++) {
//				// next level
//				levelnr = levelnr + 1;
//				
//				// check if array not yet initialised
//				if (typeof PLAYER_DATA[levelnr-1] !== 'number') {
//					// value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
//					if (levelnr == 1) {
//						PLAYER_DATA[levelnr-1] = 0; // level 1 should never be locked
//					} else {
//						PLAYER_DATA[levelnr-1] = -1;
//					};
//				};
//
//				// player progress info for this level
//				var playdata = PLAYER_DATA[levelnr-1];
//
//				// decide which icon
//				var isLocked = true; // locked
//				var stars = 0; // no stars
//				
//				// check if level is unlocked
//				if (playdata > -1) {
//					isLocked = false; // unlocked
//					if (playdata < 4) {stars = playdata;}; // 0..3 stars
//				};
//
//				// calculate position on screen
//				var xpos = 60 + (x*300);
//				var ypos = 320 + (y*300);
//				
//				// create icon
//				this.holdicons[levelnr-1] = this.createLevelIcon(xpos, ypos, levelnr, isLocked, stars);
//				var backicon = this.holdicons[levelnr-1].getAt(0);
//
//				// keep level nr, used in onclick method
//				backicon.health = levelnr;
//
//				// input handler
//				backicon.inputEnabled = true;
//				backicon.events.onInputDown.add(this.onSpriteDown, this);
//			};
//		};
//	},
//
//	// -------------------------------------
//	// Add level icon buttons
//	// -------------------------------------
//	createLevelIcon: function(xpos, ypos, levelnr, isLocked, stars) {
//
//		// create new group
//		var IconGroup = this.game.add.group();
//		IconGroup.x = xpos;
//		IconGroup.y = ypos;
//
//		// keep original position, for restoring after certain tweens
//		IconGroup.xOrg = xpos;
//		IconGroup.yOrg = ypos;
//
//		// determine background frame
//		var frame = 0;
//		if (isLocked == false) {frame = 1};
//		
//		// add background
//		var icon1 = this.game.add.sprite(0, 0, 'levelselecticons', frame);
//		IconGroup.add(icon1);
//
//		// add stars, if needed
//		if (isLocked == false) {
//			var txt = this.game.add.bitmapText(137, 147, 'fo', ''+levelnr, 100);
//			txt.anchor.setTo(.5,.5)
//			var icon2 = this.game.add.sprite(0, 0, 'levelselecticons', (2+stars));
//			
//			IconGroup.add(icon2);
//			IconGroup.add(txt);
//		}else{
//			var txt_locked = this.game.add.bitmapText(137, 147, 'fo', ''+levelnr, 100);
//			txt_locked.anchor.setTo(.5,.5)
//			txt_locked.tint=0x9a136b
//			IconGroup.add(txt_locked);
//		
//		};
//		
//		return IconGroup;
//	},
//
//	onSpriteDown: function(sprite, pointer) {
//
//		// retrieve the iconlevel
//		var levelnr = sprite.health;
//
//		if (PLAYER_DATA[levelnr-1] < 0) {
//			// indicate it's locked by shaking left/right
//			var IconGroup = this.holdicons[levelnr-1];
//			var xpos = IconGroup.xOrg;
//
//			var tween = this.game.add.tween(IconGroup)
//				.to({ x: xpos+6 }, 20, Phaser.Easing.Linear.None)
//				.to({ x: xpos-5 }, 20, Phaser.Easing.Linear.None)
//				.to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
//				.to({ x: xpos-3 }, 20, Phaser.Easing.Linear.None)
//				.to({ x: xpos+2 }, 20, Phaser.Easing.Linear.None)
//				.to({ x: xpos }, 20, Phaser.Easing.Linear.None)
//				.start();
//		} else {
//			// simulate button press animation to indicate selection
//			var IconGroup = this.holdicons[levelnr-1];
//			var tween = this.game.add.tween(IconGroup.scale)
//				.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
//				.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
//				.start();
//				
//			// it's a little tricky to pass selected levelnr to callback function, but this works:
//			tween._lastChild.onComplete.add(function(){this.onLevelSelected(sprite.health);}, this);
//		};
//	},
//
//	animateLevelIcons: function() {
//
//		// slide all icons into screen
//		for (var i=0; i < this.holdicons.length; i++) {
//			// get variables
//			var IconGroup = this.holdicons[i];
//			IconGroup.y = IconGroup.y + 600;
//			var y = IconGroup.y;
//
//			// tween animation
//			this.game.add.tween(IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
//		};
//	},
//
//	onLevelSelected: function(levelnr) {
//		// pass levelnr variable to 'Game' state
//		//this.game.state.states['game']._levelNumber = levelnr;
//		//this.game.state.states['game']._levelNumber = levelnr;
//		//this.game.state.states('game_state',game_state)
//		this.state.start('game_state')
//
//		//this.state.start('game');
//	}
//};


var PLAYER_DATA = null; // just declare as global variable for now

menu = function(){
	Phaser.Sprite.call(this,game,0,0,'background')
	this.levelnr=0
	this.line=5
	this.row=4
	this.createLevelIcons()
	this.text=game.add.bitmapText(640,200,'fo','SELECT A LEVEL!',100);
	this.text.anchor.setTo(.5,.5)
	//this.createLevelIcon()
}
menu.prototype = Object.create(Phaser.Sprite.prototype)
menu.prototype.constructor = menu


menu.prototype.createLevelIcons = function() {
	this.holdicons=[]
	for (var y=0; y < this.line; y++) {
		for (var x=0; x < this.row; x++) {
			// next level
			this.levelnr = this.levelnr + 1;
			console.log('this.levelnr',this.levelnr)

			// check if array not yet initialised
			if (typeof PLAYER_DATA[this.levelnr-1] !== 'number') {
				// value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
				if (this.levelnr == 1) {
					PLAYER_DATA[this.levelnr-1] = 0; // level 1 should never be locked
				} else {
					PLAYER_DATA[this.levelnr-1] = -1;
				};
			};

			// player progress info for this level
			this.playdata = PLAYER_DATA[this.levelnr-1];

			// decide which icon
			this.isLocked = true; // locked
			this.stars = 0; // no stars

			// check if level is unlocked
			if (this.playdata > -1) {
				this.isLocked = false; // unlocked
				if (this.playdata < 4) {this.stars = this.playdata;}; // 0..3 stars
			};

			// calculate position on screen
			this.xpos = 60 + (x*300);
			this.ypos = 320 + (y*300);

			// create icon
			//this.holdicons[this.levelnr-1] = this.createLevelIcon(this.xpos, this.ypos, this.levelnr, this.isLocked, this.stars);
			this.holdicons[this.levelnr-1] = this.createLevelIcon(this.xpos, this.ypos, this.levelnr, this.isLocked, this.stars);
			this.backicon = this.holdicons[this.levelnr-1].getAt(0);

			// keep level nr, used in onclick method
			this.backicon.health = this.levelnr;

			// input handler
			this.backicon.inputEnabled = true;
			this.backicon.events.onInputDown.add(this.onSpriteDown, this);
		};
	};
	//return this.holdicons
}

menu.prototype.createLevelIcon = function() {
		// create new group
		this.IconGroup = game.add.group();
		this.IconGroup.x = this.xpos;
		this.IconGroup.y = this.ypos;

		// keep original position, for restoring after certain tweens
		this.IconGroup.xOrg = this.xpos;
		this.IconGroup.yOrg = this.ypos;

		// determine background frame
		this.frame = 0;
		if (this.isLocked == false) {this.frame = 1};
		
		// add background
	this.icon1 = game.add.sprite(0, 0, 'levelselecticons', this.frame);
	//this.icon1.frame=this.frame
		this.IconGroup.add(this.icon1);

		// add stars, if needed
		if (this.isLocked == false) {
			this.txt = game.add.bitmapText(137, 147, 'fo', ''+this.levelnr, 100);
			this.txt.anchor.setTo(.5,.5)
			this.icon2 = game.add.sprite(0, 0, 'levelselecticons', (2+this.stars));
			
			this.IconGroup.add(this.icon2);
			this.IconGroup.add(this.txt);
		}else{
			this.txt_locked = game.add.bitmapText(137, 147, 'fo', ''+this.levelnr, 100);
			this.txt_locked.anchor.setTo(.5,.5)
			this.txt_locked.tint=0x9a136b
			this.IconGroup.add(this.txt_locked);
		
		};
		
		return this.IconGroup;

	
}

menu.prototype.onSpriteDown = function(sprite,pointer) {
		this.levelnr = sprite.health;

		if (PLAYER_DATA[this.levelnr-1] < 0) {
			// indicate it's locked by shaking left/right
			var IconGroup = this.holdicons[this.levelnr-1];
			this.xpos = this.IconGroup.xOrg;

			this.tween = game.add.tween(this.IconGroup)
				.to({ x: this.xpos+6 }, 20, Phaser.Easing.Linear.None)
				.to({ x: this.xpos-5 }, 20, Phaser.Easing.Linear.None)
				.to({ x: this.xpos+4 }, 20, Phaser.Easing.Linear.None)
				.to({ x: this.xpos-3 }, 20, Phaser.Easing.Linear.None)
				.to({ x: this.xpos+2 }, 20, Phaser.Easing.Linear.None)
				.to({ x: this.xpos }, 20, Phaser.Easing.Linear.None)
				.start();
		} else {
			// simulate button press animation to indicate selection
			this.IconGroup = this.holdicons[this.levelnr-1];
			this.tween = game.add.tween(this.IconGroup.scale)
				.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
				.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
				.start();
				
			// it's a little tricky to pass selected levelnr to callback function, but this works:
			this.tween._lastChild.onComplete.add(function(){this.onLevelSelected();}, this);
			//this.tween._lastChild.onComplete.add(function(){this.onLevelSelected(sprite.health);}, this);
		};
	
}
	
menu.prototype.animateLevelIcons = function() {
	this.onLevelSelected()
	for (var i=0; i < this.holdicons.length; i++) {
			// get variables
			this.IconGroup = this.holdicons[i];
			this.IconGroup.y =this.IconGroup.y + 600;
			var y = this.IconGroup.y;

			// tween animation
			game.add.tween(this.IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
		};
	
}

menu.prototype.onLevelSelected = function() {
	this.game.state.start("game_state");
	
}



