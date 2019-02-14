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
        game.load.image('sky', 'assets/sky1.png');
        game.load.image('bomb', 'assets/bomb.png');
        game.load.spritesheet('dude1', 'assets/dude1.png', 32, 48);
        game.load.spritesheet('dude2', 'assets/dude2.png', 32, 48);
        game.load.audio('boom', 'assets/explosion.wav');
    }
    
    var bouncy;
    var cursors;
    var player1;
    var player2;
    var bomb;
    var boom
    
    
    function create() {
    
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	
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
        
        //	Enable p2 physics
		game.physics.startSystem(Phaser.Physics.P2JS);

    	//  Make things a bit more bouncey
    	game.physics.p2.defaultRestitution = 0.8;
        
        cursors = game.input.keyboard.createCursorKeys();
        
        player1 = game.add.sprite(32, game.world.height - 150, 'dude1');
        player2 = game.add.sprite(32, game.world.height - 150, 'dude2');
        bomb = game.add.sprite(400, 200, 'bomb');
        boom = game.add.audio('boom');

    	//  We need to enable physics on the player
    	game.physics.arcade.enable(player1);
    	game.physics.arcade.enable(player2);
    	
    	player1.body.bounce.y = 0.2;
    	player1.body.gravity.y = 300;
    	player1.body.collideWorldBounds = true;

		game.add.sprite(0, 0, 'sky');

    	//  Our two animations, walking left and right.
    	player1.animations.add('left', [0, 1, 2, 3], 10, true);
    	player1.animations.add('right', [5, 6, 7, 8], 10, true);
    	
    	player2.body.bounce.y = 0.2;
    	player2.body.gravity.y = 300;
    	player2.body.collideWorldBounds = true;

    	//  Our two animations, walking left and right.
    	player2.animations.add('left', [0, 1, 2, 3], 10, true);
    	player2.animations.add('right', [5, 6, 7, 8], 10, true);
    	
    	
    	game.physics.startSystem(Phaser.Physics.P2JS);
    	//game.physics.enable(player, Phaser.Physics.ARCADE);
    	game.physics.p2.enable(player1);
    	game.physics.p2.enable(player2);
    	

    	game.physics.enable([player1,bomb], Phaser.Physics.ARCADE);

    	player1.body.immovable = true;

		game.physics.enable([player2,bomb], Phaser.Physics.ARCADE);

    	player2.body.immovable = true;

    	//  This gets it moving
    	bomb.body.velocity.setTo(200, 200);

    	//  This makes the game world bounce-able
    	bomb.body.collideWorldBounds = true;

    	//  This sets the image bounce energy for the horizontal 
    	//  and vertical vectors (as an x,y point). "1" is 100% energy return
    	bomb.body.bounce.setTo(1, 1);	

    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        
        if (cursors.up.isDown)
    	{
        	player1.body.velocity.y = -300;
    	}
    	else if (cursors.down.isDown)
    	{
        	player1.body.velocity.y =  300;
    	}
    	else if (cursors.left.isDown)
    	{
        	player1.body.velocity.x = -300;
    	}
    	else if (cursors.right.isDown)
    	{
        	player1.body.velocity.x = 300;
    	} 
    	else
    	{
        	player1.body.velocity.setTo(0, 0);
    	}
    	
        
    }
};
