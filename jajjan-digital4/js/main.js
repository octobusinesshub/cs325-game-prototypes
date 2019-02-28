window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        // load a tilemap and call it 'map'.
        // from .json file
       // game.load.tilemap('map', 'assets/test_2.json', null, Phaser.Tilemap.TILED_JSON);
        // alternatively, from .csv file
        game.load.tilemap('map', 'assets/test_2.csv', null, Phaser.Tilemap.CSV);
        // The sign images are loaded
        game.load.image( 'six', 'assets/6.png' );
        game.load.image( 'five', 'assets/5.png' );
        game.load.image( 'ten', 'assets/10.png' );
        game.load.image( 'eleven', 'assets/11.png' );
        game.load.image( 'eight', 'assets/8.png' );
        game.load.image( 'add', 'assets/2+3.png' );
        game.load.image( 'sub', 'assets/19-8.png' );
        game.load.image( 'mult', 'assets/2X4.png' );
        game.load.image( 'goal', 'assets/goal.png' );
        //load tiles for map
        game.load.image('tiles', 'assets/terrain.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.audio('maze', 'assets/Scheming-Weasel.mp3');
    }
    
    var map;
    var layer1;
    var player;
    var cursors;
    var six;
    var five1;
    var five2;
    var eight
    var ten
    var eleven
    var subt;
    var add;
    var sub;
    var mult;
    var goal;
    var music;
    
    function create() {
        // Create the map. 
        map = game.add.tilemap('map');
        // for csv files specify the tile size.
        //map = game.add.tilemap('map', 32, 32);
        
        //add tiles
        map.addTilesetImage('tiles');
        
        // Create a layer from the map
        //using the layer name given in the .json file
        //layer1 = map.createLayer('Tile Layer 1');
        //for csv files
        layer1 = map.createLayer(0);
        
        //  Resize the world
        layer1.resizeWorld();
        
        // Create a sprite at the center of the screen using the 'logo' image.
        player = game.add.sprite( 50, 785, 'dude' );
        player.animations.add('left', [0, 1, 2, 3], 10, true);
    	player.animations.add('right', [5, 6, 7, 8], 10, true);
    	// The numbers and expressions are scattered throughout out the map with the 
    	// goal at the end of the maze
    	six = game.add.image(400, 1000, 'six');
    	add = game.add.image(600, 800, 'add');
    	five1 = game.add.image(450, 550, 'five');
    	five2 = game.add.image(800, 350, 'five');
    	eight = game.add.image(2050, 350, 'eight');
    	ten = game.add.image(2050, 100, 'ten');
    	eleven = game.add.image(1100, 400, 'eleven');
    	sub = game.add.image(950, 150, 'sub');
    	mult = game.add.image(2350, 200, 'mult');
    	goal = game.add.image(2850, 300, 'goal');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        player.anchor.setTo( 0.5, 0.5 );
        
        // Play the music
        music = game.sound.play('maze');
        //music.play();
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        
        // The cursors control the player
        cursors = this.game.input.keyboard.createCursorKeys();
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( 400, 15, "Build something amazing.", style );
        text.fixedToCamera = true;
        text.anchor.setTo( 0.5, 0.0 );
        
        game.camera.follow(player);
        
    }
    
    function update() {
    // The if else statements allow the player to move up, down, left, or right
    	if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.body.velocity.y = -150;

      //  player.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        player.body.velocity.y = 150;

        //player.animations.play('down');
    }
    else
    {
        //  Stand still
                player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        player.animations.stop();

        player.frame = 4;
        
    }
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
       // bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};
