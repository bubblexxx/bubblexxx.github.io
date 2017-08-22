
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
//class for mechant

_mechant = function(game,name,number,posx,posy,image){
	Phaser.Sprite.call(this,game,0,0,this.image)
	this.name=name
	this.number=number
	this.image=image
	this.posx=posx
	this.posy=posy
	this.sprite_for_body=game.add.sprite(this.posx,this.posy,this.image)
	this.sprite_for_body.anchor.setTo(.5,.5)
	this.flag=true
	this.inputEnabled =true
}
_mechant.prototype=Object.create(Phaser.Sprite.prototype)
//_mechant.constructor=_mechant

tw = (obj,action_tw,tw_name,f) => {
	f=true
	action_tw(obj,tw_name)
}

action_tw=(obj,tw_name)=> {
	obj.scale.setTo(0,0)
	obj.x=400
	obj.y=400
	obj.alpha=1
	tw_name[0] = game.add.tween(obj.scale).to({x:4,y:3},800,Phaser.Easing.Linear.None,true,0,-1)
	tw_name[1] = game.add.tween(obj).to({x:0,y:0},800,Phaser.Easing.Linear.None,true,0,-1)
	tw_name[2] = game.add.tween(obj).to({alpha:0},800,Phaser.Easing.Linear.None,true,0,-1)
}

stop_tw=(tw_name,f) => {
	if(f){

		game.tweens.remove(tw_name)	
		f=false
	}
}


function preload() {
	game.load.image('circle', 'https://s13.postimg.org/xjhlzmiev/disc_png.png');
}

var enl
var tw_array=[]

function create() {
	enl= new _mechant(game,"mech",5,300,300,'circle')
	game.add.existing(enl)
	tw(enl.sprite_for_body,action_tw,enl.flag)
	initiate = () => {
		stop_tw(tw_array,enl.flag)
		tw(enl.sprite_for_body,action_tw,tw_array,enl.flag)
	}
	//game.time.events.loop(700,initiate)
}

function update() {
	_tap = (th) => {
		game.input.onTap.add(onTap,th);
		function onTap(pointer, doubleTap) {
			if (!doubleTap){
				stop_tw(tw_array,enl.flag)
				tw(enl.sprite_for_body,action_tw,tw_array,enl.flag)
			}
		}
	}
	_tap(this)
}

function render() {
}

