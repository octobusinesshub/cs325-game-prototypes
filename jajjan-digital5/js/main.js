"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image( 'track', 'assets/track.png' );
        game.load.image( 'piggy', 'assets/piggy.png');
        game.load.image( 'obstacle', 'assets/hurdle.png' );
        game.load.audio( 'race', 'assets/Finale.mp3');
    }
    
    var bouncy;
    var track;
    var pig;
    var jumpTimer = 0;
    var cursors;
    var obstacle;
    var timer;
    var timer2;
    var timer3;
    var timer4;
    var music;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
        
        track = game.add.tileSprite(0,0,800,600,'track');
        
        // The player and its settings
    	pig = game.add.sprite(400,500, 'piggy');
    	
    	game.physics.arcade.enable(pig);
    	pig.body.collideWorldBounds = true;
		pig.body.checkCollision.up = true;
		pig.body.checkCollision.down = true;
    	obstacle = game.add.group();
    	game.physics.enable(obstacle, Phaser.Physics.ARCADE);
    	obstacle.setAll('body.immovable', true);
    	//  Our controls.
    	cursors = game.input.keyboard.createCursorKeys();
    	
    	// Play the music
        music = game.sound.play('race');
    	
    	timer = game.time.events.loop(10200, spawn);
    	timer2 = game.time.events.loop(13100, spawn2);
    	timer3 = game.time.events.loop(17500, spawn3);
    	timer4 = game.time.events.loop(24700, spawn4);
    	//game.time.events.loop(2000, spawn)
    	
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        track.tilePosition.x += 2;
        
        //  Reset the players velocity (movement)
    	pig.body.velocity.x = 0;


    	if (cursors.left.isDown)
    	{
        	//  Move to the left
        	pig.body.velocity.x = -150;

    	}
    	else if (cursors.right.isDown)
    	{
        	//  Move to the right
        	pig.body.velocity.x = 150;

    	}
    	
    	else if (cursors.up.isDown)
    	{
        	//  Move to the right
        	pig.body.velocity.y = -150;

    	}
    	
    	else if (cursors.down.isDown)
    	{
        	//  Move to the right
        	pig.body.velocity.y = 150;

    	}
    	
    	else
    	{
        	//  Stand still
            pig.body.velocity.x = 0;
        	pig.body.velocity.y = 0;

        	pig.animations.stop();

        	pig.frame = 4;
        
    	}
    	
    	game.physics.arcade.collide(pig, obstacle);
    }
    
    
    function spawn() {
    var hurdle = game.add.sprite(1,50, 'obstacle');
    obstacle.add(hurdle);
    game.physics.arcade.enable(hurdle);
    hurdle.body.velocity.x = 47;
    hurdle.outOfBoundsKill = true;
    }
    
    function spawn2() {
    var hurdle2 = game.add.sprite(1,200, 'obstacle');
    obstacle.add(hurdle2);
    game.physics.arcade.enable(hurdle2);
    hurdle2.body.velocity.x = 47;
    hurdle2.outOfBoundsKill = true;
    }
    
    function spawn3() {
    var hurdle3 = game.add.sprite(1,450, 'obstacle');
    obstacle.add(hurdle3);
    game.physics.arcade.enable(hurdle3);
    hurdle3.body.velocity.x = 47;
    hurdle3.outOfBoundsKill = true;
    }
    
    function spawn4() {
    var hurdle4 = game.add.sprite(1,350, 'obstacle');
    obstacle.add(hurdle4);
    game.physics.arcade.enable(hurdle4);
    hurdle4.body.velocity.x = 47;
    hurdle4.outOfBoundsKill = true;
    }
};
