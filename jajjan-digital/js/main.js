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
	game.load.atlas('lazer', 'assets/games/defender/laser.png', 'assets/games/defender/laser.json');
    }
    
    var bouncy;
    var fireButton;
    var bulletTime = 0;
    var frameTime = 0;
    var frames;
    var prevCamX = 0;   
    var lazers;
	var player;
	var cursors;
	var fireButton; 

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
        
	    game.world.setBounds(0, 0, 800*4, 600);
		// Camera follows players movement
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
		// Cursors show controls for player to move
    	cursors = game.input.keyboard.createCursorKeys();
    	// Cursor show space bar button for player to fire
    	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
		// Game camera is camera that follows player
    	prevCamX = game.camera.x;
    	// Hero is placeholder sprite for this game
    	player = game.add.sprite(32, game.world.height - 150, 'dude');

    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
	
		// sprite is initially set as idle
	    sprite.body.setZeroVelocity();
		// The velocity shows how fast a player can move
    	if (cursors.left.isDown)
    	{
    		sprite.body.moveLeft(400);
    	}
    	else if (cursors.right.isDown)
    	{
    		sprite.body.moveRight(400);
    	}

    	if (cursors.up.isDown)
    	{
    		sprite.body.moveUp(400);
    	}
    	else if (cursors.down.isDown)
    	{
    		sprite.body.moveDown(400);
    	}
    	
		if (cursors.left.isDown)
    	{
        	player.x -= 8;
        	player.scale.x = -1;
    	}
    	else if (cursors.right.isDown)
    	{
        	player.x += 8;
        	player.scale.x = 1;
    	}

    	if (cursors.up.isDown)
    	{
        	player.y -= 8;
    	}
    	else if (cursors.down.isDown)
    	{
        	player.y += 8;
    	}

    	if (fireButton.isDown)
    	{
        	fireBullet();
    	}

    	lazers.forEachAlive(updateBullets, this);

    	prevCamX = game.camera.x;
}

// The bullets in the game are allowed to do actions once they are shot
function updateBullets (lazer) {

    // if (game.time.now > frameTime)
    // {
    //     frameTime = game.time.now + 500;
    // }
    // else
    // {
    //     return;
    // }

    //  Adjust for camera scrolling
    var camDelta = game.camera.x - prevCamX;
    lazer.x += camDelta;

    if (lazer.animations.frameName !== 'frame30')
    {
        lazer.animations.next();
    }
    else
    {
        if (lazer.scale.x === 1)
        {
            lazer.x += 16;

            if (lazer.x > (game.camera.view.right - 224))
            {
                lazer.kill();
            }
        }
        else
        {
            lazer.x -= 16;

            if (lazer.x < (game.camera.view.left - 224))
            {
                lazer.kill();
            }
        }
    }

}


// Function allows bullet to be generated in game
function fireBullet () {
	//
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        lazer = lazers.getFirstDead(true, player.x + 24 * player.scale.x, player.y + 8, 'lazer');
    }
};
