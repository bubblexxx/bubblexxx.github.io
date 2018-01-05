// si true montre la grille snap des enemis et render debug
var debug_mode=false;

//si true possibilité de déplacer les enemis avec repere du sprite_for_drag et publication des levels;
var debug_position=false;

// si false pas de localStorage;
var debug_store=true;

// si true pas de pub entre les niveaux
var debug_ads=false

// si true tous les levels sont débloqués et la musique est arrêtée
var super_dev=true;

// nombre de levels -1
var NUMBER_OF_LEVELS=25;
var level_number=0;

// param window
// definition ici car global={} ne se lance qu'après, level.js se lance avant
var h = 2270;
var w = 1480;

var h2= h*.5;

var w2= w*.5;
var w0=Math.round(w*.19);
var w4=Math.round(w*.75);

var time_appears_enemies=800;

var global={
	preload: function() {
	},

	create: function() {
		//
		this.game.state.start('boot');
	},

	update: function() {
		
	}
};


