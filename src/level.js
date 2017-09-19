var h=1920
var w=1280
var h2=h*.5
var w2=640
var level_number=0
function level_0 (params,num) {
	return {
		create: function () {
			let _num_canon = 1  
			let _num_asteroid = 1 
			let _num_dalle_moving = 1  
			let _num_pulsar = 1
			let _num_dalle = 1 
			level_number=num
			params.create_level(num)
			create_canon=()=>{
				co("create_canon") 
				params.canon[0]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=100,
					speed=900,
					frequency=500,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false,
					_rotate=true,
					_value_rotate=10
				)
			}
			create_asteroid=()=>{
				params.asteroid[0]=new params.constructor_asteroid(
					number=0,
					posx=100,
					posy=240,
					speed=.008,
					radius=100
				)
			}
			create_dalle_moving=()=>{
				params.dalle_moving[0]=new params.constructor_dalle_moving(
					number=0,
					delay=100,
					posx=240,
					posy=h2+100,
					speed=300,
					posx_in_tween=300
				)
			}
			create_pulsar=()=>{
				params.pulsar[0]=new params.constructor_pulsar(
					number=0,
					delay=100,
					time=100,
					posx=w2,
					posy=840,
					speed=2000,
					scale_factor=2
				)
			}
			create_dalle=()=>{
				params.dalle[0]=new params.constructor_dalle(
					number=0,
					delay=100,
					posx=100,
					posy=440,
					speed=300
				)
			}

			if(params.debug_store){
				co(params.debug_store)
				params._check_storage(create_canon,create_asteroid,create_dalle_moving,create_pulsar,create_dalle,_num_canon,_num_asteroid,_num_dalle_moving,_num_pulsar,_num_dalle)
			}else{
				create_canon()
				create_asteroid()
				create_dalle_moving()
				create_pulsar()
				create_dalle()
			}
			params.logic()
			//return level_number
		},

		update: function () {
			params.tap() 
		},

		render: function () {
		}
	};
}
function level_1 (params,num) {
	return {
		create: function () {
			level_number=num
			let _num_canon = 2  
			let _num_asteroid = 0 
			let _num_dalle_moving = 1  
			let _num_pulsar = 0
			let _num_dalle = 0 
			params.create_level(num)
			create_canon=()=>{
				co("create_canon") 
				params.canon[0]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=100,
					speed=900,
					frequency=500,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
				params.canon[1]=new params.constructor_canon(
					number=1,
					delay=0,
					posx=400-200,
					posy=400,
					speed=900,
					frequency=400,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
			}
			create_asteroid=()=>{
			}
			create_dalle_moving=()=>{
				params.dalle_moving[0]=new params.constructor_dalle_moving(
					number=0,
					delay=100,
					posx=240,
					posy=h2+100,
					speed=300,
					posx_in_tween=300
				)
			}
			create_pulsar=()=>{
			}
			create_dalle=()=>{
			}

			if(params.debug_store){
				co(params.debug_store)
				params._check_storage(create_canon,create_asteroid,create_dalle_moving,create_pulsar,create_dalle,_num_canon,_num_asteroid,_num_dalle_moving,_num_pulsar,_num_dalle)
				co(params.canon[0].alpha,"alpha",params.canon[0].visible,"visible")
			}else{
				create_canon()
				create_asteroid()
				create_dalle_moving()
				create_pulsar()
				create_dalle()
			}
			params.logic()
			//return level_number
		},

		update: function () {
			params.tap() 
		},

		render: function () {
		}
	};
}
function level_2 (params,num) {
	return {
		create: function () {
			level_number=num
			let _num_canon = 3  
			let _num_asteroid = 0 
			let _num_dalle_moving = 0  
			let _num_pulsar = 0
			let _num_dalle = 0 
			params.create_level(num)
			create_canon=()=>{
				co("create_canon") 

				params.canon[0]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=100,
					speed=900,
					frequency=450,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
				params.canon[1]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=500,
					speed=900,
					frequency=850,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
				params.canon[2]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-100,
					posy=600,
					speed=900,
					frequency=650,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
			}
			create_asteroid=()=>{
			}
			create_dalle_moving=()=>{
			}
			create_pulsar=()=>{
			}
			create_dalle=()=>{
			}

			if(params.debug_store){
				co(params.debug_store)
				params._check_storage(create_canon,create_asteroid,create_dalle_moving,create_pulsar,create_dalle,_num_canon,_num_asteroid,_num_dalle_moving,_num_pulsar,_num_dalle)
			}else{
				create_canon()
				create_asteroid()
				create_dalle_moving()
				create_pulsar()
				create_dalle()
			}
			params.logic()
			//return level_number
		},

		update: function () {
			params.tap() 
		},

		render: function () {
		}
	};
}
function level_3 (params,num) {
	return {
		create: function () {
			level_number=num
			let _num_canon = 2  
			let _num_asteroid = 0 
			let _num_dalle_moving = 0  
			let _num_pulsar = 0
			let _num_dalle = 0 
			params.create_level(num)
			create_canon=()=>{
				co("create_canon") 

				params.canon[0]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=100,
					speed=900,
					frequency=50,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)
				params.canon[1]=new params.constructor_canon(
					number=0,
					delay=0,
					posx=400-200,
					posy=500,
					speed=900,
					frequency=50,
					variance=0,
					angular=180,
					_flag=params._flag_level_complete,
					kill_with_world=true,
					special_color=false
				)

			}
			create_asteroid=()=>{
			}
			create_dalle_moving=()=>{
			}
			create_pulsar=()=>{
			}
			create_dalle=()=>{
			}

			if(params.debug_store){
				co(params.debug_store)
				params._check_storage(create_canon,create_asteroid,create_dalle_moving,create_pulsar,create_dalle,_num_canon,_num_asteroid,_num_dalle_moving,_num_pulsar,_num_dalle)
			}else{
				create_canon()
				create_asteroid()
				create_dalle_moving()
				create_pulsar()
				create_dalle()
			}
			params.logic()
			//return level_number
		},

		update: function () {
			params.tap() 
		},

		render: function () {
		}
	};
}

//function level_0 (num,_create_level,_ca,_as,_dam,_pu,_da,_check_storage,_logic,__tap,th) {
//    return {
//        create: function () {
//		_create_level(num)
//		let num_canon = 0
//		let num_asteroid = 0
//		let num_dalle_moving = 0
//		let num_pulsar = 0
//		let num_dalle = 0
//		create_obj=()=>{
//			create_canon=(_ca)=>{
//				_ca[0]=new _canon(
//					number=0,
//					delay=0,
//					posx=w-200,
//					posy=100,
//					speed=900,
//					frequency=90,
//					variance=0,
//					angular=180,
//					_flag=hero.flag_level_complete,
//					kill_with_world=true,
//					special_color=false
//				)
//			}
//			create_asteroid=(_as)=>{
//			}
//			create_dalle_moving=(_dam)=>{
//			}
//			create_pulsar=(_pu)=>{
//			}
//			create_dalle=(_da)=>{
//			}
//		}
//		test_storage_or_create=()=>{
//			if(debug_store){
//				_check_storage(create_canon(_ca),create_asteroid(_as),create_dalle_moving(_dam),create_pulsar(_pu),create_dalle(_da),num_canon,num_asteroid,num_dalle_moving,num_pulsar,num_dalle)
//
//			}else{
//				create_obj()
//			}
//			_logic()
//			//return level_number
//		}
//    
//        },
//
//        update: function () {
//		__tap(th)
//    
//        },
//
//        render: function () {
//  
//        }
//    };
//}

