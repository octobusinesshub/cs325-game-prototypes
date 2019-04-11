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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, goal_update: goal_update, goal_update1: goal_update1} );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image( 'bee1', 'assets/beenew1.png' );
        game.load.image( 'bee2', 'assets/beenew2.png' );
        game.load.image( 'pollen', 'assets/pollennew.png' );
        game.load.image( 'meadow', 'assets/meadow.png' );
        game.load.image( 'hivegoal', 'assets/hivegoal.png' );
        game.load.audio( 'music', 'assets/flightbee.mp3');
    }
    
    var bouncy;
    var bee1;
    var bee2;
    var pollen;
    var meadow
    var goal1
    var goal2
    var cursor1;
    var cursor2;
    var score;
    var hive1;
    var hive2;
    var AKey;
    var DKey;
    var WKey;
    var SKey;
    var Music
    var score1 = 0
    var scoreText1;
    var score2 = 0
    var scoreText2;
    
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
        
        meadow = game.add.tileSprite(0,0,800,600,'meadow');
        
        bee1 = game.add.sprite(750,200, 'bee1');
        bee2 = game.add.sprite(0,200, 'bee2');
        
        pollen = game.add.sprite(300,250, 'pollen');
        
        goal1 = game.add.sprite(50,250, 'hivegoal');
        goal2 = game.add.sprite(650,250, 'hivegoal');
        game.physics.arcade.enable([goal1, goal2]);
        
        game.physics.arcade.enable(bee1);
    	bee1.body.collideWorldBounds = true;
		bee1.body.checkCollision.up = true;
		bee1.body.checkCollision.down = true;
		
		game.physics.arcade.enable(bee2);
    	bee2.body.collideWorldBounds = true;
		bee2.body.checkCollision.up = true;
		bee2.body.checkCollision.down = true;
		
		game.physics.arcade.enable(pollen);
    	pollen.body.collideWorldBounds = true;
		pollen.body.checkCollision.up = true;
		pollen .body.checkCollision.down = true;
		
		cursor1 = game.input.keyboard.createCursorKeys();
		cursor2 = game.input.keyboard.createCursorKeys();
		AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		game.physics.arcade.overlap(pollen, goal1, goal_update, null, this); 
    	game.physics.arcade.overlap(pollen, goal2, goal_update, null, this);
		
		scoreText1 = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
		scoreText2 = game.add.text(650, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
		
		Music = game.sound.play('music');
    }
    
     function goal_update(pollen, goal) {
		pollen.x = 250;
    	pollen.y = 300

    	if(goal==goal1){
			score1 += 1;
    		scoreText.text = 'Score: ' + score1;
		}  
		else if (goal==goal2){
		  	score1 += 1;
    		scoreText.text = 'Score: ' + score2;
		}

    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        
        
        bee1.body.velocity.x = 0;
        bee2.body.velocity.x = 0;

		

    	if (cursor1.left.isDown)
    	{
        	//  Move to the left
        	bee1.body.velocity.x = -150;

    	}
    	else if (cursor1.right.isDown)
    	{
        	//  Move to the right
        	bee1.body.velocity.x = 150;

    	}
    	
    	else if (cursor1.up.isDown)
    	{
        	//  Move to the up
        	bee1.body.velocity.y = -150;

    	}
    	
    	else if (cursor1.down.isDown)
    	{
        	//  Move to the down
        	bee1.body.velocity.y = 150;

    	}
    	
    	else
    	{
        	//  Stand still
            bee1.body.velocity.x = 0;
        	bee1.body.velocity.y = 0;

//        	bee1.animations.stop();

//        	bee1.frame = 4;
        
    	}
    	
    	if (AKey.isDown)
    	{
        	//  Move to the left
        	console.log("Test");
        	bee2.body.velocity.x = -150;

    	}

		else if (DKey.isDown)
    	{
        	//  Move to the left
        	console.log("Test");
        	bee2.body.velocity.x = 150;

    	}
    	
    	else if (SKey.isDown)
    	{
        	//  Move to the left
        	console.log("Test");
        	bee2.body.velocity.y = 150;

    	}
    	
    	else if (WKey.isDown)
    	{
        	//  Move to the left
        	console.log("Test");
        	bee2.body.velocity.y = -150;

    	}
    	
    	else
    	{
        	//  Stand still
            bee2.body.velocity.x = 0;
        	bee2.body.velocity.y = 0;

  //      	bee2.animations.stop();

//        	bee2.frame = 4;
        
    	}
    	
    	game.physics.arcade.collide(bee1, pollen);
    	game.physics.arcade.collide(bee2, pollen);
    	
    }

    
    function goal_update1() {
    	pollen.x = 250;
    	pollen.y = 300;

    	score2 += 1;
    	scoreText.text = 'Score: ' + score2;

    }
};
