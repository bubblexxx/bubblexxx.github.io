/* jshint expr: true */
/* jshint esnext: true */
var h=1920;
var w=1280;
var h2=h*0.05;
var w2=640;
var level_number=0;

var logic_render=function(){
	if(debug_mode){
		game.debug.body(hero.cible_shadow);
		game.debug.body(hero.cible);
		//ne sait pas appliquer foreach car this.hero.player renvoit Object[Object,Object,Object]
		for (var i = 0; i < 3;i++){
			game.debug.body(hero.player[i]);
		}
		var debug_obj=function(obj){
			if (obj[0]){
				for (var i = 0; i < obj.length;i++){
					//game.debug.body(obj[i])
					game.debug.body(obj[i].sprite_for_body);
				}
			}
		};
		debug_obj(dalle);
		debug_obj(dalle_moving);
		debug_obj(pulsar);
		debug_obj(asteroid);
		if(canon[0]){
			for (var j = 0; j < canon.length;j++){
				canon[j].weapon.bullets.forEach(function(item){game.debug.body(item);});
			}
		}
	}
};
var level_constructor=function (params,num) {
	return {
		create: function () {
			var _num_canon;
			var _num_dalle;
			var _num_pulsar;
			var _num_dalle_moving;
			var _num_asteroid;
			//test des valeurs
			l[num].canon[0] ? _num_canon=l[num].canon.length : _num_canon=0;
			l[num].dalle[0] ? _num_dalle=l[num].dalle.length : _num_dalle=0;
			l[num].pulsar[0] ? _num_pulsar=l[num].pulsar.length : _num_pulsar=0;
			l[num].dalle_moving[0] ? _num_dalle_moving=l[num].dalle_moving.length : _num_dalle_moving=0;
			l[num].asteroid[0] ? _num_asteroid=l[num].asteroid.length : _num_asteroid=0;

			level_number=num;
			params.create_level(num);
			create_canon=function(){
				if (_num_canon != 0){
					for (var i = 0; i < l[num].canon.length; i++){
						params.canon[i]=new params.constructor_canon(
							number=l[num].canon[i].number,
							delay=l[num].canon[i].delay,
							posx=l[num].canon[i].posx,
							posy=l[num].canon[i].posy,
							speed=l[num].canon[i].speed,
							frequency=l[num].canon[i].frequency,
							variance=l[num].canon[i].variance,
							angular=l[num].canon[i].angular,
							_flag=params._flag_level_complete,
							kill_with_world=l[num].canon[i].kill_with_world,
							special_color=l[num].canon[i].special_color,
							_rotate=l[num].canon[i].rotate,
							_value_rotate=l[num].canon[i].value_rotate
						);
					}
				}
			};
			create_asteroid=function(){
				if (_num_asteroid != 0){
					for (var i = 0; i < l[num].asteroid.length; i++){
						params.asteroid[i]=new params.constructor_asteroid(
							number=l[num].asteroid[i].number,
							posx=l[num].asteroid[i].posx,
							posy=l[num].asteroid[i].posy,
							speed=l[num].asteroid[i].speed,
							radius=l[num].asteroid[i].radius
						);
					}
				}
			};
			create_dalle_moving=function(){
				if (_num_dalle_moving != 0){
					for (var i = 0; i < l[num].dalle_moving.length; i++){
						params.dalle_moving[i]=new params.constructor_dalle_moving(
							number=l[num].dalle_moving[i].number,
							delay=l[num].dalle_moving[i].delay,
							posx=l[num].dalle_moving[i].posx,
							posy=l[num].dalle_moving[i].posy,
							posx_in_tween=l[num].dalle_moving[i].posx_in_tween,
							speed=l[num].dalle_moving[i].speed
						);
					}
				}
			};
			create_pulsar=function(){
				if (_num_pulsar != 0){
					for (var i = 0; i < l[num].pulsar.length; i++){
						params.asteroid[i]=new params.constructor_pulsar(
							number=l[num].pulsar[i].number,
							delay=l[num].pulsar[i].delay,
							time=l[num].pulsar[i].time,
							scale_factor=l[num].pulsar[i].scale_factor,
							posx=l[num].pulsar[i].posx,
							posy=l[num].pulsar[i].posy,
							speed=l[num].pulsar[i].speed
						);
					}
				}
			};
			create_dalle=function(){
				if (_num_dalle != 0){
					for (var i = 0; i < l[num].dalle.length; i++){
						params.dalle[i]=new params.constructor_dalle(
							number=l[num].dalle[i].number,
							delay=l[num].dalle[i].delay,
							posx=l[num].dalle[i].posx,
							posy=l[num].dalle[i].posy,
							speed=l[num].dalle[i].speed
						);
					}
				}
			};
			// si on retire la fonction store 
			if(params.debug_store){
				params._check_storage(create_canon,create_asteroid,create_dalle_moving,create_pulsar,create_dalle,_num_canon,_num_asteroid,_num_dalle_moving,_num_pulsar,_num_dalle);
			}else{
				create_canon();
				create_asteroid();
				create_dalle_moving();
				create_pulsar();
				create_dalle();
			}
			params.logic();
		},

		update: function () {
			params.tap();
		},

		render: function () {
			logic_render();
		}
	};
};

