"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.game.load.image('titlePage', 'assets/schoolout.png');
		this.game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
		//	+ lots of other required assets here
        this.game.load.image( 'logo', 'assets/phaser.png' );
        
        this.game.load.image('hall', 'assets/hallway.png');
        //this.game.load.tilemap('MyTilemap', 'assets/test_2.json', null, Phaser.Tilemap.TILED_JSON);
       // this.game.load.image('tiles', 'assets/terrain.png');
    	this.game.load.image('ground', 'assets/platform.png');
    	this.game.load.image('star', 'assets/star.png');
    	this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    	this.game.load.image('apple', 'assets/apple.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
