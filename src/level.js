





function level_0 (num,_create_level,tap,th,_ca,_can,_logic,he) {
	return {
		create: function () {
			_create_level(num)
			create_obj=()=>{
				create_canon=()=>{
					_ca[0]=new _can(
						number=0,
						delay=0,
						posx=400-200,
						posy=100,
						speed=900,
						frequency=90,
						variance=0,
						angular=180,
						//_flag=hero.flag_level_complete,
						kill_with_world=true,
						special_color=false
					)
				}
				create_canon()
			}
			create_obj()
			_logic()
		},

		update: function () {
			tap(th) 
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

