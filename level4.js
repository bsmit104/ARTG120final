class Level4 extends Phaser.Scene {
    constructor() {
        super('level4');
        //this.map = null;
    }
    
preload() {
    this.load.path = "./assets/";
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'tiles.png', {frameWidth: 16, frameHeight: 16});
    //this.load.image("tiles", "tiles.png");
    // // simple coin image
    // player animations
    this.load.image('player', 'bigman.png');
    //this.load.atlas('player', 'player.png', 'player.json');
}

create() {
    this.physics.world.gravity.y = 500;
    // load the map 
    map = this.make.tilemap({key: 'map'});

    // tiles for the ground layer
    var groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    //groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    groundLayer = map.createLayer('Ground', groundTiles, 0, 0).setScale(4);;
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width * 4;
    this.physics.world.bounds.height = groundLayer.height * 4;
    
    // create the player sprite    
    player = this.physics.add.sprite(200 * 4, 200 * 4, 'player');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map    
    
    var objectLayer = map.getObjectLayer('objects');
    var start = objectLayer.objects.find(obj => obj.name === 'start');
    player.setPosition(start.x * 4, start.y * 4);
    // small fix to our player images, we resize the physics body object slightly
    player.body.setSize(player.width, player.height-8);
    
    // player will collide with the level tiles 
    this.physics.add.collider(groundLayer, player);

    var spikeob = objectLayer.objects.find(obj => obj.name === 'spike');
    this.physics.add.overlap(player, spikeob, this.handleSpikeCollision, null, this);

    // // player walk animation
    // this.anims.create({
    //     key: 'walk',
    //     frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // // idle with only one frame, so repeat is not neaded
    // this.anims.create({
    //     key: 'idle',
    //     frames: [{key: 'player', frame: 'p1_stand'}],
    //     frameRate: 10,
    // });

    cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels * 4, map.heightInPixels * 4);
    // make the camera follow the player
    this.cameras.main.startFollow(player);

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');
}

update(time, delta) {
    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
        //player.anims.play('walk', true); // walk left
        player.flipX = true; // flip the sprite to the left
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
        //player.anims.play('walk', true);
        player.flipX = false; // use the original sprite looking to the right
    } else {
        player.body.setVelocityX(0);
        //player.anims.play('idle', true);
    }
    // jump 
    if (cursors.up.isDown && player.body.onFloor())
    {
        player.body.setVelocityY(-500);        
    }
}

handleSpikeCollision(player, spike) {
    // Reset the player's position to the start
    var start = objectLayer.objects.find(obj => obj.name === 'start');
    player.setPosition(start.x * 4, start.y * 4);
    // Optionally, perform any other actions or effects you want when the player collides with the spike.
  }
  
}
    // preload() {
    //     this.load.path = "./assets/";
    //     this.load.image('man', 'bigman.png');
    //     this.load.tilemapTiledJSON('map', 'arcade.json');
    //     this.load.spritesheet('tiles', 'tiles.png', {frameWidth: 16, frameHeight: 16});
    //     //this.load.image('arrowKey', 'arrowKey.png');
    //     // this.load.spritesheet('fish', 'fish.png', {
    //     //     frameWidth: 250,
    //     //     frameHeight: 150,
    //     // });
    // }

    // create() {
    //     // load the map 
    //     map = this.make.tilemap({ key: 'map' });

    //     // tiles for the ground layer
    //     var groundTiles = map.addTilesetImage('tiles');
    //     // create the ground layer
    //     groundLayer = map.createStaticLayer('Ground', groundTiles, 0, 0);
    //     // the player will collide with this layer
    //     groundLayer.setCollisionByExclusion([-1]);
    //     // set the boundaries of our game world
    //     this.physics.world.bounds.width = groundLayer.width;
    //     this.physics.world.bounds.height = groundLayer.height;
    // }
    // update() {

    // }
