"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.bouncy = null;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		/*        
        // Create a sprite at the center of the screen using the 'logo' image.
        this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        this.bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
        */
        //  We're going to be using physics, so enable the Arcade Physics system
    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	//  A simple background for our game
    	this.game.add.sprite(0, 0, 'hall');

    	//  The platforms group contains the ground and the 2 ledges we can jump on
    	this.platforms = this.game.add.group();

    	//  We will enable physics for any object that is created in this group
    	this.platforms.enableBody = true;

    	// Here we create the ground.
    	var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    	

    	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    	ground.scale.setTo(2, 2);

    	//  This stops it from falling away when you jump on it
    	ground.body.immovable = true;

    	//  Now let's create two ledges
    	var ledge = this.platforms.create(400, 400, 'ground');
    	ledge.body.immovable = true;

    	ledge = this.platforms.create(-150, 250, 'ground');
    	ledge.body.immovable = true;

    	// The player and its settings
    	this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    	//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.player);

    	//  Player physics properties. Give the little guy a slight bounce.
   	 	this.player.body.bounce.y = 0.2;
    	this.player.body.gravity.y = 300;
    	this.player.body.collideWorldBounds = true;

    	//  Our two animations, walking left and right.
    	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    	//  Finally some stars to collect
    	this.stars = this.game.add.group();

    	//  We will enable physics for any star that is created in this group
    	this.stars.enableBody = true;

    	//  Here we'll create 12 of them evenly spaced apart
    	for (var i = 0; i < 12; i++)
    	{
        	//  Create a star inside of the 'stars' group
        	var star = this.stars.create(i * 70, 0, 'star');

        	//  Let gravity do its thing
        	star.body.gravity.y = 300;

        	//  This just gives each star a slightly random bounce value
        	star.body.bounce.y = 0.7 + Math.random() * 0.2;
    	}

    	//  The score
    	this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    	//  Our controls.
    	this.cursors = this.game.input.keyboard.createCursorKeys();
    	
    	this.score = 0;
    	
    	this.game.camera.follow(this.player);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );
        
        //  Collide the player and the stars with the platforms
    	var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    	this.game.physics.arcade.collide(this.stars, this.platforms);

    	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    	this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    	//  Reset the players velocity (movement)
    	this.player.body.velocity.x = 0;

    	if (this.cursors.left.isDown)
    	{
        	//  Move to the left
        	this.player.body.velocity.x = -150;

        	this.player.animations.play('left');
    	}
		else if (this.cursors.right.isDown)
		{
			//  Move to the right
			this.player.body.velocity.x = 150;

			this.player.animations.play('right');
		}
		else
		{
			//  Stand still
			this.player.animations.stop();

			this.player.frame = 4;
		}
	
		//  Allow the player to jump if they are touching the ground.
		if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
		{
			this.player.body.velocity.y = -350;
		}
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('Quit');

    },
    
    collectStar: function (player, star) {
    
    	// Removes the star from the screen
    	star.kill();

    	//  Add and update the score
    	this.score += 10;
    	this.scoreText.text = 'Score: ' + this.score;
    
    	},
    
    render: function () {
    
    	this.game.debug.cameraInfo(this.game.camera, 32, 32);
    	this.game.debug.spriteCoords(this.player, 32, 500);
    	
    	}

};
