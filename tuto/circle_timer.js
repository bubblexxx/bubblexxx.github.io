var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload:preload, create: create, update : update });

function preload() {
	game.load.image('circle', 'https://s3.postimg.org/bb4aql1lf/touch.png');
	game.load.image('rect','https://s26.postimg.org/ci44mlog9/dalle.png')
	game.load.image('player','https://s26.postimg.org/ikbrd3cw9/bullet_color.png')
}

var player=[]
var enemy
var circle
var tw_name
var tap_ready = true
var flag=true
var delay_circle_timer = 2500
var counter = -1
var tween_in_cours=true
//tween on the circle
start_tw = (obj,tw_action,tw_name,f) => {
	tween_in_cours=true
	f = true
	tw_action(obj,tw_name)
}
reset_obj=(obj)=>{
	obj.alpha=.5
	obj.scale.setTo(1,1)
}



// declaration of tw_action
tw_action= (obj,tw_name) =>{
	reset_obj(obj)
	tw_name= game.add.tween(obj.scale).to({x:2.5,y:2.5},700,Phaser.Easing.Linear.None,true,delay_circle_timer,-1)
	tw_name = game.add.tween(obj).to({alpha:0},700,Phaser.Easing.Linear.None,true,delay_circle_timer,-1)
	tw_name.onStart.add(()=> {obj.visible=true})
}

//stop tween
stop_tw = (tw_name,obj,f) => {
	if(tw_name != 'undefined'){
		co(tw_name)
		f=false
		obj.visible=false		
		game.tweens.remove(tw_name)
	}
}

//launch player and start counter
launch_player = (obj)=> {
	counter = counter +1 
	obj[counter].body.velocity.y=-100
}

collide_player_enemy = (obj,opponent) => {
	for (var i = 0; i < obj.lenght; i++){
		game.physics.arcade.collide(obj[i],opponent,() => {start_tw(circle,tw_action,tw_name,tween_in_cours);console.log("collide")})
	}
}

const conditional = ()=>{!tween_in_cours && start_tw(circle,tw_action,tw_name,tween_in_cours)}

hide_player_and_start_tw = (obj) => {
	obj.body.enable=false
	obj.alive=false
	obj.visible=false
	conditional()
}

tap = () => {
	game.input.onTap.add(onTap);

	function onTap(pointer, doubleTap) {
		if (!doubleTap && tap_ready== true){
			tap_ready=false
			//stop the tween on the circle
			stop_tw(tw_name,circle,tween_in_cours)
			//launch the player
			launch_player(player)
			//delay for reset tap_ready
			game.time.events.add(900,() => {tap_ready = true})

		}
	}
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	circle=game.add.sprite(400,300,'circle')
	circle.anchor.setTo(.5)
	circle.inputEnabled = true

	enemy = game.add.sprite(300,100,'rect')
	game.physics.arcade.enable(enemy)
	enemy.body.enable=true
	enemy.body.immovable=true
	for (var i = 0; i < 10; i++){
		player[i]=game.add.sprite(400,600,'player')
		player[i].anchor.setTo(.5)
		player[i].alive=true
		game.physics.arcade.enable(player[i])
		player[i].body.enable=true
	}
	//initiate first tween
	start_tw(circle,tw_action,tw_name,tween_in_cours)
}

function update() {
	tap(circle)
	//collide_player_enemy(player,enemy)
	for (var i = 0; i < 10; i++){
		game.physics.arcade.collide(player[i],enemy,hide_player_and_start_tw)
	}
}


